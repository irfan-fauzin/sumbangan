'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import cn from 'classnames';
import Button from '@/components/ui/button';
import RevealContent from '@/components/ui/reveal-content';
import AuctionCountdown from '@/components/nft/auction-countdown';
import { Switch } from '@/components/ui/switch';
import { CheckmarkIcon } from '@/components/icons/checkmark';
import VotePoll from '@/components/vote/vote-details/vote-poll';
import VoteActions from '@/components/vote/vote-details/vote-actions';
import VoterTable from '@/components/vote/vote-details/voter-table';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import Image from 'next/image';

import darkLogo from '@/assets/images/sedekah-subuh.png';

const Xendit = require('xendit-node');
const x = new Xendit({
  secretKey:
    'xnd_development_p2j1cllVZtJ7XYWPpFFO1jwDBvzexorKIttGsLsVPQTXhTADossE5peKlFZxiSm',
});

const { Invoice } = x;
const i = new Invoice({});

function VoteActionButton() {
  const [amount, setAmount] = useState(0);

  function checkValue(event: any) {
    setAmount(handleDecimalsOnValue(event.currentTarget.value));
  }
  function handleDecimalsOnValue(value: any) {
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  async function handleSubmit(event: any) {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      transaction_details: {
        order_id: 'concert-ticket-053',
        gross_amount: 190000,
      },
      credit_card: {
        secure: true,
      },
      usage_limit: 5,
      expiry: {
        duration: 30,
        unit: 'days',
      },
      item_details: [
        {
          id: 'tix-001',
          name: 'Exclusive Tour Concert Day 1',
          price: 95000,
          quantity: 2,
        },
      ],
      customer_details: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '+62181000000000',
        notes:
          'Thank you for your order. Please follow the instructions to complete payment.',
      },
    };
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = 'https://app.sandbox.midtrans.com/snap/v1/payment-links';

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization:
          'Basic U0ItTWlkLXNlcnZlci1PZXdYNjRCdzJrRndMRU05aGV3S3JIRVU6',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    console.log(result);
  }

  return (
    <div className="mt-4 flex items-center xs:mt-6 xs:inline-flex md:mt-10">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3 md:mb-0 md:w-1/2">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-first-name"
            >
              Nama
            </label>
            <input
              className="mb-3 block w-full  appearance-none rounded border px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              id="nama"
              name="nama"
              type="text"
              placeholder="Opsional"
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-last-email"
            >
              Email
            </label>
            <input
              className="mb-3 block w-full  appearance-none rounded border px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              id="email"
              name="email"
              type="email"
              placeholder="Opsional"
            />
          </div>
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className="w-full px-3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-password"
            >
              Pesan
            </label>
            <input
              className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="pesan"
              name="pesan"
              type="text"
              placeholder="Opsional"
            />
          </div>
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap ">
          <div className="w-full px-3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-password"
            >
              Jumlah Donasi
            </label>
            <div className="mb-6 flex items-center text-lg md:mb-8">
              <div className="absolute p-3 text-lg tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900  dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 ">
                Rp.
              </div>
              <input
                defaultValue={5000}
                min={5000}
                value={amount}
                onChange={checkValue}
                type="text"
                id="jumlah"
                name="jumlah"
                className="h-12 w-full appearance-none rounded-lg border-2 border-gray-200 bg-transparent py-2 text-lg tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 ltr:pl-11 ltr:pr-5 rtl:pr-10 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3">
            <Button type="submit" className="h-12 w-full">
              Donasi
            </Button>
          </div>
        </div>
      </form>

      {/* 
     <form
      className="relative flex w-full rounded-full lg:basis-72 "
      noValidate
  
    >
      <label className="flex items-center">
        <input
          defaultValue={5000}
          min={5000}
          value={amount}
          className="h-12 w-60 mr-4 appearance-none rounded-lg border-2 border-gray-200 bg-transparent py-1 text-lg tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 ltr:pl-10 ltr:pr-5 rtl:pr-10 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500"
          onChange={checkValue}
          autoComplete="off"
        />
        <span className="pointer-events-none absolute flex h-full w-8 cursor-pointer items-center justify-center text-gray-600 hover:text-gray-900 ltr:left-0 ltr:pl-2 rtl:right-0 rtl:pr-2 dark:text-gray-500 sm:ltr:pl-3 sm:rtl:pr-3">
          Rp
        </span>
      </label>
      <Button shape="rounded" color="success" className="h-12 flex-1">
        Donasi
      </Button>
    </form> */}
    </div>
  );
}

// FIXME: need to add vote type
export default function VoteDetailsCard({ vote }: any) {
  const [isExpand, setIsExpand] = useState(false);
  const { layout } = useLayout();

  return (
    <motion.div
      layout
      initial={{ borderRadius: 8 }}
      className={cn(
        'mb-3 rounded-lg bg-white p-5 pt-6 transition-shadow duration-200 dark:bg-light-dark xs:p-6 xl:p-4',
        isExpand ? 'shadow-large' : 'shadow-card hover:shadow-large'
      )}
    >
      <motion.div
        layout
        className={cn('flex w-full flex-col-reverse justify-between ', {
          'md:grid md:grid-cols-2': layout !== LAYOUT_OPTIONS.RETRO,
          'lg:grid lg:grid-cols-2': layout === LAYOUT_OPTIONS.RETRO,
        })}
      >
        <div className="mx-auto">
          <h3
            onClick={() => setIsExpand(!isExpand)}
            className="mb-6 cursor-pointer text-xl font-medium leading-normal dark:text-gray-100"
          >
            {vote.title}
          </h3>

          {vote.status === 'active' && (
            <>
              <h3 className="mb-4 text-sm text-gray-400  md:text-sm md:text-gray-900 dark:md:text-gray-100 lg:text-sm ">
                Berakhir dalam :
              </h3>
              <AuctionCountdown date={new Date(Date.now() + 172800000)} />
            </>
          )}

          {/* <p className="mt-2 text-gray-600 dark:text-gray-400">
             Dibuat oleh {vote.id} 
          </p> */}

          {/* show only when vote is active */}
          {vote.status === 'active' && (
            <>
              {!isExpand ? (
                <Button
                  onClick={() => setIsExpand(!isExpand)}
                  className="mt-4 w-full xs:mt-6 xs:w-auto md:mt-10"
                  shape="rounded"
                >
                  Donasi
                </Button>
              ) : (
                <VoteActionButton />
              )}
            </>
          )}

          {/* show only for past vote */}
          {vote.status === 'past' && (
            <time className="mt-4 block text-gray-400 xs:mt-6 md:mt-7">
              <span className="font-medium">Dibuat</span> pada{' '}
              {dayjs(vote.executed_at).format('MMM DD, YYYY')}
            </time>
          )}
        </div>

        {/* vote countdown timer only for active & off-chain vote */}
        {['active', 'off-chain'].indexOf(vote.status) !== -1 && (
          <div
            className={cn(
              "before:content-[' '] relative grid h-full gap-2 before:absolute before:bottom-0 before:border-b before:border-r before:border-dashed before:border-gray-200 ltr:before:left-0 rtl:before:right-0 dark:border-gray-700 dark:before:border-gray-700 xs:gap-2.5 ",
              {
                'mb-5 pb-5 before:h-[1px] before:w-full md:mb-0 md:pb-0 md:before:h-full md:before:w-[1px] ltr:md:pl-5 rtl:md:pr-5 ltr:xl:pl-3 rtl:xl:pr-3':
                  layout !== LAYOUT_OPTIONS.RETRO,
                'mb-5 pb-5 before:h-[1px] before:w-full ltr:pl-0 lg:mb-0 lg:pb-0 lg:before:h-full lg:before:w-[1px] ltr:lg:pl-3 rtl:lg:pr-3':
                  layout === LAYOUT_OPTIONS.RETRO,
              }
            )}
          >
            <Image
              className="mx-auto cursor-pointer"
              onClick={() => setIsExpand(!isExpand)}
              alt="desc"
              width={640}
              height={600}
              src={darkLogo}
            />
          </div>
        )}

        {/* switch toggle indicator for past vote */}
        {vote.status === 'past' && (
          <div className="mb-4 flex items-center gap-3 md:mb-0 md:items-start md:justify-end">
            <Switch
              checked={isExpand}
              onChange={setIsExpand}
              className="flex items-center gap-3 text-gray-400"
            >
              <span className="inline-flex text-xs font-medium uppercase sm:text-sm">
                Tutup
              </span>
              <div
                className={cn(
                  isExpand
                    ? 'bg-brand dark:bg-white'
                    : 'bg-gray-200 dark:bg-gray-700',
                  'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
                )}
              >
                <span
                  className={cn(
                    isExpand
                      ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-gray-700'
                      : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-gray-200',
                    'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
                  )}
                />
              </div>
              <span className="inline-flex text-xs font-medium uppercase sm:text-sm">
                Buka
              </span>
            </Switch>
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {isExpand && (
          <motion.div
            layout
            initial="exit"
            animate="enter"
            exit="exit"
            variants={fadeInBottom('easeIn', 0.25, 16)}
          >
            <div className="my-6 border-y border-dashed border-gray-200 py-6 text-gray-500 dark:border-gray-700 dark:text-gray-400">
              Penggalangan dana oleh:{' '}
              <a
                href={vote.proposed_by.link}
                className="ml-1 inline-flex items-center gap-3 font-medium text-gray-900 hover:underline hover:opacity-90 focus:underline focus:opacity-90 dark:text-gray-100"
                title="Terverifikasi"
              >
                {vote.proposed_by.id} <CheckmarkIcon className="h-auto w-3" />
              </a>
            </div>
            <VotePoll
              title={''}
              accepted={vote?.accepted}
              rejected={vote?.rejected}
            />
            <VoterTable votes={vote?.votes} />
            <RevealContent defaultHeight={250}>
              <h4 className="mb-6 uppercase dark:text-gray-100">Description</h4>
              <div
                className="dynamic-html grid gap-2 leading-relaxed text-gray-600 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: vote.description }}
              />
            </RevealContent>
            {/* <RevealContent
              defaultHeight={320}
              className="mt-6 border-t border-dashed border-gray-200 pt-6 dark:border-gray-700"
            >
              <VoteActions title={'Actions'} action={vote?.action} />
            </RevealContent>
            <div className="mt-6 flex items-center justify-center border-t border-dashed border-gray-200 pt-6 dark:border-gray-700">
              <Button
                shape="rounded"
                fullWidth={true}
                className={cn({
                  'sm:w-4/6 md:w-3/6 xl:w-2/6': layout !== LAYOUT_OPTIONS.RETRO,
                  'w-full lg:w-3/6 2xl:w-[48%] 3xl:w-1/3':
                    layout === LAYOUT_OPTIONS.RETRO,
                })}
              >
                Add POOL token to MetaMask
              </Button>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
