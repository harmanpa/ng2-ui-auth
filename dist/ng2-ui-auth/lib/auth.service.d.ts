import { Observable } from 'rxjs';
import { LocalService } from './local.service';
import { OauthService } from './oauth.service';
import { SharedService } from './shared.service';
import { StorageType } from './storage-type.enum';
import { IHierarchicalObject } from './config-interfaces';
export declare class AuthService {
    private shared;
    private local;
    private oauth;
    constructor(shared: SharedService, local: LocalService, oauth: OauthService);
    login(user: string | IHierarchicalObject, url?: string): Observable<IHierarchicalObject>;
    signup(user: string | IHierarchicalObject, url?: string): Observable<IHierarchicalObject>;
    logout(): Observable<void>;
    authenticate(name: string, userData?: IHierarchicalObject): Observable<IHierarchicalObject>;
    link(name: string, userData?: IHierarchicalObject): Observable<IHierarchicalObject>;
    unlink<T = any>(provider: string, url?: string): Observable<T>;
    isAuthenticated(): boolean;
    getToken(): string | null;
    setToken(token: string | object): void;
    removeToken(): void;
    getPayload(): any;
    setStorageType(type: StorageType): boolean;
    getExpirationDate(): Date | null;
}
