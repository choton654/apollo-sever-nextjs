import { gql, useApolloClient } from '@apollo/client';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';

const ADD_SONG = gql`
  mutation($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

function createSong() {
  const [state, setstate] = useState({
    title: '',
  });

  const client = useApolloClient();

  return (
    <div className='container'>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <h1>Create New Song</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          client.mutate({
            variables: { title: state.title },
            mutation: ADD_SONG,
            refetchQueries: [
              {
                query: gql`
                  query SongsQuery {
                    songs {
                      id
                      title
                    }
                  }
                `,
              },
            ],
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
