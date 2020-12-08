import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { IHierarchicalObject, IOauthOptions } from './config-interfaces';
import { IOauthService } from './oauth-service';
import { PopupService } from './popup.service';
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
    } | {
        provide: typeof SharedService;
        useValue: SharedService;
    })[];
    readonly deps: (typeof HttpClient | typeof ConfigService | typeof SharedService | typeof PopupService)[];
    constructor(http: HttpClient, shared: SharedService, config: ConfigService, popup: PopupService);
    authenticate(name: string, userData?: IHierarchicalObject): Observable<IHierarchicalObject>;
    getProvider(id: string | IOauthOptions): IOauthService;
    unlink<T>(provider: string, url?: string, method?: string): Observable<T>;
}
