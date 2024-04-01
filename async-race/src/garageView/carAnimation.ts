import GarageView from "./garageView";
import { getVelocity, engineSuccess } from "../serverInteraction";
import { Car } from "../interface";

let animationId: number | null = null;

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
    // Устанавливаем идентификатор анимации в атрибут data-animation-id элемента carDivBottomWrapper
    carDivBottomWrapper.dataset.animationId = String(
      requestAnimationFrame(animate)
    );

    const startTime = performance.now(); // Запоминаем время начала анимации

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
        return; // Выходим из функции animate, завершая анимацию
      }

      // Продолжаем анимацию, вызывая requestAnimationFrame для следующего кадра
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
  // Получаем идентификатор анимации из атрибута data-animation-id
  const animationId = carDivBottomWrapper.dataset.animationId;

  // Если атрибут существует, отменяем анимацию
  if (animationId) {
    cancelAnimationFrame(Number(animationId));
    delete carDivBottomWrapper.dataset.animationId; // Удаляем атрибут data-animation-id
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
}
