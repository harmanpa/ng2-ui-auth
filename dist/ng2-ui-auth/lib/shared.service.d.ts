import { StorageType } from './storage-type.enum';
import { Observable } from 'rxjs';
import { StorageService } from './storage-service';
import { ConfigService } from './config.service';
import * as ɵngcc0 from '@angular/core';
export declare class SharedService {
    private storage;
    private config;
    tokenName: string;
    constructor(storage: StorageService, config: ConfigService);
    getToken(): string | null;
    getPayload(token?: string): any;
    setToken(response: string | object): void;
    removeToken(): void;
    isAuthenticated(token?: string): boolean;
    getExpirationDate(token?: string): Date | null;
    logout(): Observable<any>;
    setStorageType(type: StorageType): boolean;
    private b64DecodeUnicode;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SharedService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<SharedService>;
}

//# sourceMappingURL=shared.service.d.ts.map