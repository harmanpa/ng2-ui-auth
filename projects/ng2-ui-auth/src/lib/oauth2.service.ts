import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {IHierarchicalObject, IOauth2Options, ISimpleObject} from './config-interfaces';
import {ConfigService} from './config.service';
import {IOauthService} from './oauth-service';
import {PopupService} from './popup.service';
import {buildQueryString, expand, getWindowOrigin, joinUrl} from './utils';
import {RedirectService} from './redirect.service';
import {SharedService} from './shared.service';

@Injectable()
export class Oauth2Service implements IOauthService<IOauth2Options> {
  constructor(private http: HttpClient, private popup: PopupService,
              private config: ConfigService, private redirect: RedirectService,
              private shared: SharedService) {
  }

  open(oauthOptions: IOauth2Options, userData: IHierarchicalObject): Observable<IHierarchicalObject> {
    const authorizationData = this.getAuthorizationData(oauthOptions);
    const url = [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?');
    if (oauthOptions.doRedirect) {
      return this.redirect.go(url, oauthOptions, authorizationData, userData);
    }
    return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(
      switchMap((window: Window) =>
        this.popup.waitForClose(window, this.config.options.cordova, oauthOptions.redirectUri)
      ),
      switchMap((oauthData: ISimpleObject) => {
        // when no server URL provided, return popup params as-is.
        // this is for a scenario when someone wishes to opt out from
        // satellizer's magic by doing authorization code exchange and
        // saving a token manually.
        if (oauthOptions.responseType === 'token' || !oauthOptions.url) {
          return of(expand(oauthData));
        }

        if (oauthData.state && oauthData.state !== authorizationData.state) {
          return throwError('OAuth "state" mismatch');
        }
        return this.shared.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
      })
    );
  }

  private getAuthorizationData(options: IOauth2Options): ISimpleObject {
    const {
      responseType = 'code',
      clientId,
      redirectUri = getWindowOrigin() || '',
      scopeDelimiter = ',',
      scope,
      state,
      additionalUrlParams
    } = options;
    const resolvedState = typeof state === 'function' ? state() : state;
    return [
      ['response_type', responseType],
      ['client_id', clientId],
      ['redirect_uri', redirectUri],
      ...(state ? [['state', resolvedState]] : []),
      ...(scope ? [['scope', scope.join(scopeDelimiter)]] : []),
      ...(additionalUrlParams
        ? Object.keys(additionalUrlParams).map(key => {
          const value: string | (() => string) | null | undefined = (additionalUrlParams as any)[key];
          if (typeof value === 'string') {
            return [key, value];
          } else if (typeof value === 'function') {
            return [key, value()];
          } else if (value === null) {
            return [key, ''];
          }
          return ['', ''];
        })
        : [])
    ]
      .filter(_ => !!_[0])
      .reduce((acc, next) => ({...acc, [next[0]]: next[1]}), {} as ISimpleObject);
  }
}
