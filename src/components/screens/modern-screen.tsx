'use client';

import cn from 'classnames';
import CoinSlider from '@/components/ui/coin-card';
import OverviewChart from '@/components/ui/chats/overview-chart';
import LiquidityChart from '@/components/ui/chats/liquidity-chart';
import VolumeChart from '@/components/ui/chats/volume-chart';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import TopCurrencyTable from '@/components/top-currency/currency-table';
import { coinSlideData } from '@/data/static/coin-slide-data';
import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';

//images
import AuthorImage from '@/assets/images/rupiah.png';

import useSWR from 'swr';
import '@/assets/css/loader.css';
export default function ModernScreen() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: donate,
    error,
    isLoading,
  } = useSWR('/api/campaign/amount', fetcher);

  const { data: donate2 } = useSWR('/api/campaign/donate', fetcher);
  if (!donate2) return null;

  if (error)
    return <div>Koneksi internet bermasalah atau Server sedang gangguan</div>;

  if (isLoading)
    return (
      <>
        <div className="flex justify-center pt-10">
          <span className="loader"></span>
        </div>
      </>
    );

  return (
    <>
      <div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-2">
        <LiquidityChart />
        <VolumeChart />
      </div>

      <div className="flex flex-wrap">
        <div
          className={cn(
            'w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]'
          )}
        >
          <TransactionTable />
        </div>
        <div
          className={cn(
            'order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]'
          )}
        >
          <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
            <Avatar
              image={AuthorImage}
              alt="Author"
              className="mx-auto mb-6"
              size="lg"
            />
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
              Jumlah Dana Terkumpul
            </h3>
            <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
              Rp.{' '}
              {String(donate._sum.Amount)
                .replace(/\D/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </div>
          </div>
          <TopPools />
        </div>
      </div>
    </>
  );
}
