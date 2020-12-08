import {Injectable} from '@angular/core';
import {StorageType} from './storage-type.enum';
import {Subscriber, Observable} from 'rxjs';
import {StorageService} from './storage-service';
import {ConfigService} from './config.service';
import {IHierarchicalObject, IOauth1Options, IOauthOptions, ISimpleObject} from './config-interfaces';
import {joinUrl} from './utils';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SharedService {
  public tokenName = this.config.options.tokenPrefix
    ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
    : this.config.options.tokenName;

  constructor(private storage: StorageService, private config: ConfigService, private http: HttpClient) {
  }

  public getToken(): string | null {
    return this.storage.get(this.tokenName);
  }

  public getPayload(token = this.getToken()): any {
    if (token && token.split('.').length === 3) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(this.b64DecodeUnicode(base64));
      } catch (e) {
        return undefined;
      }
    }
  }

  public setToken(response: string | any): void {
    if (!response) {
      // console.warn('Can\'t set token without passing a value');
      return;
    }

    let token: string;
    if (typeof response === 'string') {
      token = response;
    } else {
      token = this.config.options.resolveToken(response, this.config.options);
    }

    if (token) {
      const expDate = this.getExpirationDate(token);
      this.storage.set(this.tokenName, token, expDate ? expDate.toUTCString() : '');
    }
  }

  public removeToken(): void {
    this.storage.remove(this.tokenName);
  }

  public isAuthenticated(token = this.getToken()): boolean {
    // a token is present
    if (token) {
      // token with a valid JWT format XXX.YYY.ZZZ
      if (token.split('.').length === 3) {
        // could be a valid JWT or an access token with the same format
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
          // jwt with an optional expiration claims
          if (exp) {
            const isExpired = Math.round(new Date().getTime() / 1000) >= exp;
            if (isExpired) {
              // fail: Expired token
              this.storage.remove(this.tokenName);
              return false;
            } else {
              // pass: Non-expired token
              return true;
            }
          }
        } catch (e) {
          // pass: Non-JWT token that looks like JWT
          return true;
        }
      }
      // pass: All other tokens
      return true;
    }
    // fail: No token at all
    return false;
  }

  public getExpirationDate(token = this.getToken()): Date | null {
    const payload = this.getPayload(token);
    if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
      const date = new Date(0);
      date.setUTCSeconds(payload.exp);
      return date;
    }
    return null;
  }

  public logout(): Observable<void> {
    return new Observable<void>((observer: Subscriber<void>) => {
      this.storage.remove(this.tokenName);
      observer.next();
      observer.complete();
    });
  }

  public setStorageType(type: StorageType): boolean {
    return this.storage.updateStorageType(type);
  }

  public exchangeForToken(oauthOptions: IOauthOptions,
                          authorizationData: ISimpleObject,
                          oauthData: ISimpleObject,
                          userData: IHierarchicalObject): Observable<IHierarchicalObject> {
    const body = oauthOptions['oauthType'] === '1.0'
      ? {oauthOptions, authorizationData, oauthData, userData}
      : {authorizationData, oauthData, userData};
    const {withCredentials, baseUrl} = this.config.options;
    const {method = 'POST', url} = oauthOptions;
    const exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
    return this.http.request<IHierarchicalObject>(method, exchangeForTokenUrl, {body, withCredentials});
  }

  private b64DecodeUnicode(str): string {
    return decodeURIComponent(Array.prototype.map
      .call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''));
  }
}
