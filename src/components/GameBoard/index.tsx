/**
 *  @author: Razvan Rauta
 *  Date: Dec 01 2021
 *  Time: 16:48
 */

import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import React from 'react';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import {
  initGame,
  resetGame,
  selectIsWinner,
  selectShuffledTiles,
  setIsWinner,
  updateTileStatus,
} from '@/features/game/gameSlice';

import Spinner from '../Spinner';
import Tile from '../Tile';

const WinningDialog = dynamic(() => import('../WinningDialog'), {
  ssr: false,
});

const GirlWithLaptop = dynamic(() => import('../GirlWithLaptop'), {
  // eslint-disable-next-line react/display-name
  loading: () => <Spinner />,
});

export default function GameBoard(): ReactElement {
  const shuffledTiles = useAppSelector(selectShuffledTiles);
  const isWinner = useAppSelector(selectIsWinner);
  const dispatch = useAppDispatch();

  const generateTiles = () => {
    dispatch(initGame());
  };

  useEffect(() => {
    generateTiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGameReset = useCallback(() => {
    dispatch(resetGame());
  }, [dispatch]);

  const handleModalClose = useCallback(() => {
    dispatch(setIsWinner(false));
  }, [dispatch]);

  // handle users click on tile
  const handleTileChecked = useCallback(
    (tileId: number, status: boolean) => {
      dispatch(updateTileStatus({ status, tileId }));
    },
    [dispatch]
  );

  return (
    <div className='bg-[#f0f8fd] w-[90vw] flex relative z-10 flex-col justify-between mx-auto mt-28 max-w-sm h-auto rounded-lg lg:h-[715px] lg:max-w-2xl'>
      <GirlWithLaptop />
      <div className='bg-[#abdddc] min-h-[300px] grid grid-cols-5 grid-rows-5 gap-x-2 gap-y-2 justify-items-center p-2 rounded-lg'>
        {shuffledTiles.map((tile) => (
          <Tile key={tile.id} handleChecked={handleTileChecked} {...tile} />
        ))}
      </div>
      {isWinner && (
        <WinningDialog
          isOpen={isWinner}
          handleClose={handleModalClose}
          handleGameReset={handleGameReset}
        />
      )}
    </div>
  );
}
