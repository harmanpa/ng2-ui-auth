import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalService} from './local.service';
import {OauthService} from './oauth.service';
import {SharedService} from './shared.service';
import {StorageType} from './storage-type.enum';
import {IHierarchicalObject} from './config-interfaces';

@Injectable()
export class AuthService {
  constructor(private shared: SharedService, private local: LocalService, private oauth: OauthService) {
  }

  public login(user: string | IHierarchicalObject, url?: string): Observable<IHierarchicalObject> {
    return this.local.login(user, url);
  }

  public signup(user: string | IHierarchicalObject, url?: string): Observable<IHierarchicalObject> {
    return this.local.signup(user, url);
  }

  public logout(): Observable<void> {
    return this.shared.logout();
  }

  public authenticate(name: string, userData?: IHierarchicalObject): Observable<IHierarchicalObject> {
    return this.oauth.authenticate(name, userData);
  }

  public link(name: string, userData?: IHierarchicalObject): Observable<IHierarchicalObject> {
    return this.oauth.authenticate(name, userData);
  }

  public unlink<T = any>(provider: string, url?: string): Observable<T> {
    return this.oauth.unlink<T>(provider, url);
  }

  public isAuthenticated(): boolean {
    return this.shared.isAuthenticated();
  }

  public getToken(): string | null {
    return this.shared.getToken();
  }

  public setToken(token: string | object): void {
    this.shared.setToken(token);
  }

  public removeToken(): void {
    this.shared.removeToken();
  }

  public getPayload(): any {
    return this.shared.getPayload();
  }

  public setStorageType(type: StorageType): boolean {
    return this.shared.setStorageType(type);
  }

  public getExpirationDate(): Date | null {
    return this.shared.getExpirationDate();
  }
}
