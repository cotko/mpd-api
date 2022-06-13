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
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#client-to-client)
     * Client to client communication
     */
    c2c: {
      /**
       * mpd command: `channels`
       */
      list: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `subscribe`
       */
      subscribe: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `unsubscribe`
       */
      unsubscribe: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `sendmessage`
       */
      sendMessage: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `readmessages`
       */
      readMessages: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
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
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `kill`
       */
      kill: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `ping`
       */
      ping: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `tagtypes`
       */
      getTagTypes: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `tagtypes`
       */
      enableTagTypes: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `tagtypes`
       */
      disableTagTypes: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `tagtypes`
       */
      clearTagTypes: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `tagtypes`
       */
      enableAllTagTypes: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `binarylimit`
       */
      binarylimit: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
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
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `listallinfo`
       */
      listallinfo: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `list`
       */
      list: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `count`
       */
      count: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `find`
       */
      find: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `findadd`
       */
      findadd: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `search`
       */
      search: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `searchadd`
       */
      searchadd: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `searchaddpl`
       */
      searchaddpl: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `lsinfo`
       */
      lsinfo: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `lsinfo`
       */
      songinfo: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `listfiles`
       */
      listfiles: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `readcomments`
       */
      readcomments: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `rescan`
       */
      rescan: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `update`
       */
      update: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `getfingerprint`
       */
      getfingerprint: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
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
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `listneighbors`
       */
      listNeighbors: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `mount`
       */
      mount: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `unmount`
       */
      unmount: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
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
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `enableoutput`
       */
      enable: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `disableoutput`
       */
      disable: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `toggleoutput`
       */
      toggle: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `outputset`
       */
      set: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
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
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `newpartition`
       */
      create: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `partition`
       */
      switchTo: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `delpartition`
       */
      delete: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `moveoutput`
       */
      moveOutputToCurrentPartition: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
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
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `previous`
       */
      prev: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `pause`
       */
      pause: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `pause`
       */
      resume: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `pause`
       */
      toggle: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `play`
       */
      play: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playid`
       */
      playid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `stop`
       */
      stop: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `seekcur`
       */
      seekcur: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `seek`
       */
      seek: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `seekid`
       */
      seekid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `getvol`
       */
      getvol: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `consume`
       */
      consume: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `crossfade`
       */
      crossfade: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `mixrampdb`
       */
      mixrampdb: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `mixrampdelay`
       */
      mixrampdelay: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `random`
       */
      random: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `repeat`
       */
      repeat: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `single`
       */
      single: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `setvol`
       */
      setvol: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `replay_gain_mode`
       */
      setReplayGain: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `replay_gain_status`
       */
      getReplayGain: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
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
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `listplaylist`
       */
      list: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `listplaylistinfo`
       */
      listinfo: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `load`
       */
      load: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistadd`
       */
      add: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistclear`
       */
      clear: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistdelete`
       */
      deleteAt: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistmove`
       */
      move: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `rename`
       */
      rename: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `rm`
       */
      remove: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `save`
       */
      save: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
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
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `addid`
       */
      addid: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `clear`
       */
      clear: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistinfo`
       */
      info: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `playlistid`
       */
      id: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `delete`
       */
      delete: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `deleteid`
       */
      deleteid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `move`
       */
      move: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `moveid`
       */
      moveid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `playlistfind`
       */
      find: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `playlistsearch`
       */
      search: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `prio`
       */
      prio: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `prioid`
       */
      prioid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `shuffle`
       */
      shuffle: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `swap`
       */
      swap: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `swapid`
       */
      swapid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `addtagid`
       */
      addtagid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `cleartagid`
       */
      cleartagid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `plchanges`
       */
      getChanges: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `plchangesposid`
       */
      getChangesPosId: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `rangeid`
       */
      rangeid: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
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
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `commands`
       */
      commands: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `notcommands`
       */
      notcommands: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `urlhandlers`
       */
      urlhandlers: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
      }
      /**
       * mpd command: `decoders`
       */
      decoders: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T[]>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T[]>;
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
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `clearerror`
       */
      clearerror: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `currentsong`
       */
      currentsong: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `stats`
       */
      stats: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
    },
    /**
     * [MPD doc](https://mpd.readthedocs.io/en/latest/protocol.html#stickers)
     * Stickers
     */
    sticker: {
      /**
       * mpd command: `sticker`
       */
      list: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `sticker`
       */
      set: {
        (uri: string, name: string, value: string): Promise<void>;
      }
      /**
       * mpd command: `sticker`
       */
      get: {
        <T extends object>(args?: (string | typeof mpd.Command)[]): Promise<T>;
        <T extends object>(...args: (string | typeof mpd.Command)[]): Promise<T>;
      }
      /**
       * mpd command: `sticker`
       */
      delete: {
        (uri: string, name: string): Promise<void>;
      }
      /**
       * mpd command: `sticker`
       */
      deleteAll: {
        (args?: (string | typeof mpd.Command)[]): Promise<void>;
        (...args: (string | typeof mpd.Command)[]): Promise<void>;
      }
      /**
       * mpd command: `sticker`
       */
      find: {
        <T extends object>(name: string, uri?: string): Promise<T[]>;
      }
      /**
       * mpd command: `sticker`
       */
      search: {
        <T extends object>(name: string, value: string, comparator?: string, uri?: string): Promise<T[]>;
      }
    },
  }

}

export default mpdApi;

