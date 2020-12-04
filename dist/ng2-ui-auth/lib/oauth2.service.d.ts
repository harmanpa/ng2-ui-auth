import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHierarchicalObject, IOauth2Options, ISimpleObject } from './config-interfaces';
import { ConfigService } from './config.service';
import { IOauthService } from './oauth-service';
import { PopupService } from './popup.service';
import { RedirectService } from './redirect.service';
import * as ɵngcc0 from '@angular/core';
export declare class Oauth2Service implements IOauthService<IOauth2Options> {
    private http;
    private popup;
    private config;
    private redirect;
    constructor(http: HttpClient, popup: PopupService, config: ConfigService, redirect: RedirectService);
    open(oauthOptions: IOauth2Options, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
    exchangeForToken(options: IOauth2Options, authorizationData: ISimpleObject, oauthData: ISimpleObject, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
    private getAuthorizationData;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Oauth2Service, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<Oauth2Service>;
}

//# sourceMappingURL=oauth2.service.d.ts.map