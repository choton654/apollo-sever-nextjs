import Lyric from '../models/lyric';
import Song from '../models/song';

export const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: 'John' }, { name: 'Sara' }, { name: 'Karen' }];
    },
    songs(parent, args, context) {
      return Song.find({});
    },
    song(parent, args, context) {
      return Song.findById({ _id: args.id });
    },
    lyric(parent, args, context) {
      return Lyric.findById({ _id: args.id });
    },
    lyrics() {
      return Lyric.find({});
    },
  },
  Song: {
    lyrics: (song) => {
      return Song.findLyrics(song.id);
    },
  },
  Lyric: {
    song: (lyric) => {
      return Lyric.findById(lyric)
        .populate('song')
        .then((lyric) => {
          return lyric.song;
        });
    },
  },

  Mutation: {
    addSong: (parent, { title }, context) => {
      return new Song({ title }).save();
    },
    addLyricToSong: (parent, { content, songId }, context) => {
      return Song.addLyric(songId, content);
    },
    deleteSong: (parent, { songId }, context) => {
      return Song.deleteOne({ _id: songId });
    },
    likeLyric: (parent, { lyricId }, content) => {
      return Lyric.like(lyricId);
    },
    unlikeLyric: (parent, { lyricId }, content) => {
      return Lyric.unlike(lyricId);
    },
    deleteLyric: (parent, { lyricId }, content) => {
      return Lyric.deleteOne({ _id: lyricId });
    },
  },
};
