import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {StorageService} from './storage-service';
import {buildQueryString, expand, flatten, getWindowOrigin, parseQueryString, staticify} from './utils';
import {IHierarchicalObject, IOauth1Options, IOauth2Options, IOauthOptions, ISimpleObject} from './config-interfaces';
import {OauthService} from './oauth.service';
import {tap} from 'rxjs/operators';
import {SharedService} from './shared.service';

@Injectable()
export class RedirectService {

  constructor(private authService: AuthService, private storage: StorageService,
              private oauth: OauthService, private shared: SharedService) {
  }

  public go(url: string, options: IOauth2Options | IOauth1Options,
            authorizationData: ISimpleObject, userData: IHierarchicalObject): Observable<IHierarchicalObject> {
    if (window) {
      const qs = buildQueryString(flatten(staticify({options, authorizationData, userData})));
      this.storage.set('ng2-ui-auth-REDIRECT', qs, '');
      window.open(url, '_self');
      return of({});
    }
    return throwError('Failed to redirect');
  }

  public isRedirect(): boolean {
    const options = this.storage.get('ng2-ui-auth-REDIRECT');
    if (options) {
      const w: Window = window;
      const windowOrigin = getWindowOrigin(w);
      const optionsObject = expand(parseQueryString(options))['options'] as IOauth2Options;
      const redirectUri = optionsObject.redirectUri;
      return redirectUri != null && windowOrigin != null
        && (redirectUri.indexOf(windowOrigin) === 0 || windowOrigin.indexOf(redirectUri) === 0)
        && (w.location.search != null || w.location.hash != null);
    }
  }

  public handleRedirect(): Observable<IHierarchicalObject> {
    const options = this.storage.get('ng2-ui-auth-REDIRECT');
    if (options) {
      const w: Window = window;
      const windowOrigin = getWindowOrigin(w);
      const data = expand(parseQueryString(options));
      const optionsObject = data['options'] as IOauthOptions;
      const authorizationData = data['authorizationData'] as ISimpleObject;
      const userData = data['userData'] as IHierarchicalObject;
      const redirectUri = optionsObject.redirectUri;
      if (redirectUri != null && windowOrigin != null
        && (redirectUri.indexOf(windowOrigin) === 0 || windowOrigin.indexOf(redirectUri) === 0)
        && (w.location.search != null || w.location.hash != null)) {
        const queryParams = w.location.search.substring(1).replace(/\/$/, '');
        const hashParams = w.location.hash.substring(1).replace(/[\/$]/, '');
        const hash = parseQueryString(hashParams);
        const qs = parseQueryString(queryParams);
        const allParams = {...qs, ...hash};
        if (allParams.error) {
          throw throwError(allParams.error);
        } else {
          return this.oauth.getProvider(optionsObject)
            .exchangeForToken(optionsObject, authorizationData, allParams, userData)
            .pipe(tap(response => {
              this.shared.setToken(response);
              this.storage.remove('ng2-ui-auth-REDIRECT');
            }));
        }
      }
      return throwError('Not at valid redirect URI');
    }
    return throwError('No stored options for redirect');
  }

}
