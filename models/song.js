const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  lyrics: [
    {
      type: Schema.Types.ObjectId,
      ref: 'lyric',
    },
  ],
});

SongSchema.statics.addLyric = function (id, content) {
  const Lyric = mongoose.model('lyric');

  return this.findById(id).then((song) => {
    const lyric = new Lyric({ content, song });
    song.lyrics.push(lyric);
    return Promise.all([lyric.save(), song.save()]).then(
      ([lyric, song]) => song,
    );
  });
};

// SongSchema.statics.deleteLyric = function (lyricId, songId) {
//   const Lyric = mongoose.model('lyric');

//   return this.findById(songId).then(async (song) => {
//     if (
//       song.lyrics.filter((lyric) => lyric._id.toString() === lyricId).length ===
//       0
//     ) {
//       return;
//     }

//     song.lyrics.pull(lyricId);
//     await song.save();
//     return song;
//   });
// };

SongSchema.statics.findLyrics = function (id) {
  return this.findById(id)
    .populate('lyrics')
    .then((song) => song.lyrics);
};

const Song = mongoose.models.song || mongoose.model('song', SongSchema);
module.exports = Song;
