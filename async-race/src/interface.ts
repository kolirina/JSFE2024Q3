export interface Car {
  id?: number;
  color: string;
  name: string;
}

export interface Garage {
  cars: Car[];
  count: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}
