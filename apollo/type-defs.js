import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    name: String
  }
  type Song {
    id: ID!
    title: String
    lyrics: [Lyric]
  }
  type Lyric {
    id: ID!
    likes: Int
    content: String
    song: Song!
  }
  type Query {
    users: [User!]!
    songs: [Song]
    song(id: ID!): Song
    lyric(id: ID!): Lyric
  }
  type Mutation {
    addSong(title: String!): Song!
    addLyricToSong(content: String!, songId: ID!): Song!
    deleteSong(songId: ID!): Song!
    likeLyric(lyricId: ID!): Lyric!
  }
`;
