import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHierarchicalObject, IOauth1Options } from './config-interfaces';
import { ConfigService } from './config.service';
import { IOauthService } from './oauth-service';
import { PopupService } from './popup.service';
import { RedirectService } from './redirect.service';
import { SharedService } from './shared.service';
export declare class Oauth1Service implements IOauthService<IOauth1Options> {
    private http;
    private popup;
    private config;
    private redirect;
    private shared;
    constructor(http: HttpClient, popup: PopupService, config: ConfigService, redirect: RedirectService, shared: SharedService);
    open(oauthOptions: IOauth1Options, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
}
