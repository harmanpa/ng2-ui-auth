import { StorageType } from './storage-type.enum';
import { Observable } from 'rxjs';
import { StorageService } from './storage-service';
import { ConfigService } from './config.service';
import { IHierarchicalObject, IOauthOptions, ISimpleObject } from './config-interfaces';
import { HttpClient } from '@angular/common/http';
import * as ɵngcc0 from '@angular/core';
export declare class SharedService {
    private storage;
    private config;
    private http;
    tokenName: string;
    constructor(storage: StorageService, config: ConfigService, http: HttpClient);
    getToken(): string | null;
    getPayload(token?: string): any;
    setToken(response: string | any): void;
    removeToken(): void;
    isAuthenticated(token?: string): boolean;
    getExpirationDate(token?: string): Date | null;
    logout(): Observable<any>;
    setStorageType(type: StorageType): boolean;
    exchangeForToken(oauthOptions: IOauthOptions, authorizationData: ISimpleObject, oauthData: ISimpleObject, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
    private b64DecodeUnicode;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SharedService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<SharedService>;
}

//# sourceMappingURL=shared.service.d.ts.map