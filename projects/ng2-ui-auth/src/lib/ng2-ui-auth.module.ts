import {NgModule, ModuleWithProviders} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {IPartialConfigOptions} from './config-interfaces';
import {CONFIG_OPTIONS, ConfigService} from './config.service';
import {StorageService} from './storage-service';
import {BrowserStorageService} from './browser-storage.service';
import {SharedService} from './shared.service';
import {JwtInterceptor} from './interceptor.service';
import {OauthService} from './oauth.service';
import {HttpClient} from '@angular/common/http';
import {PopupService} from './popup.service';
import {LocalService} from './local.service';
import {AuthService} from './auth.service';
import {RedirectService} from './redirect.service';

@NgModule({
  imports: [HttpClientModule]
})
export class Ng2UiAuthModule {

  static forRoot(configOptions: IPartialConfigOptions = {}, defaultJwtInterceptor = true): ModuleWithProviders<Ng2UiAuthModule> {
    return {
      ngModule: Ng2UiAuthModule,
      providers: [
        {provide: CONFIG_OPTIONS, useValue: configOptions},
        {provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS]},
        {provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService]},
        {provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService, HttpClient]},
        {provide: LocalService, useClass: LocalService, deps: [HttpClient, SharedService, ConfigService]},
        {provide: PopupService, useClass: PopupService, deps: [ConfigService]},
        {provide: OauthService, useClass: OauthService, deps: [HttpClient, SharedService, ConfigService, PopupService, RedirectService]},
        {provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService]},
        {provide: RedirectService, useClass: RedirectService, deps: [StorageService, SharedService]},
        ...(defaultJwtInterceptor
          ? [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService]}]
          : [])
      ]
    };
  }

}
