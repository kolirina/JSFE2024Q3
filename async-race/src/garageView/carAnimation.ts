import GarageView from "./garageView";
import { getVelocity, engineSuccess } from "../serverInteraction";

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
    let startTime: number | null = null;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const newPosition =
        (progress / animationTime) * carDivBottomWrapper.offsetWidth;

      const maxPosition =
        carDivBottomWrapper.offsetWidth - carPicContainer.offsetWidth - 100;
      const finalPosition = Math.min(newPosition, maxPosition);

      carPicContainer.style.transform = `translateX(${finalPosition}px)`;

      if (finalPosition < maxPosition) {
        animationId = requestAnimationFrame(animate);
      } else {
        console.log("Машинка достигла правого края контейнера");
      }
    }

    try {
      const success = await engineSuccess(id);
      if (success === 200) {
        animationId = requestAnimationFrame(animate);
      } else {
        console.error(
          "Car has been stopped suddenly. Its engine was broken down."
        );
        stopAnimation(id, carPicContainer);
        console.log("🧵");
      }
    } catch (error) {
      console.error("Error checking engine status:", error);
    }
  } else {
    console.error(
      "Не удалось найти элементы carPicContainer или carDivBottomWrapper"
    );
  }
}

export function stopAnimation(id: number, carPicContainer: HTMLElement): void {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
    console.log("Анимация остановлена");
  }
}
