import mpd, { MPD } from 'mpd2'

declare const mpdApi: MPDApi.MPDApi;

export declare namespace MPDApi {

  export interface MPDApi {
    mpd: typeof mpd;
    connect(config?: MPD.Config): Promise<ClientAPI>;
  }

  export interface ClientAPI extends MPD.Client {
    api: APIS;
  }

  interface APIS {
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#client-to-client)
     * Client to client communication
     */
    c2c: {
      list: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      subscribe: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      unsubscribe: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      sendMessage: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      readMessages: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#connection-settings)
     * Connection settings
     */
    connection: {
      close: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      kill: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      ping: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      getTagTypes: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      enableTagTypes: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      disableTagTypes: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      clearTagTypes: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      enableAllTagTypes: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#the-music-database)
     * The music database
     */
    db: {
      listall: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      listallinfo: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      list: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      count: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      find: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      findadd: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      search: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      searchadd: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      searchaddpl: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      lsinfo: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      listfiles: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      readcomments: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      rescan: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      update: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      getfingerprint: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      albumart: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      albumartWhole: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      readpicture: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      readpictureWhole: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#mounts-and-neighbors)
     * Mounts and neighbors
     */
    mounts: {
      list: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      listNeighbors: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      mount: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      unmount: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#audio-output-devices)
     * Audio output devices
     */
    outputs: {
      list: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      enable: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      disable: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      toggle: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      set: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#partition-commands)
     * Partition commands
     */
    partition: {
      list: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      create: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      switchTo: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      delete: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      moveOutputToCurrentPartition: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#controlling-playback)
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#playback-options)
     * Playback options and controls
     */
    playback: {
      next: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      prev: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      pause: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      resume: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      toggle: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      play: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      playid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      stop: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      seekcur: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      seek: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      seekid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      consume: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      crossfade: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      mixrampdb: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      mixrampdelay: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      random: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      repeat: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      single: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      setvol: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      setReplayGain: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      getReplayGain: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#stored-playlists)
     * Stored playlists
     */
    playlists: {
      get: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      list: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      listinfo: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      load: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      add: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      clear: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      deleteAt: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      move: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      rename: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      remove: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      save: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#the-queue)
     * The Queue
     */
    queue: {
      add: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      addid: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      clear: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      info: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      id: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      delete: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      deleteid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      move: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      moveid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      find: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      search: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      prio: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      prioid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      shuffle: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      swap: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      swapid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      addtagid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      cleartagid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      getChanges: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      getChangesPosId: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      rangeid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#reflection)
     * Reflection
     */
    reflection: {
      config: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      commands: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      notcommands: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      urlhandlers: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      decoders: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#querying-mpd-s-status)
     * Querying MPD’s status
     */
    status: {
      get: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      clearerror: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      currentsong: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      stats: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
    },
    /**
     * [MPD doc](https://www.musicpd.org/doc/html/protocol.html#stickers)
     * Stickers
     */
    sticker: {
      list: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      set: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      get: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      delete: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      deleteAll: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      find: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      search: {
        <T extends Object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends Object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
    },
  }

}

export default mpdApi;

