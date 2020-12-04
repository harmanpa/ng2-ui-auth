/**
 * Created by Ron on 17/12/2015.
 */
import {IHierarchicalObject, ISimpleObject} from './config-interfaces';

declare const cordova: any;

export function joinUrl(baseUrl: string, url: string): string {
  if (/^(?:[a-z]+:)?\/\//i.test(url)) {
    return url;
  }

  const joined = [baseUrl, url].join('/');

  return joined
    .replace(/[\/]+/g, '/')
    .replace(/\/\?/g, '?')
    .replace(/\/\#/g, '#')
    .replace(/\:\//g, '://');
}

export function buildQueryString(obj: ISimpleObject): string {
  return Object.keys(obj)
    .map(key => (!!obj[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}` : key))
    .join('&');
}

export function getWindowOrigin(w?: Window): string | null {
  if (!w && typeof window !== 'undefined') {
    w = window;
  }
  try {
    if (!w || !w.location) {
      return null;
    }
    if (!w.location.origin) {
      return `${w.location.protocol}//${w.location.hostname}${w.location.port ? ':' + w.location.port : ''}`;
    }
    return w.location.origin;
  } catch (error) {
    return null;
    // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
    // error instanceof DOMException && error.name === 'SecurityError'
  }
}


export function stringifyOptions(options: ISimpleObject): string {
  return Object.keys(options)
    .map(key => (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]))
    .join(',');
}

export function parseQueryString(joinedKeyValue: string): { [k: string]: string | true } {
  let key;
  let value;
  return joinedKeyValue.split('&').reduce(
    (obj, keyValue) => {
      if (keyValue) {
        value = keyValue.split('=');
        key = decodeURIComponent(value[0]);
        obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
      }
      return obj;
    },
    {} as { [k: string]: string | true }
  );
}

export function flatten(obj: IHierarchicalObject): ISimpleObject {
  const out = {} as ISimpleObject;
  Object.keys(obj).forEach(key => {
    if (typeof (obj[key]) === 'object') {
      const subobj = flatten(obj[key] as IHierarchicalObject);
      Object.keys(subobj).forEach(subkey => out[key + '.' + subkey] = subobj[subkey]);
    } else {
      out[key] = obj[key] as string | number | boolean | null;
    }
  });
  return out;
}

export function expand(obj: ISimpleObject): IHierarchicalObject {
  const out = {} as IHierarchicalObject;
  const roots = Object.keys(obj)
    .map(key => key.indexOf('.') > -1 ? key.substring(0, key.indexOf('.')) : key)
    .filter((value, index, array) => array.indexOf(value) === index);
  roots.forEach(key => {
    if (obj[key]) {
      out[key] = obj[key];
    } else {
      const childObject = {} as ISimpleObject;
      Object.keys(obj).filter(k => k.startsWith(key + '.')).forEach(k => {
        childObject[k.substr(key.length + 1)] = obj[k];
      });
      out[key] = expand(childObject);
    }
  });
  return out;
}

export function staticify(obj: object): IHierarchicalObject {
  const out = {} as IHierarchicalObject;
  Object.keys(obj).forEach(key => {
    switch (typeof (obj[key])) {
      case 'number':
      case 'string':
      case 'boolean':
        out[key] = obj[key] as string | number | boolean;
        break;
      case 'function':
        const tmpObj = staticify({tmp: (obj[key] as Function)()});
        out[key] = tmpObj['tmp'];
        break;
      case 'object':
        if (obj[key]) {
          out[key] = staticify(obj[key]);
        } else {
          out[key] = null;
        }
    }
  });
  return out;
}

export function isCordovaApp(): boolean {
  return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
}
