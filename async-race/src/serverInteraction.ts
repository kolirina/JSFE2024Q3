import { Car } from "./interface";
const baseUrl = "http://localhost:3000";

const path = {
  garage: "/garage",
  engine: "/engine",
  winners: "/winners",
};

// const generateQueryString = (queryParams = []) =>
//   queryParams.length
//     ? `?${queryParams.map((x) => `${x.key}=${x.value}`).join("&")}`
//     : "";

export const getCars = async () => {
  const response = await fetch(`${baseUrl}${path.garage}`);
  const cars = await response.json();

  const count = Number(response.headers.get("X-Total-Count"));

  return { cars, count };
};

getCars();

const getCar = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`);
  const car = await response.json();

  return car;
};

export const createCar = async (body: Car) => {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: "POST",
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
    method: "PUT",
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
    method: "PATCH",
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
    method: "DELETE",
  });
  const car = await response.json();

  return car;
};

export const getVelocity = async (id: number) => {
  const response = await fetch(
    `${baseUrl}${path.engine}?id=${id}&status=started`,
    {
      method: "PATCH",
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
      method: "PATCH",
    }
  );
  try {
    const engineData = await response.json();
    const engineSuccess = engineData.success;
    return engineSuccess;
  } catch (error) {
    console.error(
      "Car has been stopped suddenly. It's engine was broken down.",
      error
    );
  }
};
