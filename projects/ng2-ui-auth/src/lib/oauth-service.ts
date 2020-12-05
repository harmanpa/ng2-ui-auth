import {IOauth2Options, IOauth1Options, IHierarchicalObject} from './config-interfaces';
import {Observable} from 'rxjs';

export interface IOauthService<O = IOauth1Options | IOauth2Options> {
  open(options: O, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
}
