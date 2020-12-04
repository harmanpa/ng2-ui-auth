/**
 * Created by Ron on 17/12/2015.
 */
import { IHierarchicalObject, ISimpleObject } from './config-interfaces';
export declare function joinUrl(baseUrl: string, url: string): string;
export declare function buildQueryString(obj: ISimpleObject): string;
export declare function getWindowOrigin(w?: Window): string | null;
export declare function stringifyOptions(options: ISimpleObject): string;
export declare function parseQueryString(joinedKeyValue: string): {
    [k: string]: string | true;
};
export declare function flatten(obj: IHierarchicalObject): ISimpleObject;
export declare function expand(obj: ISimpleObject): IHierarchicalObject;
export declare function staticify(obj: object): IHierarchicalObject;
export declare function isCordovaApp(): boolean;
