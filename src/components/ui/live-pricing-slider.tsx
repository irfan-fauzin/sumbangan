'use client';


import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Autoplay } from 'swiper';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import cn from 'classnames';

import Link from 'next/link';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function LivePricingSlider({ limits }: { limits: number }) {
  const { data } = useSWR('/api/campaign/donate', fetcher);



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

  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString('id-ID', options);
  }

  return (
    <>
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
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
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
                      {item?.Name}
                    </h4>

                    <div className="truncate text-xs -tracking-wide text-gray-600 ltr:pl-2 rtl:pr-2 dark:text-gray-400 xs:text-sm ">
                      {formatDate(item?.Donation_date)}
                    </div>
                  </div>

                  <div className="mb-2 text-sm font-medium tracking-tighter text-gray-900 dark:text-white lg:text-lg 2xl:text-xl 3xl:text-2xl">
                    Rp.{' '}
                    {String(item?.Amount)
                      .replace(/\D/g, '')
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </div>

                  <div className="flex items-center text-xs font-medium 2xl:text-sm">
                    <span className="truncate text-xs tracking-tighter text-gray-600 ltr:mr-5 rtl:ml-5 dark:text-gray-400 2xl:w-24 3xl:w-auto">
                      {item['campaign'][0]['Title']}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
