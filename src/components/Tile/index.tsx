/**
 *  @author: Razvan Rauta
 *  Date: Dec 01 2021
 *  Time: 11:27
 */

import clsx from 'clsx';
import type { ReactElement } from 'react';
import React from 'react';

import { freeTile } from '@/constants';

interface TileProps {
  id: number;
  message: string;
  isChecked?: boolean;
  isPreviousWin?: boolean;
  handleChecked: (id: number, value: boolean) => void;
}

export default function Tile({
  id,
  message,
  isChecked,
  handleChecked,
  isPreviousWin,
}: TileProps): ReactElement {
  const isFreeTile = id === freeTile.id;
  const handleOnClick = () => {
    if (id === freeTile.id) {
      return;
    }
    handleChecked(id, !isChecked);
  };
  return (
    <div
      className={clsx(
        'bg-[#f0f8fd] flex justify-center justify-self-center items-center p-1 w-full h-16 rounded-2xl transition duration-150 cursor-pointer lg:h-20',
        isFreeTile &&
          'disabled cursor-not-allowed free-tile bg-transparent bg-contain',
        isChecked && !isFreeTile && 'bg-red-400',
        isPreviousWin && isChecked && !isFreeTile && 'bg-green-400'
      )}
      onClick={handleOnClick}
    >
      <p
        className={clsx(
          'text-[#33697d] text-[10px] font-sans leading-3 text-center capitalize lg:text-xs lg:font-semibold lg:leading-5 lg:uppercase',
          isChecked && 'text-pink-100'
        )}
      >
        {message}
      </p>
    </div>
  );
}
