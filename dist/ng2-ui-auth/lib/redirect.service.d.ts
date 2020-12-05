import { Observable } from 'rxjs';
import { StorageService } from './storage-service';
import { IHierarchicalObject, IOauth1Options, IOauth2Options, ISimpleObject } from './config-interfaces';
import { SharedService } from './shared.service';
export declare class RedirectService {
    private storage;
    private shared;
    constructor(storage: StorageService, shared: SharedService);
    go(url: string, options: IOauth2Options | IOauth1Options, authorizationData: ISimpleObject, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
    isRedirect(): boolean;
    handleRedirect(): Observable<IHierarchicalObject>;
}
