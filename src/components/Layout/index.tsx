/**
 *  @author: Razvan Rauta
 *  Date: Dec 01 2021
 *  Time: 10:50
 */

import type { ReactElement, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  // Put Header or Footer Here
  return <>{children}</>;
}
