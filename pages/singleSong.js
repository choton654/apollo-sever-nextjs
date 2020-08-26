import { gql, useApolloClient, useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import AddLyric from '../components/AddLyric';
import LyricList from '../components/LyricList';

const SongDetailsQuery = gql`
  query SongDetailsQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;

function singleSong({ songId }) {
  const { data, loading, error } = useQuery(SongDetailsQuery, {
    variables: { id: songId },
  });

  const client = useApolloClient();
  // console.log(client.extract());

  if (loading) return <h4>loading...</h4>;
  if (error) return <h4>{error.message}</h4>;

  return (
    <div>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <h1>{data.song.title}</h1>
      <LyricList lyrics={data.song.lyrics} songId={songId} />
      <AddLyric songId={songId} />
    </div>
  );
}

singleSong.getInitialProps = async ({ query: { songId } }) => {
  return { songId };
};

export default singleSong;
