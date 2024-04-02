export interface IUser {
  firstName: string;
  surname: string;
}

export interface WordCard {
  id: number;
  word: string;
  wordTranslate: string;
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
}

export interface Round {
  levelData: {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
  };
  words: WordCard[];
}

export interface GameData {
  rounds: Round[];
  roundsCount: number;
}
