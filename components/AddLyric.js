import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const ADD_LYRIC = gql`
  mutation($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        content
      }
    }
  }
`;

function AddLyric({ songId }) {
  const [content, setcontent] = useState('');
  const [addLyricToSong, { data }] = useMutation(ADD_LYRIC);
  console.log(data);
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
