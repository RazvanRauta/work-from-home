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
}

export default function Tile({ id, message }: TileProps): ReactElement {
  const isFreeTile = id === freeTile.id;
  const handleOnClick = () => {
    if (id === freeTile.id) {
      return;
    }
  };
  return (
    <div
      className={clsx(
        'bg-[#f0f8fd] flex justify-center justify-self-center items-center p-1 w-full h-16 rounded-2xl cursor-pointer lg:h-20',
        isFreeTile && 'disabled cursor-not-allowed'
      )}
      onClick={handleOnClick}
    >
      <p className='text-[#33697d] text-[10px] font-sans leading-3 text-center capitalize lg:text-xs lg:font-semibold lg:leading-5 lg:uppercase'>
        {message}
      </p>
    </div>
  );
}
