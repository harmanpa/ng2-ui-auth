import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { IHierarchicalObject } from './config-interfaces';
export declare class LocalService {
    private http;
    private shared;
    private config;
    constructor(http: HttpClient, shared: SharedService, config: ConfigService);
    login(user: string | IHierarchicalObject, url?: string): Observable<IHierarchicalObject>;
    signup(user: string | IHierarchicalObject, url?: string): Observable<IHierarchicalObject>;
}
