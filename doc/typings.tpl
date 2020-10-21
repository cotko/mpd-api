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
{API_NAMESPACES}
  }

}

export default mpdApi;

