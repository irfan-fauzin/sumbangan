import { motion } from 'framer-motion';

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
            width={`${percentage(data.Collected, data.Target)}%`}
          />
        </svg>
      </div>
      <div className="flex items-start justify-between">
        <div className="text-green-500 ltr:text-left rtl:text-right">
          <h5 className="mb-1 font-medium uppercase sm:mb-2 sm:text-base">
            Terkumpul
          </h5>

          {data.Collected > data.Target ? (
            <p>{rupiah(data.Collected)}</p>
          ) : (
            <p>
              {rupiah(data.Collected)} (
              {percentage(data.Collected, data.Target)}%)
            </p>
          )}
        </div>
        <div className="ltr:text-right rtl:text-left">
          {data.Collected > data.Target ? (
            <div className="text-green-500">
              <h5 className="mb-1 font-medium uppercase text-green-500 sm:mb-2 sm:text-base">
                MELEBIHI TARGET 😍
              </h5>
              +{rupiah(data.Collected - data.Target)} (
              {(100 - percentage(data.Collected, data.Target) * -1).toFixed(2)}
              %)
            </div>
          ) : (
            <div className="text-red-500">
              <h5 className="mb-1 font-medium uppercase  sm:mb-2 sm:text-base">
                KURANG
              </h5>
              - {rupiah(data.Target - data.Collected)} (
              {(100 - percentage(data.Collected, data.Target)).toFixed(2)}%)
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
