'use client';

import { useSearchParams } from 'next/navigation';
import './loader.css';
import { mutate } from 'swr';
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

import loader from '@/assets/images/loader.json';

import useSWR from 'swr';
import moment from 'moment-timezone';

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
  mutate('/api/campaign');
  const searchParams = useSearchParams();
  const search = searchParams?.get('order_id');
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();

  const url = `/api/campaign/donate/?order_id=${search}`;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error)
    return <div>Koneksi internet bermasalah atau Server sedang gangguan</div>;

  if (isLoading)
    return (
      <>
        <div className="flex justify-center pt-10">
          <span className=" loader"></span>
        </div>
      </>
    );

  function formatDate(string) {
    return moment(string).locale('id').subtract(7, 'hours').format('LLL');

    // var m = moment(string).locale("id")
    // var str = moment(m).format('DD-MM-YYYY HH:mm:ss ZZ');

    // return moment.tz(str, 'Asia/Jakarta').subtract(1,"days").add(2,"hours").add(1, "months").format('LLL');
  }

  return (
    <Layout>
      <div className="flex max-w-full flex-col items-center justify-center text-center">
        {data.length === 0 ? (
          'Order ID tidak valid'
        ) : data[0].status === 'paid' ? (
          <>
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
              Donasi anda telah tercatat di Blockchain Solana
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
                  Metode
                </div>
                <div className="font-bold	tracking-tighter text-gray-900 dark:text-white">
                  Pesan
                </div>
                <div className="font-bold	tracking-tighter text-gray-900 dark:text-white">
                  Waktu
                </div>
              </div>
              <div className="col-span-2">
                <div className="truncate">
                  <a
                    href={
                      `https://solscan.io/tx/` +
                      data[0].tx_solana +
                      `?cluster=devnet`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex font-medium text-gray-900 hover:underline hover:opacity-90 focus:underline focus:opacity-90 dark:text-gray-100"
                  >
                    {data[0].tx_solana.substring(0, 40)}...&nbsp;
                    <ExportIcon className="h-auto w-3" />
                  </a>
                </div>
                <div className="truncate">{data[0].campaign[0].Title}</div>

                <div>{data[0].Name}</div>
                <div>
                  Rp.{' '}
                  {String(data[0].Amount)
                    .replace(/\D/g, '')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </div>
                <div>{data[0].payment_method}</div>
                <div>
                  {data[0].Message === null ? (
                    <span>&#8203;</span>
                  ) : (
                    data[0].Message
                  )}
                </div>
                <div>{formatDate(data[0].Donation_date)}</div>
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
          </>
        ) : (
          <>
            <div className="relative w-52 max-w-full sm:w-[300px] xl:w-[350px] 3xl:w-[350px]">
              <Lottie
                animationData={loader}
                className="flex items-center justify-center"
                loop={true}
              />
            </div>

            <h2 className="mb-2 mt-5 text-base font-medium uppercase tracking-wide text-gray-900 dark:text-white sm:mb-4 sm:mt-10 sm:text-xl 3xl:mt-12 3xl:text-2xl">
              Menunggu pembayaran
            </h2>
            <p className="mb-4 max-w-full text-xs leading-loose tracking-tight text-gray-600 dark:text-gray-400 sm:mb-6 sm:w-[430px] sm:text-sm sm:leading-loose">
              Donasi anda nantinya akan dicatat didalam Blockchain Solana
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
                  Metode
                </div>
                <div className="font-bold	tracking-tighter text-gray-900 dark:text-white">
                  Pesan
                </div>
                <div className="font-bold	tracking-tighter text-gray-900 dark:text-white">
                  Waktu
                </div>
              </div>
              <div className="col-span-2">
                <div className="truncate">
                  <span>&#8203;</span>
                </div>
                <div className="truncate">{data[0].campaign[0].Title}</div>

                <div>{data[0].Name}</div>
                <div>
                  Rp.{' '}
                  {String(data[0].Amount)
                    .replace(/\D/g, '')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </div>
                <div>
                  <span>&#8203;</span>
                </div>
                <div>
                  {data[0].Message === null ? (
                    <span>&#8203;</span>
                  ) : (
                    data[0].Message
                  )}
                </div>
                <div>
                  <span>&#8203;</span>
                </div>
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default NotFoundPage;
