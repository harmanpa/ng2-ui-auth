import { StorageType } from './storage-type.enum';

export interface IPopupOptions {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  visibleToolbar?: boolean;
}

export interface IOauthOptions {
  url?: string;
  name?: string;
  redirectUri?: string;
  popupOptions?: IPopupOptions;
  authorizationEndpoint?: string;
  method?: string;
  doRedirect?: boolean;
}

export interface IOauth1Options extends IOauthOptions {
  oauthType?: '1.0';
}

export interface IOauth2Options extends IOauthOptions {
  oauthType?: '2.0';
  responseType?: string;
  clientId?: string;
  additionalUrlParams?: {
    [paramName: string]: string | (() => string) | null | undefined;
  };
  scopeDelimiter?: string;
  scope?: string[];
  state?: string | (() => string);
}

export interface IProviders {
  [provider: string]: IOauth2Options | IOauth1Options;
}

export interface IConfigOptions {
  tokenRoot: string | null;
  cordova: boolean | null;
  baseUrl: string;
  loginUrl: string;
  signupUrl: string;
  unlinkUrl: string;
  tokenName: string;
  tokenSeparator: string;
  tokenPrefix: string;
  authToken: string;
  authHeader: string;
  storageType: StorageType;
  providers: IProviders;
  withCredentials: boolean;
  resolveToken: (response: any, config: IConfigOptions) => string;
}

// now even using ts 2.7.2 Partial<IConfigOptions> causes "Could not resolve type Partial" build error...
export interface IPartialConfigOptions {
  tokenRoot?: string | null;
  cordova?: boolean | null;
  baseUrl?: string;
  loginUrl?: string;
  signupUrl?: string;
  unlinkUrl?: string;
  tokenName?: string;
  tokenSeparator?: string;
  tokenPrefix?: string;
  authToken?: string;
  authHeader?: string;
  storageType?: StorageType;
  providers?: IProviders;
  withCredentials?: boolean;
  resolveToken?: (response: any, config: IConfigOptions) => string;
}

export interface ISimpleObject {
  [key: string]: string | number | boolean | null;
}

export interface IHierarchicalObject {
  [key: string]: string | number | boolean | null | IHierarchicalObject;
}
