/**
 *  @author: Razvan Rauta
 *  Date: Dec 01 2021
 *  Time: 10:50
 */

import type { ReactElement } from 'react';

import GameBoard from '@/components/GameBoard';
import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import Waves from '@/components/Waves';

export default function HomePage(): ReactElement {
  return (
    <Layout>
      <Seo />
      <main className='blurry-gradient spacer min-w-full min-h-screen'>
        <section className='flex relative flex-col justify-center items-center w-full h-full'>
          <GameBoard />
        </section>
        <Waves />
      </main>
    </Layout>
  );
}
