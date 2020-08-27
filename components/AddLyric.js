import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_LYRIC } from '../graphql/mutations';

function AddLyric({ songId }) {
  const [content, setcontent] = useState('');
  const [addLyricToSong, { data }] = useMutation(ADD_LYRIC, {
    update: (cache, { data }) => {
      console.log(data);
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addLyricToSong({ variables: { content, songId } });
          setcontent('');
        }}>
        <label>Add a lyric</label>
        <input
          type='text'
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        />
      </form>
    </div>
  );
}

export default AddLyric;
