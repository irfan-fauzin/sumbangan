import cn from 'classnames';
import { Plus } from '@/components/icons/plus';
import { ChevronForward } from '@/components/icons/chevron-forward';

export default function TopupButton({
  value,
  className,
}: React.PropsWithChildren<{ className?: string; value?: string }>) {
  return (
    <button
      onClick={() => {
        navigator.clipboard
          .writeText(value)
          .then(
            window.open(
              'https://explorer.solana.com/address/' + value + '?cluster=devnet'
            )
          );
      }}
      className={cn(
        'flex h-10  items-center whitespace-nowrap rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 px-6 text-sm  tracking-wider text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:h-12 3xl:h-13',
        className
      )}
    >
      <span className=" flex-grow text-justify text-xs lg:text-sm">
        {value}
      </span>
    </button>
  );
}
