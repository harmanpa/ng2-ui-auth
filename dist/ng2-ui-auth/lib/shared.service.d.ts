import { StorageType } from './storage-type.enum';
import { Observable } from 'rxjs';
import { StorageService } from './storage-service';
import { ConfigService } from './config.service';
export declare class SharedService {
    private storage;
    private config;
    tokenName: string;
    constructor(storage: StorageService, config: ConfigService);
    getToken(): string | null;
    getPayload(token?: string): any;
    setToken(response: string | any): void;
    removeToken(): void;
    isAuthenticated(token?: string): boolean;
    getExpirationDate(token?: string): Date | null;
    logout(): Observable<any>;
    setStorageType(type: StorageType): boolean;
    private b64DecodeUnicode;
}
