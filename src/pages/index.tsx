/**
 *  @author: Razvan Rauta
 *  Date: Dec 01 2021
 *  Time: 10:50
 */

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';
import { useLayoutEffect, useState } from 'react';

import GameBoard from '@/components/GameBoard';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

const Waves = dynamic(() => import('@/components/Waves'));

export default function HomePage(): ReactElement {
  const [classes, setClasses] = useState('min-h-screen min-w-full spacer');

  // set a different BG for Chrome users
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const isChrome =
        navigator.userAgent.indexOf('Chrome') != -1 &&
        navigator.vendor.indexOf('Google Inc') != -1;
      setClasses((prev) =>
        clsx(isChrome ? 'blurry-gradient-chrome' : 'blurry-gradient', prev)
      );
    }
  }, []);

  return (
    <Layout>
      <Seo />
      <main className={classes}>
        <section className='flex relative flex-col justify-start items-center pb-5 w-full h-full lg:justify-center'>
          <GameBoard />
        </section>
        <Waves />
      </main>
    </Layout>
  );
}
