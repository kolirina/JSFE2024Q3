import { GameData } from './interfaces';

async function fetchRoundsData(): Promise<GameData> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch rounds data');
    }
    return await response.json();
  } catch (error: any) {
    console.error('Error fetching rounds data:', error);
    return { rounds: [], roundsCount: 0 };
  }
}

export default fetchRoundsData;
