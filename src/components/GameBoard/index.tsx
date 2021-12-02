/**
 *  @author: Razvan Rauta
 *  Date: Dec 01 2021
 *  Time: 16:48
 */

import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';

import {
  generatePossibleWinningCombinations,
  insertFreeTile,
  shuffleTiles,
  updatePreviousWinsAndSelectedTiles,
} from '@/lib/helper';

import { freeTile, tiles } from '@/constants';

import Spinner from '../Spinner';
import Tile from '../Tile';

import type { Tiles } from '@/types';

const WinningDialog = dynamic(() => import('../WinningDialog'), {
  ssr: false,
});

const GirlWithLaptop = dynamic(() => import('../GirlWithLaptop'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner />,
});

export default function GameBoard(): ReactElement {
  const [shuffledTiles, setShuffledTiles] = useState<Tiles>([]);
  const [winningCombinations, setWinningCombinations] = useState<
    Array<number[]>
  >([]);
  const [playerSelectedTiles, setPlayerSelectedTiles] = useState<number[]>([
    freeTile.id,
  ]);
  const [previousWinningCombinations, setPreviousWinningCombinations] =
    useState<Array<number[]>>([]);
  const [isWinner, setIsWinner] = useState<boolean>(false);

  const generateTiles = () => {
    const randomTiles = insertFreeTile(shuffleTiles(tiles), 12, freeTile);
    setShuffledTiles([...randomTiles]);
    setWinningCombinations(generatePossibleWinningCombinations(randomTiles));
  };
  const initializeRef = useRef<boolean>(false);

  useEffect(() => {
    generateTiles();
  }, []);

  const handleGameReset = () => {
    generateTiles();
    setIsWinner(false);
    setPlayerSelectedTiles([freeTile.id]);
    setPreviousWinningCombinations([]);
  };

  useEffect(() => {
    if (initializeRef.current) {
      updateTilesStatus(previousWinningCombinations);
    } else {
      initializeRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousWinningCombinations]);

  const handleModalClose = () => {
    setIsWinner(false);
  };
  // handle users click on tile
  const handleTileChecked = (tileId: number, value: boolean) => {
    const updatedTiles = [...shuffledTiles];
    const checkedTileIndex = updatedTiles.findIndex((el) => el.id === tileId);
    const updatedTile = updatedTiles[checkedTileIndex];

    updatedTile.isChecked = value;

    if (updatedTile.isChecked) {
      const updatedPlayerSelectedTiles = [...playerSelectedTiles];
      if (!updatedPlayerSelectedTiles.includes(updatedTile.id)) {
        updatedPlayerSelectedTiles.push(updatedTiles[checkedTileIndex].id);
      }
      checkValidCombination(updatedPlayerSelectedTiles);
      setPlayerSelectedTiles(updatedPlayerSelectedTiles);
    } else if (!updatedTile.isChecked) {
      const { updatePreviousWins, updatedPlayerSelectedTiles } =
        updatePreviousWinsAndSelectedTiles(
          previousWinningCombinations,
          updatedTile,
          playerSelectedTiles
        );

      setPreviousWinningCombinations(updatePreviousWins);
      setPlayerSelectedTiles(updatedPlayerSelectedTiles);
    }

    setShuffledTiles(updatedTiles);
  };

  const checkValidCombination = (currentPlayerSelectedValues: number[]) => {
    let itsBingo = false;
    const wins: number[][] = [];
    winningCombinations.forEach((combination) => {
      itsBingo = combination.every((tileId) =>
        currentPlayerSelectedValues.includes(tileId)
      );
      if (itsBingo) {
        wins.push(combination);
      }
    });

    setPreviousWinningCombinations(wins);
    setIsWinner(wins.length > previousWinningCombinations.length);
  };

  const updateTilesStatus = (prevWinsCombinations: Array<number[]>) => {
    const updatedTiles = [...shuffledTiles];

    const previousWinningTiles = uniq(flatten(prevWinsCombinations));

    updatedTiles.forEach((tile) => {
      tile.isPreviousWin = previousWinningTiles.includes(tile.id);
    });
    setShuffledTiles(updatedTiles);
  };

  return (
    <div className='bg-[#f0f8fd] w-[90vw] flex relative z-10 flex-col justify-between mx-auto mt-28 max-w-sm h-auto rounded-lg lg:h-[715px] lg:max-w-2xl'>
      <GirlWithLaptop />
      <div className='bg-[#abdddc] min-h-[300px] grid grid-cols-5 grid-rows-5 gap-x-2 gap-y-2 justify-items-center p-2 rounded-lg'>
        {shuffledTiles.map((tile) => (
          <Tile key={tile.id} handleChecked={handleTileChecked} {...tile} />
        ))}
      </div>
      <WinningDialog
        isOpen={isWinner}
        handleClose={handleModalClose}
        handleGameReset={handleGameReset}
      />
    </div>
  );
}
