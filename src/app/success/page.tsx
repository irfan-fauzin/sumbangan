'use client';

import React from 'react';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';

import { LAYOUT_OPTIONS } from '@/lib/constants';
import { useLayout } from '@/lib/hooks/use-layout';
import ModernLayout from '@/layouts/modern/layout';
import MinimalLayout from '@/layouts/minimal/layout';
import RetroLayout from '@/layouts/retro/layout';
import ClassicLayout from '@/layouts/classic/layout';
import { ExportIcon } from '@/components/icons/export-icon';

import Lottie from 'lottie-react';

import Blockchain from '@/assets/images/sumbangan-chain.json';
import BlockchainWhite from '@/assets/images/sumbangan-chain-white.json';

const Layout = ({ children }: React.PropsWithChildren) => {
  const { layout } = useLayout();
  if (layout === LAYOUT_OPTIONS.MINIMAL) {
    return <MinimalLayout>{children}</MinimalLayout>;
  }
  if (layout === LAYOUT_OPTIONS.CLASSIC) {
    return <ClassicLayout>{children}</ClassicLayout>;
  }
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return <RetroLayout>{children}</RetroLayout>;
  }
  return <ModernLayout>{children}</ModernLayout>;
};

const NotFoundPage = () => {
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    <Layout>
      <div className="flex max-w-full flex-col items-center justify-center text-center">
        <div className="relative w-52 max-w-full sm:w-[300px] xl:w-[350px] 3xl:w-[350px]">
          {isMounted && !isDarkMode && (
            <Lottie
              animationData={Blockchain}
              className="flex items-center justify-center"
              loop={true}
            />
          )}
          {isMounted && isDarkMode && (
            <Lottie
              animationData={BlockchainWhite}
              className="flex items-center justify-center"
              loop={true}
            />
          )}
        </div>

        <h2 className="mb-2 mt-5 text-base font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:mb-4 sm:mt-10 sm:text-xl 3xl:mt-12 3xl:text-2xl">
          Terima kasih ❤️
        </h2>
        <p className="mb-4 max-w-full text-xs leading-loose tracking-tight text-gray-600 dark:text-gray-400 sm:mb-6 sm:w-[430px] sm:text-sm sm:leading-loose">
          Donasi anda telah tercatat di Solana Blockchain
        </p>

        <div className="grid grid-cols-3 justify-start gap-4 border-y border-dashed border-gray-200 py-5 text-left  dark:border-gray-700 ">
          <div className="...">
            <div className="font-bold	tracking-tighter text-gray-900 dark:text-white">
              ID Transaksi
            </div>
            <div className="font-bold	tracking-tighter text-gray-900 dark:text-white">
              Campaign
            </div>
            <div className="font-bold	tracking-tighter text-gray-900 dark:text-white">
              Donatur
            </div>
            <div className="font-bold	tracking-tighter text-gray-900 dark:text-white">
              Jumlah
            </div>
            <div className="font-bold	tracking-tighter text-gray-900 dark:text-white">
              Pesan
            </div>
            <div className="font-bold	tracking-tighter text-gray-900 dark:text-white">
              Waktu
            </div>
          </div>
          <div className="... col-span-2">
            <div className="truncate">
              <a
                href="https://solscan.io/tx/2S95Qv6E3JBeX6nXgoaVuMaLtySAzLg15PxxUAqyX692aA2cH4quQb9hrZp3o6FmJZ43XBEuhGXKaWZ7KC3pDuqF"
                className="inline-flex font-medium text-gray-900 hover:underline hover:opacity-90 focus:underline focus:opacity-90 dark:text-gray-100"
              >
                2S95Qv6E3JBeX6nXgoaVuMaLtySAzLg15PxxUAqyX692aA2cH4quQb9h....
                <ExportIcon className="h-auto w-3" />
              </a>
            </div>
            <div className="truncate">
              Berbagi Kasih dengan Sedekah Makan untuk Yatim dhuafa
            </div>
            <div>09</div>
            <div>09</div>
            <div>09</div>
            <div>09</div>
          </div>
        </div>

        <AnchorLink
          className="mt-6"
          href={{
            pathname:
              layout === LAYOUT_OPTIONS.MODERN ? '/' : routes.home + layout,
          }}
        >
          <Button shape="rounded">Back to Home</Button>
        </AnchorLink>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
