import React, { useEffect, useState } from 'react';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { LinkIcon } from '@/components/icons/link-icon';
import useSWR from 'swr';
import moment from 'moment-timezone';
import * as web3 from '@solana/web3.js';
import { Wallet, Program, AnchorProvider } from '@project-serum/anchor';
import idl from '@/assets/idl.json';

const programId = new web3.PublicKey(
  'DxFqiZrrtGpGTpWod54Gop9fZvEu95zBBf32kWTvLjdu'
);
const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
const a = JSON.stringify(idl);
const parsedidl = JSON.parse(a);

const secret = [
  251, 17, 248, 25, 28, 204, 219, 142, 71, 100, 228, 255, 74, 95, 79, 115, 66,
  44, 71, 114, 57, 48, 217, 180, 117, 201, 212, 83, 196, 28, 76, 192, 10, 184,
  248, 69, 111, 232, 95, 165, 148, 14, 45, 225, 226, 152, 35, 122, 134, 197, 15,
  160, 130, 102, 63, 95, 17, 130, 192, 52, 118, 75, 103, 34,
];
// Replace with your secret key
const from = web3.Keypair.fromSecretKey(new Uint8Array(secret));

const provider = new AnchorProvider(connection, {
  commitment: 'processed',
});

const program = new Program(parsedidl, programId, provider);

function formatDate(string) {
  return moment(string).locale('id').format('LLL');
}

const COLUMNS = [
  {
    Header: () => <div className="ltr:mr-auto rtl:ml-auto">Campaign</div>,
    accessor: 'account',
    id: 'campaign',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className=" truncate ltr:text-left rtl:text-right">
        {value.campaign}
      </div>
    ),
    minWidth: 200,
    maxWidth: 200,
  },
  {
    Header: () => <div className="ltr:mr-auto rtl:ml-auto">Donatur</div>,
    accessor: 'account',
    id: 'donatur',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-left rtl:text-right">{value.donatur}</div>
    ),
    minWidth: 190,
    maxWidth: 190,
  },

  {
    Header: () => <div className="ltr:mr-auto rtl:ml-auto">Amount</div>,
    accessor: 'account',
    id: 'amount',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="-tracking-[1px] ltr:text-right rtl:text-left">
        <strong className="mb-0.5 flex justify-start  md:mb-1.5  ">
          Rp.{' '}
          {String(value.amount)
            .replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          <span className="inline-block ltr:ml-1.5 rtl:mr-1.5 md:ltr:ml-2 md:rtl:mr-2"></span>
        </strong>
      </div>
    ),
    minWidth: 100,
    maxWidth: 150,
  },

  {
    Header: () => <div className="ltr:mr-auto rtl:ml-auto">Payment</div>,
    accessor: 'account',
    id: 'paymentMethod',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-start">
        {value.paymentMethod}
      </div>
    ),
    minWidth: 100,
    maxWidth: 180,
  },
  {
    Header: () => (
      <div className="ltr:mr-auto rtl:mr-auto">Solana Transaction</div>
    ),
    accessor: 'publicKey',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-start">
        <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" />{' '}
        <a
          href={
            `https://explorer.solana.com/address/` + value + `?cluster=devnet`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Link
        </a>
      </div>
    ),
    minWidth: 200,
    maxWidth: 200,
  },

  {
    Header: () => <div className="ltr:mr-auto rtl:ml-auto">Date</div>,
    accessor: 'account',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-start">
        {formatDate(value.date)}
      </div>
    ),
    minWidth: 250,
    maxWidth: 250,
  },
];

export default function TransactionTable() {
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, error, isLoading } = useSWR('/api/test', fetcher);

  // if (error) return <div>Failed to fetch users.</div>;
  // if (isLoading) return <h2>Loading...</h2>;

  const [data, setColor] = useState([]);

  data.sort((a, b) => (a.account.date < b.account.date ? -1 : 1));

  useEffect(() => {
    let mounted = true;
    program.account.donateAccount.all().then((items) => {
      if (mounted) {
        console.log(items.forEach((person) => console.log(person.publicKey)));

        setColor(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const columns = COLUMNS;

  // @ts-ignore
  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  const { pageIndex } = state;

  return (
    <div className="">
      <div className="rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
        <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
          <h2 className="mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
            Histori Donasi
          </h2>
        </div>
      </div>
      <div className="-mx-0.5 dark:[&_.os-scrollbar_.os-scrollbar-track_.os-scrollbar-handle:before]:!bg-white/50">
        <Scrollbar style={{ width: '100%' }} autoHide="never">
          <div className="px-0.5">
            <table
              {...getTableProps()}
              className="transaction-table w-full border-separate border-0"
            >
              <thead className="text-sm text-gray-500 dark:text-gray-300">
                {headerGroups.map((headerGroup, idx) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                    {headerGroup.headers.map((column, idx) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={idx}
                        className="group  bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
                      >
                        <div className="flex items-center">
                          {column.render('Header')}
                          {column.canResize && (
                            <div
                              {...column.getResizerProps()}
                              className={`resizer ${
                                column.isResizing ? 'isResizing' : ''
                              }`}
                            />
                          )}
                          <span className="ltr:ml-1 rtl:mr-1">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ChevronDown />
                              ) : (
                                <ChevronDown className="rotate-180" />
                              )
                            ) : (
                              <ChevronDown className="rotate-180 opacity-0 transition group-hover:opacity-50" />
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="text-xs font-medium text-gray-900 dark:text-white 3xl:text-sm"
              >
                {page.map((row, idx) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={idx}
                      className="mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                    >
                      {row.cells.map((cell, idx) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={idx}
                            className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Scrollbar>
      </div>
      <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-5 py-4 text-sm shadow-card dark:bg-light-dark lg:py-6">
        <div className="flex items-center gap-5">
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            title="Previous"
            shape="circle"
            variant="transparent"
            size="small"
            className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
          >
            <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
          </Button>
          <div>
            Page{' '}
            <strong className="font-semibold">
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </div>
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            title="Next"
            shape="circle"
            variant="transparent"
            size="small"
            className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
          >
            <LongArrowRight className="h-auto w-4 rtl:rotate-180 " />
          </Button>
        </div>
      </div>
    </div>
  );
}
