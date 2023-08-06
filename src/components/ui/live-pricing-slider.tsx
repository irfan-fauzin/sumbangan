'use client';

import { ArrowUp } from '@/components/icons/arrow-up';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Autoplay } from 'swiper';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import cn from 'classnames';
import { priceFeedData } from '@/data/static/price-feed';
import Link from 'next/link';

type LivePriceFeedProps = {
  name: string;
  symbol: string;
  balance: string;
  usdBalance: string;
};

export function LivePricingFeed({
  name,
  symbol,

  balance,
  usdBalance,
}: LivePriceFeedProps) {
  return (
    <div
      className={cn(
        'mb-6 flex items-center gap-4 rounded-lg bg-white p-5 shadow-[0_8px_16px_rgba(17,24,39,0.05)] dark:bg-light-dark lg:flex-row'
      )}
    >
      <div className="w-full flex-col">
        <Link
          href={'https://test.com'}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="mb-3 flex items-center justify-between">
            <h4 className="truncate text-sm font-medium text-gray-900  dark:text-white">
              {name}
            </h4>

            <div className="truncate text-xs -tracking-wide text-gray-600 ltr:pl-2 rtl:pr-2 dark:text-gray-400 xs:text-sm ">
              08-02-2023
            </div>
          </div>

          <div className="mb-2 text-sm font-medium tracking-tighter text-gray-900 dark:text-white lg:text-lg 2xl:text-xl 3xl:text-2xl">
            {balance}
            <span className="ml-3">{symbol}</span>
          </div>

          <div className="flex items-center text-xs font-medium 2xl:text-sm">
            <span
              className="truncate text-xs tracking-tighter text-gray-600 ltr:mr-5 rtl:ml-5 dark:text-gray-400 2xl:w-24 3xl:w-auto"
              title={`${usdBalance}`}
            >
              {usdBalance}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function LivePricingSlider({ limits }: { limits: number }) {
  const breakpoint = useBreakpoint();

  const limit = limits ?? 4;

  const sliderBreakPoints = {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1600: {
      slidesPerView: limit,
      spaceBetween: 24,
    },
  };

  return (
    <Swiper
      modules={[Autoplay, Pagination, A11y]}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={sliderBreakPoints}
      pagination={{ clickable: true }}
      observer={true}
      dir="ltr"
      className="w-full pb-10"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {priceFeedData.map((item) => (
        <SwiperSlide key={item.id}>
          <LivePricingFeed {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
