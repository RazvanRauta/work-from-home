import type { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage(): ReactElement {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-dark min-w-full min-h-screen'>Hello</section>
      </main>
    </Layout>
  );
}
