'use client';

import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// getVotesByStatus
export function GetVotesByStatus(status: string) {
  const { data } = useSWR('/api/campaign', fetcher);

  const votesByStatus = data?.filter((vote) => vote.Status === status);
  return {
    votes: votesByStatus,
    totalVote: votesByStatus?.length,
  };
}
