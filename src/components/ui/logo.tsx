

'use client';

import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import { useLayout } from '@/lib/hooks/use-layout';
import lightLogo from '@/assets/images/logo.png';
import darkLogo from '@/assets/images/logo-white.png';
import routes from '@/config/routes';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import cn from 'classnames';

interface LogoPropTypes {
  className?: string;
}

export default function Logo({ className }: LogoPropTypes) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    isMounted && (
      <AnchorLink
        href={{
          pathname:
            routes.home + (layout === LAYOUT_OPTIONS.MODERN ? '' : layout),
        }}
        className={cn('flex w-52 outline-none sm:w-52 4xl:w-52 ', className)}
      >
        <span className="relative flex overflow-hidden">
          {isDarkMode && (
            <Image src={darkLogo} alt="Criptic"  priority />
          )}
          {!isDarkMode && (
            <Image src={lightLogo} alt="Criptic"  priority />
          )}
        </span>
      </AnchorLink>
    )
  );
}
