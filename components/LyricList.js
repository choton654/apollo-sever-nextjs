import { useApolloClient } from '@apollo/client';
import React from 'react';
import { DELETE_LYRIC, LIKE_LYRIC, UNLIKE_LYRIC } from '../graphql/mutations';
import { SongDetailsQuery } from '../graphql/queries';

function LyricList({ lyrics, songId }) {
  const client = useApolloClient();
  return (
    <div>
      <ul className='collection'>
        {lyrics.map((lyric) => (
          <li
            className='collection-item'
            key={lyric.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            {lyric.content}
            <button
              type='button'
              className='btn waves-effect waves-light'
              onClick={() => {
                client.mutate({
                  variables: { lyricId: lyric.id },
                  mutation: DELETE_LYRIC,
                  update: (cache) => {
                    const data = cache.readQuery({
                      variables: { id: songId },
                      query: SongDetailsQuery,
                    });
                    console.log(data);
                    cache.writeQuery({
                      variables: { id: songId },
                      query: SongDetailsQuery,
                      data: {
                        song: {
                          ...data.song,
                          lyrics: data.song.lyrics.filter(
                            (l) => l.id !== lyric.id,
                          ),
                        },
                      },
                    });
                  },
                });
              }}>
              Delete
            </button>
            <div
              style={{
                display: 'flex',
              }}>
              <i
                className='material-icons'
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  client.mutate({
                    variables: { lyricId: lyric.id },
                    mutation: LIKE_LYRIC,
                    optimisticResponse: {
                      __typename: 'Mutation',
                      likeLyric: {
                        id: lyric.id,
                        likes: lyric.likes + 1,
                        __typename: 'Lyric',
                      },
                    },
                  });
                }}>
                thumb_up
              </i>
              <i
                className='material-icons'
                style={{
                  cursor: 'pointer',
                  marginLeft: '5px',
                }}
                onClick={() => {
                  client.mutate({
                    variables: { lyricId: lyric.id },
                    mutation: UNLIKE_LYRIC,
                    optimisticResponse: {
                      __typename: 'Mutation',
                      unlikeLyric: {
                        id: lyric.id,
                        likes: lyric.likes - 1,
                        __typename: 'Lyric',
                      },
                    },
                  });
                }}>
                thumb_down
              </i>
              <span className='badge'>{lyric.likes}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LyricList;
