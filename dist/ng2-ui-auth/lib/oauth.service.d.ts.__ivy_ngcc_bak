import { Observable } from 'rxjs';
import { PopupService } from './popup.service';
import { ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { IOauthService } from './oauth-service';
import { IHierarchicalObject, IOauthOptions } from './config-interfaces';
export declare class OauthService {
    private http;
    private shared;
    private config;
    private popup;
    readonly depProviders: ({
        provide: typeof HttpClient;
        useValue: HttpClient;
    } | {
        provide: typeof PopupService;
        useValue: PopupService;
    } | {
        provide: typeof ConfigService;
        useValue: ConfigService;
    })[];
    readonly deps: (typeof HttpClient | typeof ConfigService | typeof PopupService)[];
    constructor(http: HttpClient, shared: SharedService, config: ConfigService, popup: PopupService);
    authenticate(name: string, userData?: IHierarchicalObject): Observable<IHierarchicalObject>;
    getProvider(id: string | IOauthOptions): IOauthService;
    unlink<T>(provider: string, url?: string, method?: string): Observable<T>;
}
