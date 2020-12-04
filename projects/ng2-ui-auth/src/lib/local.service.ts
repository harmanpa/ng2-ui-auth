import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';
import {ConfigService} from './config.service';
import {joinUrl} from './utils';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IHierarchicalObject} from './config-interfaces';

@Injectable()
export class LocalService {
  constructor(private http: HttpClient, private shared: SharedService, private config: ConfigService) {
  }

  public login(user: string | IHierarchicalObject, url?: string): Observable<IHierarchicalObject> {
    return this.http
      .post<IHierarchicalObject>(url || joinUrl(this.config.options.baseUrl, this.config.options.loginUrl), user)
      .pipe(tap(data => this.shared.setToken(data)));
  }

  public signup(user: string | IHierarchicalObject, url?: string): Observable<IHierarchicalObject> {
    return this.http.post<IHierarchicalObject>(url || joinUrl(this.config.options.baseUrl, this.config.options.signupUrl), user)
      .pipe(tap(data => this.shared.setToken(data)));
  }
}
