import { gql } from '@apollo/client';

export const SongsQuery = gql`
  query SongsQuery {
    songs {
      id
      title
    }
  }
`;

export const SongDetailsQuery = gql`
  query SongDetailsQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
