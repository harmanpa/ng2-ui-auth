import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage-service';
import { IHierarchicalObject, IOauth1Options, IOauth2Options, ISimpleObject } from './config-interfaces';
import { OauthService } from './oauth.service';
import { SharedService } from './shared.service';
export declare class RedirectService {
    private authService;
    private storage;
    private oauth;
    private shared;
    constructor(authService: AuthService, storage: StorageService, oauth: OauthService, shared: SharedService);
    go(url: string, options: IOauth2Options | IOauth1Options, authorizationData: ISimpleObject, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
    isRedirect(): boolean;
    handleRedirect(): Observable<IHierarchicalObject>;
}
