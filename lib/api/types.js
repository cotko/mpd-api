'use strict'

exports.Object = obj => typeof obj === 'object' && obj != null

exports.Tag = {
  /**  the artist name. Its meaning is not well-defined;
   * see *composer* and *performer* for more specific tags. */
  artist: 'artist',
  /**  same as artist, but for sorting. This usually omits
   * prefixes such as *The*. */
  artistsort: 'artistsort',
  /**  the album name. */
  album: 'album',
  /**  same as album, but for sorting. */
  albumsort: 'albumsort',
  /**  on multi-artist albums, this is the artist name
   * which shall be used for the whole album.
   * The exact meaning of this tag is not well-defined. */
  albumartist: 'albumartist',
  /**  same as albumartist, but for sorting. */
  albumartistsort: 'albumartistsort',
  /**  the song title. */
  title: 'title',
  /**  the decimal track number within the album. */
  track: 'track',
  /**  a name for this song. This is not the song title.
   * The exact meaning of this tag is not well-defined.
   * It is often used by badly configured internet radio stations
   * with broken tags to squeeze both the artist name and the
   * song title in one tag. */
  name: 'name',
  /**  the music genre. */
  genre: 'genre',
  /**  the song’s release date. This is usually a 4-digit year. */
  date: 'date',
  /**  the artist who composed the song. */
  composer: 'composer',
  /**  the artist who performed the song. */
  performer: 'performer',
  /**  a human-readable comment about this song.
   * The exact meaning of this tag is not well-defined. */
  comment: 'comment',
  /**  the decimal disc number in a multi-disc album. */
  disc: 'disc',
  /**  the name of the label or publisher. */
  label: 'label',
  /**  the artist id in the MusicBrainz database. */
  musicbrainz_artistid: 'musicbrainz_artistid',
  /**  the album id in the MusicBrainz database. */
  musicbrainz_albumid: 'musicbrainz_albumid',
  /**  the album artist id in the MusicBrainz database. */
  musicbrainz_albumartistid: 'musicbrainz_albumartistid',
  /**  the track id in the MusicBrainz database. */
  musicbrainz_trackid: 'musicbrainz_trackid',
  /**  the release track id in the MusicBrainz database. */
  musicbrainz_releasetrackid: 'musicbrainz_releasetrackid',
  /**  the work id in the MusicBrainz database. */
  musicbrainz_workid: 'musicbrainz_workid'

}

exports.Type = {
  /** full {@link MPDResponse.song.file file uri} */
  file: 'file',
  /** base path of the song. If song's uri is *music/foo/bar/song.mp3*
   * then base will match *music*, *music/foo*, *music/foo/bar* and
   * *music/foo/bar/song.mp3*
   */
  base: 'base',
  /** file’s time stamp (ISO 8601 or UNIX time stamp) */
  'modified-since': 'modified-since',
  /** SAMPLERATE:BITS:CHANNELS */
  audioformat: 'audioformat',
  /** special type which matches ANY {@link module:types.TAG tag}
   * meaning when filtering by value, songs where any of the tag's would
   * match the value would be returned */
  any: 'any'

}

exports.Type = Object.assign({}, exports.Tag, exports.Type)
