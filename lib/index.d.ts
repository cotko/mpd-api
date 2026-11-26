import mpd, { MPD } from 'mpd2'

declare const mpdApi: MPDApi.MPDApi;

export declare namespace MPDApi {

  export interface MPDApi {
    mpd: typeof mpd;
    connect(config?: MPD.Config): Promise<ClientAPI>;
    /**
     * Filter expression for album stickers, in the form other clients use:
     * ((AlbumArtist == "…") AND (Album == "…") AND (Date == "…"))
     */
    stickerAlbumFilter(album: { albumArtist: string; album: string; date?: string | number }): string;
  }

  export interface ClientAPI extends MPD.Client {
    api: APIS;
  }

  /**
   * Stickers other clients agreed on (https://github.com/jcorporation/mpd-stickers),
   * as numbers; any other sticker of the object as a string
   */
  export interface StickerStats {
    rating?: number; // 0-10
    like?: 0 | 1 | 2; // dislike, neutral, like
    playCount?: number;
    skipCount?: number;
    lastPlayed?: number; // unix seconds
    lastSkipped?: number; // unix seconds
    elapsed?: number; // seconds into the song
    [name: string]: string | number | undefined;
  }

  interface APIS {
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#client-to-client)
     * Client to client communication
     */
    c2c: {
      /**
       * mpd command: `channels`
       */
      list: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `subscribe`
       */
      subscribe: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `unsubscribe`
       */
      unsubscribe: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `sendmessage`
       */
      sendMessage: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `readmessages`
       */
      readMessages: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#connection-settings)
     * Connection settings
     */
    connection: {
      /**
       * mpd command: `close`
       */
      close: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `kill`
       */
      kill: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `ping`
       */
      ping: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `tagtypes`
       */
      getTagTypes: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `tagtypes enable`
       */
      enableTagTypes: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `tagtypes disable`
       */
      disableTagTypes: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `tagtypes clear`
       */
      clearTagTypes: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `tagtypes all`
       */
      enableAllTagTypes: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `tagtypes available`
       */
      getAvailableTagTypes: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `tagtypes reset`
       */
      resetTagTypes: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `protocol`
       */
      getProtocolFeatures: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `protocol available`
       */
      getAvailableProtocolFeatures: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `protocol enable`
       */
      enableProtocolFeatures: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `protocol disable`
       */
      disableProtocolFeatures: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `protocol clear`
       */
      clearProtocolFeatures: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `protocol all`
       */
      enableAllProtocolFeatures: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `stringnormalization`
       */
      getStringNormalization: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `stringnormalization available`
       */
      getAvailableStringNormalization: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `stringnormalization enable`
       */
      enableStringNormalization: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `stringnormalization disable`
       */
      disableStringNormalization: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `stringnormalization clear`
       */
      clearStringNormalization: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `stringnormalization all`
       */
      enableAllStringNormalization: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `binarylimit`
       */
      binarylimit: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#the-music-database)
     * The music database
     */
    db: {
      /**
       * mpd command: `listall`
       */
      listall: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `listallinfo`
       */
      listallinfo: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `list`
       */
      list: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `count`
       */
      count: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `searchcount`
       */
      searchCount: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `find`
       */
      find: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `findadd`
       */
      findadd: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `search`
       */
      search: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `searchadd`
       */
      searchadd: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `searchaddpl`
       */
      searchaddpl: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `lsinfo`
       */
      lsinfo: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `lsinfo`
       */
      songinfo: {
        <T = any>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T = any>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `listfiles`
       */
      listfiles: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `readcomments`
       */
      readcomments: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `rescan`
       */
      rescan: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `update`
       */
      update: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `getfingerprint`
       */
      getfingerprint: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `albumart`
       */
      albumart: {
        <T extends object>(uri: string, offset?: number): Promise<T>;
      }
      /**
       * mpd command: `albumart`
       */
      albumartWhole: {
        <T extends object>(uri: string): Promise<T>;
      }
      /**
       * mpd command: `readpicture`
       */
      readpicture: {
        <T extends object>(uri: string, offset?: number): Promise<T>;
      }
      /**
       * mpd command: `readpicture`
       */
      readpictureWhole: {
        <T extends object>(uri: string): Promise<T>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#mounts-and-neighbors)
     * Mounts and neighbors
     */
    mounts: {
      /**
       * mpd command: `listmounts`
       */
      list: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `listneighbors`
       */
      listNeighbors: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `mount`
       */
      mount: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `unmount`
       */
      unmount: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#audio-output-devices)
     * Audio output devices
     */
    outputs: {
      /**
       * mpd command: `outputs`
       */
      list: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `enableoutput`
       */
      enable: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `disableoutput`
       */
      disable: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `toggleoutput`
       */
      toggle: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `outputset`
       */
      set: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#partition-commands)
     * Partition commands
     */
    partition: {
      /**
       * mpd command: `listpartitions`
       */
      list: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `newpartition`
       */
      create: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `partition`
       */
      switchTo: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `delpartition`
       */
      delete: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `moveoutput`
       */
      moveOutputToCurrentPartition: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#controlling-playback)
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#playback-options)
     * Playback options and controls
     */
    playback: {
      /**
       * mpd command: `next`
       */
      next: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `previous`
       */
      prev: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `pause 1`
       */
      pause: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `pause 0`
       */
      resume: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `pause`
       */
      toggle: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `play`
       */
      play: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playid`
       */
      playid: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `stop`
       */
      stop: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `seekcur`
       */
      seekcur: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `seek`
       */
      seek: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `seekid`
       */
      seekid: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `getvol`
       */
      getvol: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `consume`
       */
      consume: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `crossfade`
       */
      crossfade: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `mixrampdb`
       */
      mixrampdb: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `mixrampdelay`
       */
      mixrampdelay: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `random`
       */
      random: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `repeat`
       */
      repeat: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `single`
       */
      single: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `setvol`
       */
      setvol: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `replay_gain_mode`
       */
      setReplayGain: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `replay_gain_status`
       */
      getReplayGain: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#stored-playlists)
     * Stored playlists
     */
    playlists: {
      /**
       * mpd command: `listplaylists`
       */
      get: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `listplaylist`
       */
      list: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `listplaylistinfo`
       */
      listinfo: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `searchplaylist`
       */
      search: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `playlistlength`
       */
      length: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `load`
       */
      load: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistadd`
       */
      add: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistclear`
       */
      clear: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistdelete`
       */
      deleteAt: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistmove`
       */
      move: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `rename`
       */
      rename: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `rm`
       */
      remove: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `save`
       */
      save: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#the-queue)
     * The Queue
     */
    queue: {
      /**
       * mpd command: `add`
       */
      add: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `addid`
       */
      addid: {
        <T = any>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T = any>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `clear`
       */
      clear: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistinfo`
       */
      info: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `playlistid`
       */
      id: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `delete`
       */
      delete: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `deleteid`
       */
      deleteid: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `move`
       */
      move: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `moveid`
       */
      moveid: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistfind`
       */
      find: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `playlistsearch`
       */
      search: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `prio`
       */
      prio: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `prioid`
       */
      prioid: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `shuffle`
       */
      shuffle: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `swap`
       */
      swap: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `swapid`
       */
      swapid: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `addtagid`
       */
      addtagid: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `cleartagid`
       */
      cleartagid: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `plchanges`
       */
      getChanges: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `plchangesposid`
       */
      getChangesPosId: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `rangeid`
       */
      rangeid: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#reflection)
     * Reflection
     */
    reflection: {
      /**
       * mpd command: `config`
       */
      config: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `commands`
       */
      commands: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `notcommands`
       */
      notcommands: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `urlhandlers`
       */
      urlhandlers: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `decoders`
       */
      decoders: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#querying-mpd-s-status)
     * Querying MPD’s status
     */
    status: {
      /**
       * mpd command: `status`
       */
      get: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `clearerror`
       */
      clearerror: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `currentsong`
       */
      currentsong: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `stats`
       */
      stats: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#stickers)
     * Stickers on songs (and the sticker database)
     */
    sticker: {
      /**
       * mpd command: `sticker list song`
       */
      list: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `sticker set song`
       */
      set: {
        (uri: string, name: string, value: string | number): Promise<void>;
      }
      /**
       * mpd command: `sticker get song`
       */
      get: {
        <T = any>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T = any>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `sticker delete song`
       */
      delete: {
        (uri: string, name: string): Promise<void>;
      }
      /**
       * mpd command: `sticker delete song`
       */
      deleteAll: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `sticker inc song`
       */
      inc: {
        (uri: string, name: string, value?: number): Promise<void>;
      }
      /**
       * mpd command: `sticker dec song`
       */
      dec: {
        (uri: string, name: string, value?: number): Promise<void>;
      }
      /**
       * mpd command: `sticker find song`
       */
      find: {
        <T extends object>(name: string, uri?: string): Promise<T[]>;
      }
      /**
       * mpd command: `sticker find song`
       */
      search: {
        <T extends object>(name: string, value: string, comparator?: string, uri?: string): Promise<T[]>;
      }
      /**
       * mpd command: `sticker song`
       */
      getRating: {
        (uri: string): Promise<number | undefined>;
      }
      /**
       * mpd command: `sticker song`
       */
      setRating: {
        (uri: string, rating: number): Promise<void>;
      }
      /**
       * mpd command: `sticker song`
       */
      getLike: {
        (uri: string): Promise<0 | 1 | 2 | undefined>;
      }
      /**
       * mpd command: `sticker song`
       */
      setLike: {
        (uri: string, like: 0 | 1 | 2): Promise<void>;
      }
      /**
       * mpd command: `sticker song`
       */
      setFavourite: {
        (uri: string, favourite?: boolean): Promise<void>;
      }
      /**
       * mpd command: `sticker song`
       */
      getStats: {
        (uri: string): Promise<StickerStats>;
      }
      /**
       * mpd command: `sticker song`
       */
      incPlayCount: {
        (uri: string, at?: number): Promise<void>;
      }
      /**
       * mpd command: `sticker song`
       */
      incSkipCount: {
        (uri: string, at?: number): Promise<void>;
      }
      /**
       * mpd command: `sticker song`
       */
      setElapsed: {
        (uri: string, seconds: number): Promise<void>;
      }
      /**
       * mpd command: `stickertypes`
       */
      types: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `stickernames`
       */
      names: {
        <T = string>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T = string>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `stickernamestypes`
       */
      namesTypes: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T[]>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#stickers)
     * Stickers on filter expressions
     */
    stickerFilter: {
      /**
       * mpd command: `sticker list filter`
       */
      list: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `sticker set filter`
       */
      set: {
        (uri: string, name: string, value: string | number): Promise<void>;
      }
      /**
       * mpd command: `sticker get filter`
       */
      get: {
        <T = any>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T = any>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `sticker delete filter`
       */
      delete: {
        (uri: string, name: string): Promise<void>;
      }
      /**
       * mpd command: `sticker delete filter`
       */
      deleteAll: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `sticker inc filter`
       */
      inc: {
        (uri: string, name: string, value?: number): Promise<void>;
      }
      /**
       * mpd command: `sticker dec filter`
       */
      dec: {
        (uri: string, name: string, value?: number): Promise<void>;
      }
      /**
       * mpd command: `sticker find filter`
       */
      find: {
        <T extends object>(name: string, uri?: string): Promise<T[]>;
      }
      /**
       * mpd command: `sticker find filter`
       */
      search: {
        <T extends object>(name: string, value: string, comparator?: string, uri?: string): Promise<T[]>;
      }
      /**
       * mpd command: `sticker filter`
       */
      getRating: {
        (uri: string): Promise<number | undefined>;
      }
      /**
       * mpd command: `sticker filter`
       */
      setRating: {
        (uri: string, rating: number): Promise<void>;
      }
      /**
       * mpd command: `sticker filter`
       */
      getLike: {
        (uri: string): Promise<0 | 1 | 2 | undefined>;
      }
      /**
       * mpd command: `sticker filter`
       */
      setLike: {
        (uri: string, like: 0 | 1 | 2): Promise<void>;
      }
      /**
       * mpd command: `sticker filter`
       */
      setFavourite: {
        (uri: string, favourite?: boolean): Promise<void>;
      }
      /**
       * mpd command: `sticker filter`
       */
      getStats: {
        (uri: string): Promise<StickerStats>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#stickers)
     * Stickers on stored playlists
     */
    stickerPlaylist: {
      /**
       * mpd command: `sticker list playlist`
       */
      list: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `sticker set playlist`
       */
      set: {
        (uri: string, name: string, value: string | number): Promise<void>;
      }
      /**
       * mpd command: `sticker get playlist`
       */
      get: {
        <T = any>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T = any>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `sticker delete playlist`
       */
      delete: {
        (uri: string, name: string): Promise<void>;
      }
      /**
       * mpd command: `sticker delete playlist`
       */
      deleteAll: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `sticker inc playlist`
       */
      inc: {
        (uri: string, name: string, value?: number): Promise<void>;
      }
      /**
       * mpd command: `sticker dec playlist`
       */
      dec: {
        (uri: string, name: string, value?: number): Promise<void>;
      }
      /**
       * mpd command: `sticker find playlist`
       */
      find: {
        <T extends object>(name: string, uri?: string): Promise<T[]>;
      }
      /**
       * mpd command: `sticker find playlist`
       */
      search: {
        <T extends object>(name: string, value: string, comparator?: string, uri?: string): Promise<T[]>;
      }
      /**
       * mpd command: `sticker playlist`
       */
      getRating: {
        (uri: string): Promise<number | undefined>;
      }
      /**
       * mpd command: `sticker playlist`
       */
      setRating: {
        (uri: string, rating: number): Promise<void>;
      }
      /**
       * mpd command: `sticker playlist`
       */
      getLike: {
        (uri: string): Promise<0 | 1 | 2 | undefined>;
      }
      /**
       * mpd command: `sticker playlist`
       */
      setLike: {
        (uri: string, like: 0 | 1 | 2): Promise<void>;
      }
      /**
       * mpd command: `sticker playlist`
       */
      setFavourite: {
        (uri: string, favourite?: boolean): Promise<void>;
      }
      /**
       * mpd command: `sticker playlist`
       */
      getStats: {
        (uri: string): Promise<StickerStats>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#stickers)
     * Stickers on tag values
     */
    stickerTag: {
      /**
       * mpd command: `sticker list`
       */
      list: {
        <T extends object>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T extends object>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `sticker set`
       */
      set: {
        (tag: string, uri: string, name: string, value: string | number): Promise<void>;
      }
      /**
       * mpd command: `sticker get`
       */
      get: {
        <T = any>(args?: (string | number | MPD.Command)[]): Promise<T>;
        <T = any>(...args: (string | number | MPD.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `sticker delete`
       */
      delete: {
        (tag: string, uri: string, name: string): Promise<void>;
      }
      /**
       * mpd command: `sticker delete`
       */
      deleteAll: {
        (args?: (string | number | MPD.Command)[]): Promise<void>;
        (...args: (string | number | MPD.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `sticker inc`
       */
      inc: {
        (tag: string, uri: string, name: string, value?: number): Promise<void>;
      }
      /**
       * mpd command: `sticker dec`
       */
      dec: {
        (tag: string, uri: string, name: string, value?: number): Promise<void>;
      }
      /**
       * mpd command: `sticker find`
       */
      find: {
        <T extends object>(tag: string, name: string, uri?: string): Promise<T[]>;
      }
      /**
       * mpd command: `sticker find`
       */
      search: {
        <T extends object>(tag: string, name: string, value: string, comparator?: string, uri?: string): Promise<T[]>;
      }
      /**
       * mpd command: `sticker`
       */
      getRating: {
        (tag: string, uri: string): Promise<number | undefined>;
      }
      /**
       * mpd command: `sticker`
       */
      setRating: {
        (tag: string, uri: string, rating: number): Promise<void>;
      }
      /**
       * mpd command: `sticker`
       */
      getLike: {
        (tag: string, uri: string): Promise<0 | 1 | 2 | undefined>;
      }
      /**
       * mpd command: `sticker`
       */
      setLike: {
        (tag: string, uri: string, like: 0 | 1 | 2): Promise<void>;
      }
      /**
       * mpd command: `sticker`
       */
      setFavourite: {
        (tag: string, uri: string, favourite?: boolean): Promise<void>;
      }
      /**
       * mpd command: `sticker`
       */
      getStats: {
        (tag: string, uri: string): Promise<StickerStats>;
      }
    },
  }

}

// lib/index.js sets these on module.exports too: named imports, require()
// and Node's ESM default import (= module.exports) all see them
export { mpd };
export declare const connect: MPDApi.MPDApi['connect'];
export declare const stickerAlbumFilter: MPDApi.MPDApi['stickerAlbumFilter'];

export default mpdApi;
