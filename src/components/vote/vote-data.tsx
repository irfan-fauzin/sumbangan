'use client';
import './loader.css';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// getVotesByStatus
export function GetVotesByStatus(status: string) {
  const { data, error, isLoading } = useSWR('/api/campaign', fetcher);

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

  const votesByStatus = data?.filter((vote) => vote.Status === status);
  return {
    votes: votesByStatus,
    totalVote: votesByStatus?.length,
  };
}
