import {Injectable, Injector} from '@angular/core';
import {joinUrl} from './utils';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {SharedService} from './shared.service';
import {HttpClient} from '@angular/common/http';
import {IHierarchicalObject, IOauthOptions} from './config-interfaces';
import {IOauthService} from './oauth-service';
import {Oauth1Service} from './oauth1.service';
import {Oauth2Service} from './oauth2.service';
import {PopupService} from './popup.service';

@Injectable()
export class OauthService {
  readonly depProviders = [
    {provide: HttpClient, useValue: this.http},
    {provide: PopupService, useValue: this.popup},
    {provide: ConfigService, useValue: this.config},
    {provide: SharedService, useValue: this.shared}
  ];
  readonly deps = [HttpClient, PopupService, ConfigService, SharedService];

  constructor(private http: HttpClient, private shared: SharedService,
              private config: ConfigService, private popup: PopupService) {
  }

  public authenticate(name: string, userData?: IHierarchicalObject): Observable<IHierarchicalObject> {
    const provider = this.getProvider(name);
    return provider.open(this.config.options.providers[name], userData || {}).pipe(
      tap(response => {
        // this is for a scenario when someone wishes to opt out from
        // satellizer's magic by doing authorization code exchange and
        // saving a token manually.
        if (this.config.options.providers[name].url) {
          this.shared.setToken(response);
        }
      })
    );
  }

  public getProvider(id: string | IOauthOptions): IOauthService {
    const type = typeof (id) === 'string' ? this.config.options.providers[id as string].oauthType : (id as IOauthOptions)['oauthType'];
    const provider: IOauthService =
      type === '1.0'
        ? Injector.create([...this.depProviders, {provide: Oauth1Service, deps: this.deps}]).get(Oauth1Service)
        : Injector.create([...this.depProviders, {provide: Oauth2Service, deps: this.deps}]).get(Oauth2Service);
    return provider;
  }

  public unlink<T>(provider: string, url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl), method = 'POST') {
    return this.http.request<T>(method, url, {body: {provider}});
  }
}
