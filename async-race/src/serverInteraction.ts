import { stopAnimation } from "./garageView/carAnimation";
import { Car, Winner } from "./interface";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const baseUrl = "http://localhost:3000";

const path = {
  garage: "/garage",
  engine: "/engine",
  winners: "/winners",
};

export const getCars = async () => {
  const response = await fetch(`${baseUrl}${path.garage}`);
  const cars = await response.json();

  const count = Number(response.headers.get("X-Total-Count"));

  return { cars, count };
};

export const getCar = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`);
  const car = await response.json();

  return car;
};

export const createCar = async (body: Car) => {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: HttpMethod.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const car = await response.json();

  return car;
};

export const updateCar = async (id: number, body: Car) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: HttpMethod.PUT,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const car = await response.json();

  return car;
};

const updateCarParam = async (id: number, body: Car) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: HttpMethod.PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const car = await response.json();

  return car;
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: HttpMethod.DELETE,
  });
  const car = await response.json();

  return car;
};

export const getVelocity = async (id: number) => {
  const response = await fetch(
    `${baseUrl}${path.engine}?id=${id}&status=started`,
    {
      method: HttpMethod.PATCH,
    }
  );
  const engineData = await response.json();
  const velocity = engineData.velocity;
  const distance = engineData.distance;
  const animationTime = distance / velocity;

  return animationTime;
};

export const engineSuccess = async (id: number) => {
  const response = await fetch(
    `${baseUrl}${path.engine}?id=${id}&status=drive`,
    {
      method: HttpMethod.PATCH,
    }
  );
  console.log(response.status);
  return response.status;
};

export const createWinner = async (body: Winner) => {
  const response = await fetch(`${baseUrl}${path.winners}`, {
    method: HttpMethod.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const winner = await response.json();

  return winner;
};

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.winners}/:${id}`, {
    method: HttpMethod.DELETE,
  });
  const winner = await response.json();

  return winner;
};

export const updateWinner = async (
  id: number,
  body: {
    wins: number;
    time: number;
  }
) => {
  const response = await fetch(`${baseUrl}${path.winners}/:${id}`, {
    method: HttpMethod.PUT,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const winner = await response.json();

  return winner;
};

export const getWinners = async () => {
  const response = await fetch(`${baseUrl}${path.winners}`);
  const winners = await response.json();

  const count = Number(response.headers.get("X-Total-Count"));

  return winners;
};
