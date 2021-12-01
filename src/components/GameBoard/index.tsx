import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';

import {
  generatePossibleWinningCombinations,
  insertFreeTile,
  shuffleTiles,
} from '@/lib/helper';

import { freeTile, tiles } from '@/constants';

import Spinner from '../Spinner';
import Tile from '../Tile';

import type { Tiles } from '@/types';

const WinningDialog = dynamic(() => import('../WinningDialog'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner />,
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
  const [isWinner, setIsWinner] = useState<boolean>(false);

  const generateTiles = () => {
    const randomTiles = insertFreeTile(shuffleTiles(tiles), 12, freeTile);
    setShuffledTiles([...randomTiles]);
    setWinningCombinations(generatePossibleWinningCombinations(randomTiles));
  };

  useEffect(() => {
    generateTiles();
  }, []);

  const handleGameReset = () => {
    generateTiles();
    setIsWinner(false);
    setPlayerSelectedTiles([freeTile.id]);
  };

  const handleTileChecked = (tileId: number, value: boolean) => {
    const updatedTiles = [...shuffledTiles];
    const checkedTileIndex = updatedTiles.findIndex((el) => el.id === tileId);
    updatedTiles[checkedTileIndex].isChecked = value;

    const updatedPlayerSelectedTiles = [
      ...playerSelectedTiles,
      updatedTiles[checkedTileIndex].id,
    ];

    checkValidCombination(updatedPlayerSelectedTiles);

    setPlayerSelectedTiles(updatedPlayerSelectedTiles);
    setShuffledTiles(updatedTiles);
  };

  const checkValidCombination = (currentPlayerSelectedValues: number[]) => {
    let itsBingo = false;
    winningCombinations.forEach((combination) => {
      itsBingo = combination.every((tileId) =>
        currentPlayerSelectedValues.includes(tileId)
      );
      if (itsBingo) {
        setIsWinner(true);
      }
    });
  };

  return (
    <div className='bg-[#f0f8fd] h-[60vh] w-[90vw] flex relative z-10 flex-col justify-between mx-auto mt-28 max-w-sm rounded-lg lg:h-[650px] lg:max-w-2xl'>
      <GirlWithLaptop />
      <div className='bg-[#abdddc] grid grid-cols-5 grid-rows-5 gap-x-2 gap-y-2 justify-items-center p-2 rounded-lg'>
        {shuffledTiles.map((tile) => (
          <Tile key={tile.id} handleChecked={handleTileChecked} {...tile} />
        ))}
      </div>
      <WinningDialog isOpen={isWinner} handleClose={handleGameReset} />
    </div>
  );
}
