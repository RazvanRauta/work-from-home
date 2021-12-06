/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 06 2021
 * @ Time: 14:49
 */

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';

import {
  generatePossibleWinningCombinations,
  insertFreeTile,
  shuffleTiles,
  updatePreviousWinsAndSelectedTiles,
} from '@/lib/helper';

import { freeTile, tiles } from '@/constants';
import type { RootState } from '@/store';

import type { Tiles } from '@/types';

interface IGameBoardState {
  shuffledTiles: Tiles;
  winningCombinations: Array<number[]>;
  playerSelectedTiles: number[];
  previousWinningCombinations: Array<number[]>;
  isWinner: boolean;
}

// Define the initial state using that type
const initialState: IGameBoardState = {
  shuffledTiles: [],
  winningCombinations: [],
  playerSelectedTiles: [freeTile.id],
  previousWinningCombinations: [],
  isWinner: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initGame: (state) => {
      const randomTiles = insertFreeTile(shuffleTiles(tiles), 12, freeTile);
      state.shuffledTiles = randomTiles;
      state.winningCombinations =
        generatePossibleWinningCombinations(randomTiles);
    },
    resetGame: (state) => {
      const randomTiles = insertFreeTile(shuffleTiles(tiles), 12, freeTile);
      const updatedState = {
        ...state,
        shuffledTiles: randomTiles,
        winningCombinations: generatePossibleWinningCombinations(randomTiles),
        isWinner: false,
        playerSelectedTiles: [freeTile.id],
        previousWinningCombinations: [],
      };
      return updatedState;
    },
    setIsWinner: (state, { payload }: PayloadAction<boolean>) => {
      state.isWinner = payload;
    },
    updateTileStatus: (
      state,
      {
        payload: { status, tileId },
      }: PayloadAction<{ tileId: number; status: boolean }>
    ) => {
      const tileToBeUpdatedIndex = state.shuffledTiles.findIndex(
        (el) => el.id === tileId
      );
      let itsBingo = false;
      const wins: number[][] = [];
      const tileToBeUpdated = state.shuffledTiles[tileToBeUpdatedIndex];

      if (tileToBeUpdated) {
        tileToBeUpdated.isChecked = status;

        if (tileToBeUpdated.isChecked) {
          if (!state.playerSelectedTiles.includes(tileToBeUpdated.id)) {
            // update player selected tiles
            state.playerSelectedTiles = [
              ...state.playerSelectedTiles,
              tileToBeUpdated.id,
            ];
          }

          state.winningCombinations.forEach((combination) => {
            itsBingo = combination.every((tileId) =>
              state.playerSelectedTiles.includes(tileId)
            );
            if (itsBingo) {
              wins.push(combination);
            }
          });
          state.isWinner =
            wins.length > state.previousWinningCombinations.length;
          state.previousWinningCombinations = wins;
        } else if (!tileToBeUpdated.isChecked) {
          const { updatePreviousWins, updatedPlayerSelectedTiles } =
            updatePreviousWinsAndSelectedTiles(
              state.previousWinningCombinations,
              tileToBeUpdated,
              state.playerSelectedTiles
            );

          state.previousWinningCombinations = updatePreviousWins;
          state.playerSelectedTiles = updatedPlayerSelectedTiles;
        }

        const previousWinningTiles = uniq(
          flatten(state.previousWinningCombinations)
        );

        state.shuffledTiles = state.shuffledTiles.map((tile) => {
          tile.isPreviousWin = previousWinningTiles.includes(tile.id);
          return tile;
        });
      }
    },
  },
});

export const { initGame, resetGame, updateTileStatus, setIsWinner } =
  gameSlice.actions;

export const selectShuffledTiles = (state: RootState) =>
  state.game.shuffledTiles;

export const selectIsWinner = (state: RootState) => state.game.isWinner;

export default gameSlice;
