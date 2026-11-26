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
{API_NAMESPACES}
  }

}

// lib/index.js sets these on module.exports too: named imports, require()
// and Node's ESM default import (= module.exports) all see them
export { mpd };
export declare const connect: MPDApi.MPDApi['connect'];
export declare const stickerAlbumFilter: MPDApi.MPDApi['stickerAlbumFilter'];

export default mpdApi;
