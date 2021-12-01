import type { ITile, Tiles } from '@/types';

export const tiles: Tiles = [
  { message: '"can everybody hear my voice?"', id: 1 },
  { message: 'pet on keyboard', id: 2 },
  { message: 'forgot to mute yourself', id: 3 },
  { message: 'using computer', id: 4 },
  { message: 'mute your mic', id: 5 },
  { message: 'using laptop', id: 6 },
  { message: 'make a to do list', id: 7 },
  { message: 'zoom meeting', id: 8 },
  { message: 'awkward silence on meeting', id: 9 },
  { message: 'learned a new skill', id: 10 },
  { message: 'bad internet connection', id: 11 },
  { message: 'forgot what day it is', id: 12 },
  { message: 'wears pajamas', id: 13 },
  { message: 'dog barks during the call', id: 14 },
  { message: 'online shopping', id: 15 },
  { message: 'webcam off', id: 16 },
  { message: 'working on the bed', id: 17 },
  { message: 'created a playlist', id: 18 },
  { message: 'pet on desk', id: 19 },
  { message: '"can you see my screen"', id: 20 },
  { message: 'wears formal top', id: 21 },
  { message: 'talked to yourself', id: 22 },
  {
    message: "heard someones's kid in the background",
    id: 23,
  },
  { message: 'working on the desk', id: 24 },
];

export const freeTile: ITile = { message: 'free', id: 25, isChecked: true };
