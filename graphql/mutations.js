import { gql } from '@apollo/client';

export const ADD_SONG = gql`
  mutation($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export const DELETE_SONG = gql`
  mutation($songId: ID!) {
    deleteSong(songId: $songId) {
      title
    }
  }
`;

export const DELETE_LYRIC = gql`
  mutation($lyricId: ID!) {
    deleteLyric(lyricId: $lyricId) {
      content
    }
  }
`;

export const ADD_LYRIC = gql`
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

export const LIKE_LYRIC = gql`
  mutation($lyricId: ID!) {
    likeLyric(lyricId: $lyricId) {
      id
      likes
    }
  }
`;

export const UNLIKE_LYRIC = gql`
  mutation($lyricId: ID!) {
    unlikeLyric(lyricId: $lyricId) {
      id
      likes
    }
  }
`;
