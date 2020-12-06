import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHierarchicalObject, IOauth1Options } from './config-interfaces';
import { ConfigService } from './config.service';
import { IOauthService } from './oauth-service';
import { PopupService } from './popup.service';
import { RedirectService } from './redirect.service';
import { SharedService } from './shared.service';
import * as ɵngcc0 from '@angular/core';
export declare class Oauth1Service implements IOauthService<IOauth1Options> {
    private http;
    private popup;
    private config;
    private redirect;
    private shared;
    constructor(http: HttpClient, popup: PopupService, config: ConfigService, redirect: RedirectService, shared: SharedService);
    open(oauthOptions: IOauth1Options, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Oauth1Service, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<Oauth1Service>;
}

//# sourceMappingURL=oauth1.service.d.ts.map