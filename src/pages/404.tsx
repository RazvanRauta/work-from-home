import type { ReactElement } from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Layout from '@/components/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function NotFoundPage(): ReactElement {
  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-dark'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center text-white'>
            <RiAlarmWarningFill
              size={60}
              className='animate-flicker drop-shadow-glow text-yellow-300'
            />
            <h1 className='mt-8'>Page Not Found</h1>
            <CustomLink className='mt-4' href='/'>
              Back to Home
            </CustomLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
