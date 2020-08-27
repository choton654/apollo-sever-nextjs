import { useApolloClient, useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import AddLyric from '../components/AddLyric';
import LyricList from '../components/LyricList';
import { SongDetailsQuery } from '../graphql/queries';

function singleSong({ songId }) {
  const { data, loading, error } = useQuery(SongDetailsQuery, {
    variables: { id: songId },
  });

  const client = useApolloClient();

  if (loading) return <h4>loading...</h4>;
  if (error) return <h4>{error.message}</h4>;

  return (
    <div>
      <Link href='/'>
        <a
          className='btn waves-effect waves-light'
          style={{
            margin: '10px auto',
          }}>
          Home
        </a>
      </Link>
      <h1>{data.song.title}</h1>
      <LyricList lyrics={data.song.lyrics} songId={songId} />
      <AddLyric songId={songId} />
    </div>
  );
}

singleSong.getInitialProps = async ({ query: { songId } }) => {
  if (!songId) {
    return {};
  }
  return { songId };
};

export default singleSong;
