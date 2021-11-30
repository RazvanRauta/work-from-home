import clsx from 'clsx';

import type { UnstyledLinkProps } from '@/components/links/UnstyledLink';
import UnstyledLink from '@/components/links/UnstyledLink';

export default function CustomLink({
  children,
  className = '',
  ...rest
}: UnstyledLinkProps) {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'animated-underline custom-link font-bold inline-flex items-center',
        'focus-visible:ring focus:outline-none ring-primary-400/70',
        'border-b border-dark border-dotted hover:border-black/0',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
}
