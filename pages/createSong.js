import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { ADD_SONG } from '../graphql/mutations';
import { SongsQuery } from '../graphql/queries';

function createSong() {
  const [state, setstate] = useState({
    title: '',
  });

  const client = useApolloClient();

  return (
    <div className='container'>
      <Link href='/'>
        <a
          className='btn waves-effect waves-light'
          style={{
            margin: '10px auto',
          }}>
          Home
        </a>
      </Link>
      <h1>Create New Song</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          client.mutate({
            variables: { title: state.title },
            mutation: ADD_SONG,
            update: (cache, { data: { addSong } }) => {
              console.log(addSong);
              const data = cache.readQuery({ query: SongsQuery });
              cache.writeQuery({
                query: SongsQuery,
                data: {
                  songs: [...data.songs, addSong],
                },
              });
            },
          });
          setstate({
            title: '',
          });
          Router.push('/');
        }}>
        <label>Song Title</label>
        <input
          type='text'
          value={state.title}
          onChange={(e) =>
            setstate({
              title: e.target.value,
            })
          }
        />
      </form>
    </div>
  );
}

export default createSong;
