import { gql, useApolloClient, useMutation } from '@apollo/client';
import React from 'react';

const DELETE_LYRIC = gql`
  mutation($lyricId: ID!) {
    deleteLyric(lyricId: $lyricId) {
      title
    }
  }
`;

function LyricList({ lyrics, songId }) {
  const [deleteLyric, { data }] = useMutation(DELETE_LYRIC, {
    refetchQueries: [
      {
        variables: { id: songId },
        query: gql`
          query SongDetailsQuery($id: ID!) {
            song(id: $id) {
              id
              title
              lyrics {
                id
              }
            }
          }
        `,
      },
    ],
  });

  const client = useApolloClient();
  // console.log(client.cache);
  return (
    <div>
      <ul className='collection'>
        {lyrics.map((lyric) => (
          <li className='collection-item' key={lyric.id}>
            {lyric.content}
            <button
              type='button'
              className='btn waves-effect waves-light'
              onClick={() => {
                deleteLyric({ variables: { lyricId: lyric.id } });
              }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LyricList;
