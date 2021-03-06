import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {IHierarchicalObject, IOauth1Options, ISimpleObject} from './config-interfaces';
import {ConfigService} from './config.service';
import {IOauthService} from './oauth-service';
import {PopupService} from './popup.service';
import {buildQueryString, joinUrl} from './utils';
import {RedirectService} from './redirect.service';
import {SharedService} from './shared.service';

@Injectable()
export class Oauth1Service implements IOauthService<IOauth1Options> {
  constructor(private http: HttpClient, private popup: PopupService,
              private config: ConfigService, private redirect: RedirectService,
              private shared: SharedService) {
  }

  open(oauthOptions: IOauth1Options, userData: IHierarchicalObject): Observable<IHierarchicalObject> {
    const serverUrl = this.config.options.baseUrl ? joinUrl(this.config.options.baseUrl, oauthOptions.url) : oauthOptions.url;
    if (oauthOptions.doRedirect) {
      return this.http.post<ISimpleObject>(serverUrl, oauthOptions)
        .pipe(mergeMap(authorizationData =>
          this.redirect.go([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'),
            oauthOptions, authorizationData, userData)));
    }
    return this.popup.open('about:blank', oauthOptions, this.config.options.cordova).pipe(
      switchMap(popupWindow =>
        this.http.post<ISimpleObject>(serverUrl, oauthOptions).pipe(
          tap(authorizationData =>
            popupWindow
              ? popupWindow.location.replace([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'))
              : undefined
          ),
          switchMap(authorizationData =>
            this.popup
              .waitForClose(popupWindow, this.config.options.cordova, oauthOptions.redirectUri)
              .pipe(map(oauthData => ({authorizationData, oauthData})))
          )
        )
      ),
      switchMap(({authorizationData, oauthData}) => this.shared.exchangeForToken(oauthOptions, authorizationData, oauthData, userData))
    );
  }
}
