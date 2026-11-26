## node mpd client api


Api implementation for [Music Player Daemon](https://musicpd.org) ([GIT](https://github.com/MusicPlayerDaemon/MPD)) protocol.

Wraps the MPD client from [mpd2 module](https://github.com/cotko/mpd.js) with api methods exposed as *client.api*.`x`


### Usage

  ```
  npm i / yarn add mpd-api
  ```

  ```js

  const mpdapi = require('mpd-api')

  // config is passed to net.connect()
  const config = {
    host: 'localhost',
    port: 6600,

    // if connecting to a local socket rather than
    // host and port; trailing `~` is replaced by
    // `os.homedir()`
    // path: '~/.config/mpd/socket'

    // if MPD requires a password, pass
    // it within the config as well:
    //password: 'password'
  }

  const client = await mpdapi.connect(config)

  const songs = await client.api.db.search('(artist contains "Empire")')
  // [{
  //   file: 'mpd/music/path//Sleep Wont Sleep - The Cat Empire (2013).m4a',
  //   last_modified: '2019-04-05T14:59:00Z',
  //   format: '44100:f:2',
  //   time: 284,
  //   duration: 284.375,
  //   artist: 'The Cat Empire',
  //   album: 'Steal the Light',
  //   title: "Sleep Won't Sleep",
  //   track: 10,
  //   date: '2013-05-17',
  //   disc: 1,
  //   label: 'EMI',
  //   albumartist: 'The Cat Empire',
  //   musicbrainz_artistid: 'a530492f-8806-4bd7-9c14-80c237eb92fe',
  //   musicbrainz_albumid: 'aa62c3b7-2576-4375-9301-ed8824966752',
  //   musicbrainz_albumartistid: 'a530492f-8806-4bd7-9c14-80c237eb92fe',
  //   musicbrainz_trackid: 'b0261a37-8a91-4581-8eab-4c5069d057ea',
  //   musicbrainz_releasetrackid: '56f73f38-c224-4827-a7a2-4552990c5da9'
  //  }, {
  //   file: ...
  //  }, ...]

  const status = await client.api.status.get()
  // { volume: 63,
  // repeat: false,
  // random: false,
  // single: false,
  // consume: false,
  // playlist: 312,
  // playlistlength: 12,
  // mixrampdb: 0,
  // state: 'play',
  // song: 7,
  // songid: 116,
  // time: { elapsed: 10562, total: 0 },
  // elapsed: 10561.648,
  // bitrate: '96',
  // audio:
  //  { sampleRate: 44100,
  //    bits: 24,
  //    channels: 2,
  //    sample_rate_short: { value: 44.1, unit: 'kHz' } },
  // nextsong: 8,
  // nextsongid: 117 }


  ```

  All methods return already parsed results.

  Reference to [mpd2](https://github.com/cotko/mpd.js) module is exposed as well, if needed:

  ```js
  const { mpd } = mpdapi
  const { cmd, MPDError } = mpd

  try {
    client = await mpdapi.connect()
  } catch (e) {
    if (e.errno === MPDError.CODES.PERMISSION) {
      console.log('no permission to connect, probably invalid/missing password')
    }
  }

  // or disable parsing of values
  mpd.autoparseValues(false)

  // and do not convert object keys to snake_case
  mpd.normalizeKeys(false)

  ```

#### typescript

  ```typescript
  // typings included

  import api, { MPDApi } from 'mpd-api'

  type Status = {
    volume: number
    repeat: boolean
    playlist: number
    state: 'play' | 'stop' | 'pause'
    // ...
  }

  type ListAllInfo = {
    directory: string
    last_modified: string
    file?: File[]
  }

  type File = {
    file: string
    last_modified: string
    format: string
    time: number
    artist: string
    title: string
    // ...
  }

  const client: MPDApi.ClientAPI = await api.connect()

  const status = await client.api.status.get<Status>()
  console.log('state:', status.state)

  const lsAll = await client.api.db.listallinfo<ListAllInfo>()
  console.log('first directory: %s, files: %o', lsAll[0].directory, lsAll[0].file)


  // reference to mpd2 module:
  api.mpd.normalizeKeys(false)

  ```

#### stickers: ratings, likes, play counts

  MPD stores stickers on songs, and since MPD 0.24 also on stored playlists,
  tag values (an album, an artist, …) and filter expressions:
  `api.sticker` (songs), `api.stickerPlaylist`, `api.stickerTag` (tag type
  first) and `api.stickerFilter`. Every object must exist in MPD's database,
  so streams can't have stickers.

  The rating and play-count methods use the sticker names other clients
  agreed on ([mpd-stickers](https://github.com/jcorporation/mpd-stickers):
  myMPD, Euphonica, rmpc, Cantata, …), so values set here show up there too:
  `rating` 0-10, `like` 0/1/2, `playCount`, `skipCount`, `lastPlayed`,
  `lastSkipped` (unix seconds) and `elapsed` (seconds).

  ```js
  const { api } = client
  await api.sticker.setRating('Album/01.mp3', 8)    // 4 stars
  await api.sticker.setFavourite('Album/01.mp3')    // like = 2
  await api.sticker.incPlayCount('Album/01.mp3')    // playCount + 1, lastPlayed = now
  await api.sticker.getStats('Album/01.mp3')
  // { rating: 8, like: 2, playCount: 1, lastPlayed: 1764081000 }

  // most played: MPD compares the values as integers
  await api.sticker.search('playCount', '10', 'gt')
  await api.sticker.find('playCount', '', 'sort', 'value_int', 'window', '0:20')

  // an artist; an album, as the filter other clients use for albums
  await api.stickerTag.setRating('Artist', 'Nina Simone', 10)
  const album = mpdapi.stickerAlbumFilter({ albumArtist: 'Nina Simone', album: 'Pastel Blues', date: 1965 })
  await api.stickerFilter.setRating(album, 9)
  ```

  Stickers on songs are keyed by the file's path and on playlists by name:
  renaming either loses them. Tag stickers last as long as the tag value does.






### API



#####  Client to client communication [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#client-to-client)


<tt>async c2c.<b>list</b>(...args)</tt> --> <tt>channels ...args</tt>

<details>
<summary><tt>async c2c.<b>subscribe</b>(...args)</tt> --> <tt>subscribe ...args</tt></summary>
<p>

method ignores <b>EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async c2c.<b>unsubscribe</b>(...args)</tt> --> <tt>unsubscribe ...args</tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<tt>async c2c.<b>sendMessage</b>(...args)</tt> --> <tt>sendmessage ...args</tt>

<tt>async c2c.<b>readMessages</b>(...args)</tt> --> <tt>readmessages ...args</tt>



#####  Connection settings [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#connection-settings)


<tt>async connection.<b>close</b>(...args)</tt> --> <tt>close ...args</tt>

<tt>async connection.<b>kill</b>(...args)</tt> --> <tt>kill ...args</tt>

<tt>async connection.<b>ping</b>(...args)</tt> --> <tt>ping ...args</tt>

<tt>async connection.<b>getTagTypes</b>(...args)</tt> --> <tt>tagtypes ...args</tt>

<details>
<summary><tt>async connection.<b>enableTagTypes</b>(...args)</tt> --> <tt>tagtypes <em>enable</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>disableTagTypes</b>(...args)</tt> --> <tt>tagtypes <em>disable</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>clearTagTypes</b>(...args)</tt> --> <tt>tagtypes <em>clear</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>enableAllTagTypes</b>(...args)</tt> --> <tt>tagtypes <em>all</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>getAvailableTagTypes</b>(...args)</tt> --> <tt>tagtypes <em>available</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>resetTagTypes</b>(...args)</tt> --> <tt>tagtypes <em>reset</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<tt>async connection.<b>getProtocolFeatures</b>(...args)</tt> --> <tt>protocol ...args</tt>

<details>
<summary><tt>async connection.<b>getAvailableProtocolFeatures</b>(...args)</tt> --> <tt>protocol <em>available</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>enableProtocolFeatures</b>(...args)</tt> --> <tt>protocol <em>enable</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>disableProtocolFeatures</b>(...args)</tt> --> <tt>protocol <em>disable</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>clearProtocolFeatures</b>(...args)</tt> --> <tt>protocol <em>clear</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>enableAllProtocolFeatures</b>(...args)</tt> --> <tt>protocol <em>all</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<tt>async connection.<b>getStringNormalization</b>(...args)</tt> --> <tt>stringnormalization ...args</tt>

<details>
<summary><tt>async connection.<b>getAvailableStringNormalization</b>(...args)</tt> --> <tt>stringnormalization <em>available</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>enableStringNormalization</b>(...args)</tt> --> <tt>stringnormalization <em>enable</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>disableStringNormalization</b>(...args)</tt> --> <tt>stringnormalization <em>disable</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>clearStringNormalization</b>(...args)</tt> --> <tt>stringnormalization <em>clear</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async connection.<b>enableAllStringNormalization</b>(...args)</tt> --> <tt>stringnormalization <em>all</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<tt>async connection.<b>binarylimit</b>(...args)</tt> --> <tt>binarylimit ...args</tt>



#####  The music database [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#the-music-database)


<tt>async db.<b>listall</b>(...args)</tt> --> <tt>listall ...args</tt>

<tt>async db.<b>listallinfo</b>(...args)</tt> --> <tt>listallinfo ...args</tt>

<details>
<summary><tt>async db.<b>list</b>(...args)</tt> --> <tt>list ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L28">dbList</a>

</p>
</details>

<tt>async db.<b>count</b>(...args)</tt> --> <tt>count ...args</tt>

<tt>async db.<b>searchCount</b>(...args)</tt> --> <tt>searchcount ...args</tt>

<tt>async db.<b>find</b>(...args)</tt> --> <tt>find ...args</tt>

<tt>async db.<b>findadd</b>(...args)</tt> --> <tt>findadd ...args</tt>

<tt>async db.<b>search</b>(...args)</tt> --> <tt>search ...args</tt>

<tt>async db.<b>searchadd</b>(...args)</tt> --> <tt>searchadd ...args</tt>

<tt>async db.<b>searchaddpl</b>(...args)</tt> --> <tt>searchaddpl ...args</tt>

<tt>async db.<b>lsinfo</b>(...args)</tt> --> <tt>lsinfo ...args</tt>

<tt>async db.<b>songinfo</b>(...args)</tt> --> <tt>lsinfo ...args</tt>

<tt>async db.<b>listfiles</b>(...args)</tt> --> <tt>listfiles ...args</tt>

<tt>async db.<b>readcomments</b>(...args)</tt> --> <tt>readcomments ...args</tt>

<tt>async db.<b>rescan</b>(...args)</tt> --> <tt>rescan ...args</tt>

<tt>async db.<b>update</b>(...args)</tt> --> <tt>update ...args</tt>

<tt>async db.<b>getfingerprint</b>(...args)</tt> --> <tt>getfingerprint ...args</tt>

<details>
<summary><tt>async db.<b>albumart</b>(uri: string, offset?: number)</tt> --> <tt><a href="lib/api/mutate/method.js#L132">albumart</a></tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async db.<b>albumartWhole</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L133">albumartWhole</a></tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async db.<b>readpicture</b>(uri: string, offset?: number)</tt> --> <tt><a href="lib/api/mutate/method.js#L135">readpicture</a></tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async db.<b>readpictureWhole</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L136">readpictureWhole</a></tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>



#####  Mounts and neighbors [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#mounts-and-neighbors)


<tt>async mounts.<b>list</b>(...args)</tt> --> <tt>listmounts ...args</tt>

<tt>async mounts.<b>listNeighbors</b>(...args)</tt> --> <tt>listneighbors ...args</tt>

<tt>async mounts.<b>mount</b>(...args)</tt> --> <tt>mount ...args</tt>

<tt>async mounts.<b>unmount</b>(...args)</tt> --> <tt>unmount ...args</tt>



#####  Audio output devices [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#audio-output-devices)


<tt>async outputs.<b>list</b>(...args)</tt> --> <tt>outputs ...args</tt>

<tt>async outputs.<b>enable</b>(...args)</tt> --> <tt>enableoutput ...args</tt>

<tt>async outputs.<b>disable</b>(...args)</tt> --> <tt>disableoutput ...args</tt>

<tt>async outputs.<b>toggle</b>(...args)</tt> --> <tt>toggleoutput ...args</tt>

<tt>async outputs.<b>set</b>(...args)</tt> --> <tt>outputset ...args</tt>



#####  Partition commands [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#partition-commands)


<tt>async partition.<b>list</b>(...args)</tt> --> <tt>listpartitions ...args</tt>

<details>
<summary><tt>async partition.<b>create</b>(...args)</tt> --> <tt>newpartition ...args</tt></summary>
<p>

method ignores <b>EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<tt>async partition.<b>switchTo</b>(...args)</tt> --> <tt>partition ...args</tt>

<details>
<summary><tt>async partition.<b>delete</b>(...args)</tt> --> <tt>delpartition ...args</tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async partition.<b>moveOutputToCurrentPartition</b>(...args)</tt> --> <tt>moveoutput ...args</tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>



#####  Playback options and controls [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#playback-options)


<tt>async playback.<b>next</b>(...args)</tt> --> <tt>next ...args</tt>

<tt>async playback.<b>prev</b>(...args)</tt> --> <tt>previous ...args</tt>

<details>
<summary><tt>async playback.<b>pause</b>(...args)</tt> --> <tt>pause <em>1</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async playback.<b>resume</b>(...args)</tt> --> <tt>pause <em>0</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<tt>async playback.<b>toggle</b>(...args)</tt> --> <tt>pause ...args</tt>

<tt>async playback.<b>play</b>(...args)</tt> --> <tt>play ...args</tt>

<tt>async playback.<b>playid</b>(...args)</tt> --> <tt>playid ...args</tt>

<tt>async playback.<b>stop</b>(...args)</tt> --> <tt>stop ...args</tt>

<tt>async playback.<b>seekcur</b>(...args)</tt> --> <tt>seekcur ...args</tt>

<tt>async playback.<b>seek</b>(...args)</tt> --> <tt>seek ...args</tt>

<tt>async playback.<b>seekid</b>(...args)</tt> --> <tt>seekid ...args</tt>

<tt>async playback.<b>getvol</b>(...args)</tt> --> <tt>getvol ...args</tt>

<details>
<summary><tt>async playback.<b>consume</b>(state?: boolean | 0 | 1 | '0' | '1' | 'oneshot')</tt> --> <tt>consume ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L26">consume</a>

</p>
</details>

<tt>async playback.<b>crossfade</b>(...args)</tt> --> <tt>crossfade ...args</tt>

<tt>async playback.<b>mixrampdb</b>(...args)</tt> --> <tt>mixrampdb ...args</tt>

<details>
<summary><tt>async playback.<b>mixrampdelay</b>(seconds: number | string | false)</tt> --> <tt>mixrampdelay ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L113">mixrampdelay</a>

</p>
</details>

<details>
<summary><tt>async playback.<b>random</b>(state?: boolean | 0 | 1 | '0' | '1')</tt> --> <tt>random ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L13">boolAt</a>

</p>
</details>

<details>
<summary><tt>async playback.<b>repeat</b>(state?: boolean | 0 | 1 | '0' | '1')</tt> --> <tt>repeat ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L13">boolAt</a>

</p>
</details>

<details>
<summary><tt>async playback.<b>single</b>(state?: boolean | 0 | 1 | '0' | '1' | 'oneshot')</tt> --> <tt>single ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L120">single</a>

</p>
</details>

<tt>async playback.<b>setvol</b>(...args)</tt> --> <tt>setvol ...args</tt>

<details>
<summary><tt>async playback.<b>setReplayGain</b>(mode: 'off' | 'track' | 'album' | 'auto' | false)</tt> --> <tt>replay_gain_mode ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L122">replaygain</a>

</p>
</details>

<tt>async playback.<b>getReplayGain</b>(...args)</tt> --> <tt>replay_gain_status ...args</tt>



#####  Stored playlists [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#stored-playlists)


<tt>async playlists.<b>get</b>(...args)</tt> --> <tt>listplaylists ...args</tt>

<tt>async playlists.<b>list</b>(...args)</tt> --> <tt>listplaylist ...args</tt>

<tt>async playlists.<b>listinfo</b>(...args)</tt> --> <tt>listplaylistinfo ...args</tt>

<tt>async playlists.<b>search</b>(...args)</tt> --> <tt>searchplaylist ...args</tt>

<tt>async playlists.<b>length</b>(...args)</tt> --> <tt>playlistlength ...args</tt>

<tt>async playlists.<b>load</b>(...args)</tt> --> <tt>load ...args</tt>

<tt>async playlists.<b>add</b>(...args)</tt> --> <tt>playlistadd ...args</tt>

<tt>async playlists.<b>clear</b>(...args)</tt> --> <tt>playlistclear ...args</tt>

<tt>async playlists.<b>deleteAt</b>(...args)</tt> --> <tt>playlistdelete ...args</tt>

<tt>async playlists.<b>move</b>(...args)</tt> --> <tt>playlistmove ...args</tt>

<tt>async playlists.<b>rename</b>(...args)</tt> --> <tt>rename ...args</tt>

<tt>async playlists.<b>remove</b>(...args)</tt> --> <tt>rm ...args</tt>

<tt>async playlists.<b>save</b>(...args)</tt> --> <tt>save ...args</tt>



#####  The Queue [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#the-queue)


<tt>async queue.<b>add</b>(...args)</tt> --> <tt>add ...args</tt>

<tt>async queue.<b>addid</b>(...args)</tt> --> <tt>addid ...args</tt>

<tt>async queue.<b>clear</b>(...args)</tt> --> <tt>clear ...args</tt>

<tt>async queue.<b>info</b>(...args)</tt> --> <tt>playlistinfo ...args</tt>

<tt>async queue.<b>id</b>(...args)</tt> --> <tt>playlistid ...args</tt>

<tt>async queue.<b>delete</b>(...args)</tt> --> <tt>delete ...args</tt>

<tt>async queue.<b>deleteid</b>(...args)</tt> --> <tt>deleteid ...args</tt>

<tt>async queue.<b>move</b>(...args)</tt> --> <tt>move ...args</tt>

<tt>async queue.<b>moveid</b>(...args)</tt> --> <tt>moveid ...args</tt>

<tt>async queue.<b>find</b>(...args)</tt> --> <tt>playlistfind ...args</tt>

<tt>async queue.<b>search</b>(...args)</tt> --> <tt>playlistsearch ...args</tt>

<tt>async queue.<b>prio</b>(...args)</tt> --> <tt>prio ...args</tt>

<tt>async queue.<b>prioid</b>(...args)</tt> --> <tt>prioid ...args</tt>

<tt>async queue.<b>shuffle</b>(...args)</tt> --> <tt>shuffle ...args</tt>

<tt>async queue.<b>swap</b>(...args)</tt> --> <tt>swap ...args</tt>

<tt>async queue.<b>swapid</b>(...args)</tt> --> <tt>swapid ...args</tt>

<tt>async queue.<b>addtagid</b>(...args)</tt> --> <tt>addtagid ...args</tt>

<tt>async queue.<b>cleartagid</b>(...args)</tt> --> <tt>cleartagid ...args</tt>

<tt>async queue.<b>getChanges</b>(...args)</tt> --> <tt>plchanges ...args</tt>

<tt>async queue.<b>getChangesPosId</b>(...args)</tt> --> <tt>plchangesposid ...args</tt>

<tt>async queue.<b>rangeid</b>(...args)</tt> --> <tt>rangeid ...args</tt>



#####  Reflection [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#reflection)


<tt>async reflection.<b>config</b>(...args)</tt> --> <tt>config ...args</tt>

<tt>async reflection.<b>commands</b>(...args)</tt> --> <tt>commands ...args</tt>

<tt>async reflection.<b>notcommands</b>(...args)</tt> --> <tt>notcommands ...args</tt>

<tt>async reflection.<b>urlhandlers</b>(...args)</tt> --> <tt>urlhandlers ...args</tt>

<tt>async reflection.<b>decoders</b>(...args)</tt> --> <tt>decoders ...args</tt>



#####  Querying MPD’s status [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#querying-mpd-s-status)


<tt>async status.<b>get</b>(...args)</tt> --> <tt>status ...args</tt>

<tt>async status.<b>clearerror</b>(...args)</tt> --> <tt>clearerror ...args</tt>

<tt>async status.<b>currentsong</b>(...args)</tt> --> <tt>currentsong ...args</tt>

<tt>async status.<b>stats</b>(...args)</tt> --> <tt>stats ...args</tt>



#####  Stickers on songs (and the sticker database) [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#stickers)


<details>
<summary><tt>async sticker.<b>list</b>(...args)</tt> --> <tt>sticker <em>list, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async sticker.<b>set</b>(uri: string, name: string, value: string | number)</tt> --> <tt>sticker <em>set, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L37">stickerSet</a>

</p>
</details>

<details>
<summary><tt>async sticker.<b>get</b>(...args)</tt> --> <tt>sticker <em>get, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async sticker.<b>delete</b>(uri: string, name: string)</tt> --> <tt>sticker <em>delete, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L47">stickerDel</a>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async sticker.<b>deleteAll</b>(...args)</tt> --> <tt>sticker <em>delete, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async sticker.<b>inc</b>(uri: string, name: string, value?: number)</tt> --> <tt>sticker <em>inc, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L93">stickerInc</a>

</p>
</details>

<details>
<summary><tt>async sticker.<b>dec</b>(uri: string, name: string, value?: number)</tt> --> <tt>sticker <em>dec, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L93">stickerInc</a>

</p>
</details>

<details>
<summary><tt>async sticker.<b>find</b>(name: string, uri?: string)</tt> --> <tt>sticker <em>find, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L53">stickerFind</a>

</p>
</details>

<details>
<summary><tt>async sticker.<b>search</b>(name: string, value: string, comparator?: string, uri?: string)</tt> --> <tt>sticker <em>find, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L72">stickerSearch</a>

</p>
</details>

<details>
<summary><tt>async sticker.<b>getRating</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L188">stickerGetRating</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async sticker.<b>setRating</b>(uri: string, rating: number)</tt> --> <tt><a href="lib/api/mutate/method.js#L195">stickerSetRating</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async sticker.<b>getLike</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L189">stickerGetLike</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async sticker.<b>setLike</b>(uri: string, like: 0 | 1 | 2)</tt> --> <tt><a href="lib/api/mutate/method.js#L202">stickerSetLike</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async sticker.<b>setFavourite</b>(uri: string, favourite?: boolean)</tt> --> <tt><a href="lib/api/mutate/method.js#L210">stickerSetFavourite</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async sticker.<b>getStats</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L246">stickerGetStats</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async sticker.<b>incPlayCount</b>(uri: string, at?: number)</tt> --> <tt><a href="lib/api/mutate/method.js#L216">stickerIncPlayCount</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async sticker.<b>incSkipCount</b>(uri: string, at?: number)</tt> --> <tt><a href="lib/api/mutate/method.js#L225">stickerIncSkipCount</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async sticker.<b>setElapsed</b>(uri: string, seconds: number)</tt> --> <tt><a href="lib/api/mutate/method.js#L234">stickerSetElapsed</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<tt>async sticker.<b>types</b>(...args)</tt> --> <tt>stickertypes ...args</tt>

<tt>async sticker.<b>names</b>(...args)</tt> --> <tt>stickernames ...args</tt>

<tt>async sticker.<b>namesTypes</b>(...args)</tt> --> <tt>stickernamestypes ...args</tt>



#####  Stickers on filter expressions [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#stickers)


<details>
<summary><tt>async stickerFilter.<b>list</b>(...args)</tt> --> <tt>sticker <em>list, filter</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>set</b>(uri: string, name: string, value: string | number)</tt> --> <tt>sticker <em>set, filter</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L37">stickerSet</a>

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>get</b>(...args)</tt> --> <tt>sticker <em>get, filter</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>delete</b>(uri: string, name: string)</tt> --> <tt>sticker <em>delete, filter</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L47">stickerDel</a>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>deleteAll</b>(...args)</tt> --> <tt>sticker <em>delete, filter</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>inc</b>(uri: string, name: string, value?: number)</tt> --> <tt>sticker <em>inc, filter</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L93">stickerInc</a>

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>dec</b>(uri: string, name: string, value?: number)</tt> --> <tt>sticker <em>dec, filter</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L93">stickerInc</a>

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>find</b>(name: string, uri?: string)</tt> --> <tt>sticker <em>find, filter</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L53">stickerFind</a>

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>search</b>(name: string, value: string, comparator?: string, uri?: string)</tt> --> <tt>sticker <em>find, filter</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L72">stickerSearch</a>

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>getRating</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L188">stickerGetRating</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>setRating</b>(uri: string, rating: number)</tt> --> <tt><a href="lib/api/mutate/method.js#L195">stickerSetRating</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>getLike</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L189">stickerGetLike</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>setLike</b>(uri: string, like: 0 | 1 | 2)</tt> --> <tt><a href="lib/api/mutate/method.js#L202">stickerSetLike</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>setFavourite</b>(uri: string, favourite?: boolean)</tt> --> <tt><a href="lib/api/mutate/method.js#L210">stickerSetFavourite</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerFilter.<b>getStats</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L246">stickerGetStats</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>



#####  Stickers on stored playlists [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#stickers)


<details>
<summary><tt>async stickerPlaylist.<b>list</b>(...args)</tt> --> <tt>sticker <em>list, playlist</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>set</b>(uri: string, name: string, value: string | number)</tt> --> <tt>sticker <em>set, playlist</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L37">stickerSet</a>

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>get</b>(...args)</tt> --> <tt>sticker <em>get, playlist</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>delete</b>(uri: string, name: string)</tt> --> <tt>sticker <em>delete, playlist</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L47">stickerDel</a>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>deleteAll</b>(...args)</tt> --> <tt>sticker <em>delete, playlist</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>inc</b>(uri: string, name: string, value?: number)</tt> --> <tt>sticker <em>inc, playlist</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L93">stickerInc</a>

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>dec</b>(uri: string, name: string, value?: number)</tt> --> <tt>sticker <em>dec, playlist</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L93">stickerInc</a>

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>find</b>(name: string, uri?: string)</tt> --> <tt>sticker <em>find, playlist</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L53">stickerFind</a>

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>search</b>(name: string, value: string, comparator?: string, uri?: string)</tt> --> <tt>sticker <em>find, playlist</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L72">stickerSearch</a>

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>getRating</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L188">stickerGetRating</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>setRating</b>(uri: string, rating: number)</tt> --> <tt><a href="lib/api/mutate/method.js#L195">stickerSetRating</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>getLike</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L189">stickerGetLike</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>setLike</b>(uri: string, like: 0 | 1 | 2)</tt> --> <tt><a href="lib/api/mutate/method.js#L202">stickerSetLike</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>setFavourite</b>(uri: string, favourite?: boolean)</tt> --> <tt><a href="lib/api/mutate/method.js#L210">stickerSetFavourite</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerPlaylist.<b>getStats</b>(uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L246">stickerGetStats</a></tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>



#####  Stickers on tag values [MPD documentation](https://mpd.readthedocs.io/en/latest/protocol.html#stickers)


<details>
<summary><tt>async stickerTag.<b>list</b>(...args)</tt> --> <tt>sticker <em>list</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async stickerTag.<b>set</b>(tag: string, uri: string, name: string, value: string | number)</tt> --> <tt>sticker <em>set</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L104">tagStickerSet</a>

</p>
</details>

<details>
<summary><tt>async stickerTag.<b>get</b>(...args)</tt> --> <tt>sticker <em>get</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async stickerTag.<b>delete</b>(tag: string, uri: string, name: string)</tt> --> <tt>sticker <em>delete</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L105">tagStickerDel</a>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async stickerTag.<b>deleteAll</b>(...args)</tt> --> <tt>sticker <em>delete</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async stickerTag.<b>inc</b>(tag: string, uri: string, name: string, value?: number)</tt> --> <tt>sticker <em>inc</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L106">tagStickerInc</a>

</p>
</details>

<details>
<summary><tt>async stickerTag.<b>dec</b>(tag: string, uri: string, name: string, value?: number)</tt> --> <tt>sticker <em>dec</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L106">tagStickerInc</a>

</p>
</details>

<details>
<summary><tt>async stickerTag.<b>find</b>(tag: string, name: string, uri?: string)</tt> --> <tt>sticker <em>find</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L107">tagStickerFind</a>

</p>
</details>

<details>
<summary><tt>async stickerTag.<b>search</b>(tag: string, name: string, value: string, comparator?: string, uri?: string)</tt> --> <tt>sticker <em>find</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L108">tagStickerSearch</a>

</p>
</details>

<tt>async stickerTag.<b>getRating</b>(tag: string, uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L188">stickerGetRating</a></tt>

<tt>async stickerTag.<b>setRating</b>(tag: string, uri: string, rating: number)</tt> --> <tt><a href="lib/api/mutate/method.js#L195">stickerSetRating</a></tt>

<tt>async stickerTag.<b>getLike</b>(tag: string, uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L189">stickerGetLike</a></tt>

<tt>async stickerTag.<b>setLike</b>(tag: string, uri: string, like: 0 | 1 | 2)</tt> --> <tt><a href="lib/api/mutate/method.js#L202">stickerSetLike</a></tt>

<tt>async stickerTag.<b>setFavourite</b>(tag: string, uri: string, favourite?: boolean)</tt> --> <tt><a href="lib/api/mutate/method.js#L210">stickerSetFavourite</a></tt>

<tt>async stickerTag.<b>getStats</b>(tag: string, uri: string)</tt> --> <tt><a href="lib/api/mutate/method.js#L246">stickerGetStats</a></tt>



