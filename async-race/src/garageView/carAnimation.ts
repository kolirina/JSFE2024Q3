import { getVelocity, engineSuccess, createWinner } from "../serverInteraction";
import { Car, Winner } from "../interface";
import garageView from "./garageView";
import GarageView from "./garageView";
import { createDiv } from "../elementCreator";

let winners: Winner[] = [];
let popUp: HTMLDivElement;

popUp = createDiv("hidden", document.body);
popUp.id = "popUp";
document.addEventListener("click", (event) => {
  if (!popUp.contains(event.target as Node)) {
    popUp.classList.add("hidden");
  }
});

export async function carAnimation(
  id: number,
  carDivBottomWrapper?: HTMLElement,
  carPicContainer?: HTMLElement
): Promise<void> {
  try {
    const animationTime = await getVelocity(id);
    if (carDivBottomWrapper && carPicContainer) {
      startAnimation(id, animationTime, carDivBottomWrapper, carPicContainer);
    }
  } catch (error) {
    console.error("Error fetching animationTime:", error);
  }
}

async function startAnimation(
  id: number,
  animationTime: number,
  carDivBottomWrapper: HTMLElement,
  carPicContainer: HTMLElement
) {
  if (
    carPicContainer instanceof HTMLElement &&
    carDivBottomWrapper instanceof HTMLElement
  ) {
    carDivBottomWrapper.dataset.animationId = String(
      requestAnimationFrame(animate)
    );

    const startTime = performance.now();

    function animate(timestamp: number) {
      const currentTime = performance.now();
      const progress = currentTime - startTime;

      const newPosition =
        (progress / animationTime) * carDivBottomWrapper.offsetWidth;
      const maxPosition =
        carDivBottomWrapper.offsetWidth - carPicContainer.offsetWidth - 100;
      const finalPosition = Math.min(newPosition, maxPosition);

      carPicContainer.style.transform = `translateX(${finalPosition}px)`;

      if (finalPosition >= maxPosition) {
        console.log("Машинка достигла правого края контейнера");
        return;
      }

      carDivBottomWrapper.dataset.animationId = String(
        requestAnimationFrame(animate)
      );
    }
  } else {
    console.error(
      "Не удалось найти элементы carPicContainer или carDivBottomWrapper"
    );
  }
}

export function stopAnimation(
  id: number,
  carDivBottomWrapper: HTMLElement
): void {
  const animationId = carDivBottomWrapper.dataset.animationId;

  if (animationId) {
    cancelAnimationFrame(Number(animationId));
    delete carDivBottomWrapper.dataset.animationId;
    console.log("Анимация остановлена для машины с ID:", id);
  } else {
    console.log("Анимация не найдена для машины с ID:", id);
  }
}

export async function startRace(cars: Car[]) {
  const validCars = cars.filter((car) => typeof car.id === "number");
  const animationTimes = await Promise.all(
    validCars.map(async (car) => await getVelocity(car.id!))
  );

  const animationPromises = validCars.map((car, index) =>
    startAnimation(
      car.id!,
      animationTimes[index],
      document.getElementById(`car-bottom-wrapper${car.id}`)!,
      document.getElementById(`car-pic-container${car.id}`)!
    )
  );

  await Promise.all(animationPromises);

  const winnerIndex = animationTimes.indexOf(Math.min(...animationTimes));
  const winnerCar = validCars[winnerIndex];
  const winnerTime = Number((animationTimes[winnerIndex] / 1000).toFixed(2));
  let wins = 1;

  const existingWinnerIndex = winners.findIndex(
    (winner) => winner.id === winnerCar.id
  );
  if (existingWinnerIndex !== -1) {
    winners[existingWinnerIndex].wins++;
    if (winners[existingWinnerIndex].time > winnerTime) {
      winners[existingWinnerIndex].time = winnerTime;
    }
  } else {
    winners.push({ id: winnerCar.id!, wins: 1, time: winnerTime });
  }

  console.log("Победитель гонки:", winnerCar.name, "время:", winnerTime);
  setTimeout(() => {
    popUp.textContent = `${winnerCar.name} finished first in ${winnerTime} seconds`;
    popUp.classList.remove("hidden");
  }, winnerTime * 1000);
  console.log("Обновленный массив победителей:", winners);
  if (winners.length > 0) {
    try {
      await createWinner({
        id: winnerCar.id!,
        wins: 1,
        time: winnerTime,
      });

      console.log("Информация о победителе успешно отправлена на сервер");
    } catch (error) {
      console.error("Error: Insert failed, duplicate id", error);
    }
  } else {
    console.error("Ошибка: Массив победителей пуст");
  }
}
