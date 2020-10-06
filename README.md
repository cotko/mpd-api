## node mpd client api


Api implementation for [music player daemon](https://musicpd.org) ([GIT](https://github.com/MusicPlayerDaemon/MPD)) protocol.

Wraps the MPD client from [mpd2 module](https://github.com/cotko/mpd.js) with api methods exposed as *client.api*.`x`


### Usage

  ```
  npm / yarn install mpd-api
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






### API



#####  Client to client communication [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#client-to-client)


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



#####  Connection settings [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#connection-settings)


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



#####  The music database [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#the-music-database)


<tt>async db.<b>listall</b>(...args)</tt> --> <tt>listall ...args</tt>

<tt>async db.<b>listallinfo</b>(...args)</tt> --> <tt>listallinfo ...args</tt>

<details>
<summary><tt>async db.<b>list</b>(...args)</tt> --> <tt>list ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L8">dbList</a>

</p>
</details>

<tt>async db.<b>count</b>(...args)</tt> --> <tt>count ...args</tt>

<tt>async db.<b>find</b>(...args)</tt> --> <tt>find ...args</tt>

<tt>async db.<b>findadd</b>(...args)</tt> --> <tt>findadd ...args</tt>

<tt>async db.<b>search</b>(...args)</tt> --> <tt>search ...args</tt>

<tt>async db.<b>searchadd</b>(...args)</tt> --> <tt>searchadd ...args</tt>

<tt>async db.<b>searchaddpl</b>(...args)</tt> --> <tt>searchaddpl ...args</tt>

<tt>async db.<b>lsinfo</b>(...args)</tt> --> <tt>lsinfo ...args</tt>

<tt>async db.<b>listfiles</b>(...args)</tt> --> <tt>listfiles ...args</tt>

<tt>async db.<b>readcomments</b>(...args)</tt> --> <tt>readcomments ...args</tt>

<tt>async db.<b>rescan</b>(...args)</tt> --> <tt>rescan ...args</tt>

<tt>async db.<b>update</b>(...args)</tt> --> <tt>update ...args</tt>

<tt>async db.<b>getfingerprint</b>(...args)</tt> --> <tt>getfingerprint ...args</tt>

<details>
<summary><tt>async db.<b>albumart</b>(...args)</tt> --> <tt><a href="lib/api/mutate/method.js#L123">albumart</a></tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async db.<b>albumartWhole</b>(...args)</tt> --> <tt><a href="lib/api/mutate/method.js#L124">albumartWhole</a></tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async db.<b>readpicture</b>(...args)</tt> --> <tt><a href="lib/api/mutate/method.js#L126">readpicture</a></tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<details>
<summary><tt>async db.<b>readpictureWhole</b>(...args)</tt> --> <tt><a href="lib/api/mutate/method.js#L127">readpictureWhole</a></tt></summary>
<p>

method ignores <b>NO_EXIST</b>, expect *undefined* in this case   
    
</p>
</details>



#####  Mounts and neighbors [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#mounts-and-neighbors)


<tt>async mounts.<b>list</b>(...args)</tt> --> <tt>listmounts ...args</tt>

<tt>async mounts.<b>listNeighbors</b>(...args)</tt> --> <tt>listneighbors ...args</tt>

<tt>async mounts.<b>mount</b>(...args)</tt> --> <tt>mount ...args</tt>

<tt>async mounts.<b>unmount</b>(...args)</tt> --> <tt>unmount ...args</tt>



#####  Audio output devices [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#audio-output-devices)


<tt>async outputs.<b>list</b>(...args)</tt> --> <tt>outputs ...args</tt>

<tt>async outputs.<b>enable</b>(...args)</tt> --> <tt>enableoutput ...args</tt>

<tt>async outputs.<b>disable</b>(...args)</tt> --> <tt>disableoutput ...args</tt>

<tt>async outputs.<b>toggle</b>(...args)</tt> --> <tt>toggleoutput ...args</tt>

<tt>async outputs.<b>set</b>(...args)</tt> --> <tt>outputset ...args</tt>



#####  Partition commands [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#partition-commands)


<tt>async partition.<b>list</b>(...args)</tt> --> <tt>listpartitions ...args</tt>

<details>
<summary><tt>async partition.<b>create</b>(...args)</tt> --> <tt>newpartition ...args</tt></summary>
<p>

method ignores <b>EXIST</b>, expect *undefined* in this case   
    
</p>
</details>

<tt>async partition.<b>switchTo</b>(...args)</tt> --> <tt>partition ...args</tt>



#####  Playback options and controls [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#playback-options)


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

<details>
<summary><tt>async playback.<b>consume</b>(...args)</tt> --> <tt>consume ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L3">boolAt</a>

</p>
</details>

<tt>async playback.<b>crossfade</b>(...args)</tt> --> <tt>crossfade ...args</tt>

<tt>async playback.<b>mixrampdb</b>(...args)</tt> --> <tt>mixrampdb ...args</tt>

<details>
<summary><tt>async playback.<b>mixrampdelay</b>(...args)</tt> --> <tt>mixrampdelay ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L69">mixrampdelay</a>

</p>
</details>

<details>
<summary><tt>async playback.<b>random</b>(...args)</tt> --> <tt>random ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L3">boolAt</a>

</p>
</details>

<details>
<summary><tt>async playback.<b>repeat</b>(...args)</tt> --> <tt>repeat ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L3">boolAt</a>

</p>
</details>

<details>
<summary><tt>async playback.<b>single</b>(...args)</tt> --> <tt>single ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L76">single</a>

</p>
</details>

<tt>async playback.<b>setvol</b>(...args)</tt> --> <tt>setvol ...args</tt>

<details>
<summary><tt>async playback.<b>setReplayGain</b>(...args)</tt> --> <tt>replay_gain_mode ...args</tt></summary>
<p>

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L83">replaygain</a>

</p>
</details>

<tt>async playback.<b>getReplayGain</b>(...args)</tt> --> <tt>replay_gain_status ...args</tt>



#####  Stored playlists [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#stored-playlists)


<tt>async playlists.<b>get</b>(...args)</tt> --> <tt>listplaylists ...args</tt>

<tt>async playlists.<b>list</b>(...args)</tt> --> <tt>listplaylist ...args</tt>

<tt>async playlists.<b>listinfo</b>(...args)</tt> --> <tt>listplaylistinfo ...args</tt>

<tt>async playlists.<b>load</b>(...args)</tt> --> <tt>load ...args</tt>

<tt>async playlists.<b>add</b>(...args)</tt> --> <tt>playlistadd ...args</tt>

<tt>async playlists.<b>clear</b>(...args)</tt> --> <tt>playlistclear ...args</tt>

<tt>async playlists.<b>deleteAt</b>(...args)</tt> --> <tt>playlistdelete ...args</tt>

<tt>async playlists.<b>move</b>(...args)</tt> --> <tt>playlistmove ...args</tt>

<tt>async playlists.<b>rename</b>(...args)</tt> --> <tt>rename ...args</tt>

<tt>async playlists.<b>remove</b>(...args)</tt> --> <tt>rm ...args</tt>

<tt>async playlists.<b>save</b>(...args)</tt> --> <tt>save ...args</tt>



#####  The Queue [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#the-queue)


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

<tt>async queue.<b>search</b>(...args)</tt> --> <tt>search ...args</tt>

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



#####  Reflection [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#reflection)


<tt>async reflection.<b>config</b>(...args)</tt> --> <tt>config ...args</tt>

<tt>async reflection.<b>commands</b>(...args)</tt> --> <tt>commands ...args</tt>

<tt>async reflection.<b>notcommands</b>(...args)</tt> --> <tt>notcommands ...args</tt>

<tt>async reflection.<b>urlhandlers</b>(...args)</tt> --> <tt>urlhandlers ...args</tt>

<tt>async reflection.<b>decoders</b>(...args)</tt> --> <tt>decoders ...args</tt>



#####  Querying MPD’s status [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#querying-mpd-s-status)


<tt>async status.<b>get</b>(...args)</tt> --> <tt>status ...args</tt>

<tt>async status.<b>clearerror</b>(...args)</tt> --> <tt>clearerror ...args</tt>

<tt>async status.<b>currentsong</b>(...args)</tt> --> <tt>currentsong ...args</tt>

<tt>async status.<b>stats</b>(...args)</tt> --> <tt>stats ...args</tt>



#####  Stickers [MPD documentation](https://www.musicpd.org/doc/html/protocol.html#stickers)


<details>
<summary><tt>async sticker.<b>list</b>(...args)</tt> --> <tt>sticker <em>list, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

</p>
</details>

<details>
<summary><tt>async sticker.<b>set</b>(...args)</tt> --> <tt>sticker <em>set, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L17">stickerSet</a>

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
<summary><tt>async sticker.<b>delete</b>(...args)</tt> --> <tt>sticker <em>delete, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L17">stickerSet</a>

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
<summary><tt>async sticker.<b>find</b>(...args)</tt> --> <tt>sticker <em>find, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L31">stickerFind</a>

</p>
</details>

<details>
<summary><tt>async sticker.<b>search</b>(...args)</tt> --> <tt>sticker <em>find, song</em>, ...args</tt></summary>
<p>

method binds arguments which can not be changed

method reorderes or augments passed arguments, see <a href="lib/api/mutate/argument.js#L50">stickerSearch</a>

</p>
</details>



