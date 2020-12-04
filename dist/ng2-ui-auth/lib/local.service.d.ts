import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { IHierarchicalObject } from './config-interfaces';
import * as ɵngcc0 from '@angular/core';
export declare class LocalService {
    private http;
    private shared;
    private config;
    constructor(http: HttpClient, shared: SharedService, config: ConfigService);
    login(user: string | IHierarchicalObject, url?: string): Observable<IHierarchicalObject>;
    signup(user: string | IHierarchicalObject, url?: string): Observable<IHierarchicalObject>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<LocalService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<LocalService>;
}

//# sourceMappingURL=local.service.d.ts.map