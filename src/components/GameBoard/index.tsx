import type { ReactElement } from 'react';
import React from 'react';

import { insertFreeTile } from '@/lib/helper';

import { freeTile, tiles } from '@/constants';

import GirlWithLaptop from '../GirlWithLaptop';
import Tile from '../Tile';

export default function GameBoard(): ReactElement {
  return (
    <div className='bg-[#f0f8fd] h-[60vh] w-[90vw] flex relative z-10 flex-col justify-between mx-auto max-w-sm rounded-lg lg:h-[650px] lg:max-w-2xl'>
      <GirlWithLaptop />
      <div className='bg-[#abdddc] grid grid-cols-5 grid-rows-5 gap-x-2 gap-y-2 justify-items-center p-2 rounded-lg'>
        {insertFreeTile(tiles, 12, freeTile).map((tile) => (
          <Tile key={tile.id} {...tile} />
        ))}
      </div>
    </div>
  );
}
