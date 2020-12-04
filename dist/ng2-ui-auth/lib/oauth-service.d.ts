import { IOauth2Options, IOauth1Options, IHierarchicalObject, ISimpleObject } from './config-interfaces';
import { Observable } from 'rxjs';
export interface IOauthService<O = IOauth1Options | IOauth2Options> {
    open(options: O, userData: object): Observable<IHierarchicalObject>;
    exchangeForToken(oauthOptions: O, authorizationData: ISimpleObject, oauthData: ISimpleObject, userData: IHierarchicalObject): Observable<IHierarchicalObject>;
}
