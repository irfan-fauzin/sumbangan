import { motion } from 'framer-motion';

import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const rupiah = (number: any) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

interface VotePollTypes {
  data: any;
}

function percentage(partialValue: any, totalValue: any) {
  return ((100 * partialValue) / totalValue).toFixed(2);
}

export default function VotePoll({ data }: VotePollTypes) {
  const {
    data: amount,
    error,
    isLoading,
  } = useSWR('/api/campaign/amount?id=' + data.id, fetcher);

  console.log(data);

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
  return (
    <motion.div layout className="mb-6">
      <h4 className="mb-3 uppercase dark:text-gray-100">{data.Title}</h4>
      <div className="mb-3">
        <svg width="100%" height="8">
          <rect x="0" y="0" width="100%" height="8" fill="#FA606A" />
          <rect
            x="0"
            y="0"
            height="8"
            fill="#28D294"
            width={`${percentage(amount._sum.Amount, data.Target)}%`}
          />
        </svg>
      </div>
      <div className="flex items-start justify-between">
        <div className="text-green-500 ltr:text-left rtl:text-right">
          <h5 className="mb-1 font-medium uppercase sm:mb-2 sm:text-base">
            Terkumpul
          </h5>

          {amount._sum.Amount > data.Target ? (
            <p>{rupiah(amount._sum.Amount)}</p>
          ) : (
            <p>
              {rupiah(amount._sum.Amount)} (
              {percentage(amount._sum.Amount, data.Target)}%)
            </p>
          )}
        </div>
        <div className="ltr:text-right rtl:text-left">
          {amount._sum.Amount > data.Target ? (
            <div className="text-green-500">
              <h5 className="mb-1 font-medium uppercase text-green-500 sm:mb-2 sm:text-base">
                MELEBIHI TARGET 😍
              </h5>
              +{rupiah(amount._sum.Amount - data.Target)} (
              {(100 - percentage(amount._sum.Amount, data.Target) * -1).toFixed(
                2
              )}
              %)
            </div>
          ) : (
            <div className="text-red-500">
              <h5 className="mb-1 font-medium uppercase  sm:mb-2 sm:text-base">
                KURANG
              </h5>
              - {rupiah(data.Target - amount._sum.Amount)} (
              {(100 - percentage(amount._sum.Amount, data.Target)).toFixed(2)}%)
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
