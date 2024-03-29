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

export const main = async () => {
  const car = await deleteCar(2);
};

main();
