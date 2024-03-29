export interface Car {
  id?: number;
  color: string;
  name: string;
}

export interface Garage {
  cars: Car[];
  count: number;
}
