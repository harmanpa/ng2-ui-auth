import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHierarchicalObject, IOauth1Options, ISimpleObject } from './config-interfaces';
import { ConfigService } from './config.service';
import { IOauthService } from './oauth-service';
import { PopupService } from './popup.service';
import { RedirectService } from './redirect.service';
export declare class Oauth1Service implements IOauthService<IOauth1Options> {
    private http;
    private popup;
    private config;
    private redirect;
    constructor(http: HttpClient, popup: PopupService, config: ConfigService, redirect: RedirectService);
    open(oauthOptions: IOauth1Options, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
    exchangeForToken(oauthOptions: IOauth1Options, authorizationData: ISimpleObject, oauthData: ISimpleObject, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
}
