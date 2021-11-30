import type { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage(): ReactElement {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-dark min-h-screen min-w-full'>Hello</section>
      </main>
    </Layout>
  );
}
