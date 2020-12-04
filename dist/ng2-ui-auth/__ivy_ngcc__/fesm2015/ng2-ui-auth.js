import { InjectionToken, Injectable, Inject, Injector, EventEmitter, Directive, Output, NgModule } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError, merge, fromEvent, EMPTY, interval } from 'rxjs';
import { delay, map, switchMap, take, tap, mergeMap } from 'rxjs/operators';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common/http';
function joinUrl(baseUrl, url) {
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
function buildQueryString(obj) {
    return Object.keys(obj)
        .map(key => (!!obj[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}` : key))
        .join('&');
}
function getWindowOrigin(w) {
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
    }
    catch (error) {
        return null;
        // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // error instanceof DOMException && error.name === 'SecurityError'
    }
}
function stringifyOptions(options) {
    return Object.keys(options)
        .map(key => (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]))
        .join(',');
}
function parseQueryString(joinedKeyValue) {
    let key;
    let value;
    return joinedKeyValue.split('&').reduce((obj, keyValue) => {
        if (keyValue) {
            value = keyValue.split('=');
            key = decodeURIComponent(value[0]);
            obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
        }
        return obj;
    }, {});
}
function flatten(obj) {
    const out = {};
    Object.keys(obj).forEach(key => {
        if (typeof (obj[key]) === 'object') {
            const subobj = flatten(obj[key]);
            Object.keys(subobj).forEach(subkey => out[key + '.' + subkey] = subobj[subkey]);
        }
        else {
            out[key] = obj[key];
        }
    });
    return out;
}
function expand(obj) {
    const out = {};
    const roots = Object.keys(obj)
        .map(key => key.indexOf('.') > -1 ? key.substring(0, key.indexOf('.')) : key)
        .filter((value, index, array) => array.indexOf(value) === index);
    roots.forEach(key => {
        if (obj[key]) {
            out[key] = obj[key];
        }
        else {
            const childObject = {};
            Object.keys(obj).filter(k => k.startsWith(key + '.')).forEach(k => {
                childObject[k.substr(key.length + 1)] = obj[k];
            });
            out[key] = expand(childObject);
        }
    });
    return out;
}
function staticify(obj) {
    const out = {};
    Object.keys(obj).forEach(key => {
        switch (typeof (obj[key])) {
            case 'number':
            case 'string':
            case 'boolean':
                out[key] = obj[key];
                break;
            case 'function':
                const tmpObj = staticify({ tmp: obj[key]() });
                out[key] = tmpObj['tmp'];
                break;
            case 'object':
                if (obj[key]) {
                    out[key] = staticify(obj[key]);
                }
                else {
                    out[key] = null;
                }
        }
    });
    return out;
}
function isCordovaApp() {
    return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
}

const ɵ0 = () => encodeURIComponent(Math.random()
    .toString(36)
    .substr(2)), ɵ1 = () => encodeURIComponent(Math.random()
    .toString(36)
    .substr(2));
const defaultProviders = {
    facebook: {
        name: 'facebook',
        url: '/auth/facebook',
        redirectUri: `${getWindowOrigin()}/`,
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        additionalUrlParams: {
            display: 'popup'
        },
        scope: ['email'],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 580, height: 400 }
    },
    google: {
        name: 'google',
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        additionalUrlParams: {
            display: 'popup',
            prompt: undefined,
            login_hint: undefined,
            access_type: undefined,
            include_granted_scopes: undefined,
            'openid.realm': undefined,
            hd: undefined
        },
        scope: ['openid', 'email'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 452, height: 633 },
        state: ɵ0
    },
    github: {
        name: 'github',
        url: '/auth/github',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        scope: ['user:email'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 1020, height: 618 }
    },
    instagram: {
        name: 'instagram',
        url: '/auth/instagram',
        authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
        scope: ['basic'],
        scopeDelimiter: '+',
        oauthType: '2.0'
    },
    linkedin: {
        name: 'linkedin',
        url: '/auth/linkedin',
        authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
        scope: ['r_emailaddress'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 527, height: 582 },
        state: 'STATE'
    },
    twitter: {
        name: 'twitter',
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        oauthType: '1.0',
        popupOptions: { width: 495, height: 645 }
    },
    twitch: {
        name: 'twitch',
        url: '/auth/twitch',
        authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
        scope: ['user_read'],
        scopeDelimiter: ' ',
        additionalUrlParams: {
            display: 'popup'
        },
        oauthType: '2.0',
        popupOptions: { width: 500, height: 560 }
    },
    live: {
        name: 'live',
        url: '/auth/live',
        authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
        additionalUrlParams: {
            display: 'popup'
        },
        scope: ['wl.emails'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 500, height: 560 }
    },
    yahoo: {
        name: 'yahoo',
        url: '/auth/yahoo',
        authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
        scope: [],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 559, height: 519 }
    },
    bitbucket: {
        name: 'bitbucket',
        url: '/auth/bitbucket',
        authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
        redirectUri: `${getWindowOrigin()}/`,
        scope: ['email'],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 1028, height: 529 }
    },
    spotify: {
        name: 'spotify',
        url: '/auth/spotify',
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        scope: ['', 'user-read-email'],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 500, height: 530 },
        state: ɵ1
    }
};

var StorageType;
(function (StorageType) {
    StorageType["NONE"] = "none";
    StorageType["MEMORY"] = "memory";
    StorageType["LOCAL_STORAGE"] = "localStorage";
    StorageType["SESSION_STORAGE"] = "sessionStorage";
    StorageType["COOKIE"] = "cookie";
    StorageType["SESSION_COOKIE"] = "sessionCookie";
})(StorageType || (StorageType = {}));

const CONFIG_OPTIONS = new InjectionToken('config.options');
class ConfigService {
    constructor(options) {
        this.options = {
            withCredentials: false,
            tokenRoot: null,
            baseUrl: '/',
            loginUrl: '/auth/login',
            signupUrl: '/auth/signup',
            unlinkUrl: '/auth/unlink/',
            tokenName: 'token',
            tokenSeparator: '_',
            tokenPrefix: 'ng2-ui-auth',
            authHeader: 'Authorization',
            authToken: 'Bearer',
            storageType: StorageType.LOCAL_STORAGE,
            cordova: undefined,
            resolveToken: (response, config) => {
                const accessToken = response && (response.access_token || response.token || response.data);
                if (!accessToken) {
                    // console.warn('No token found');
                    return null;
                }
                if (typeof accessToken === 'string') {
                    return accessToken;
                }
                if (typeof accessToken !== 'object') {
                    // console.warn('No token found');
                    return null;
                }
                const tokenRootData = config.tokenRoot &&
                    config.tokenRoot.split('.').reduce((o, x) => {
                        return o[x];
                    }, accessToken);
                const token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
                if (token) {
                    return token;
                }
                // const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
                // console.warn('Expecting a token named "' + tokenPath);
                return null;
            },
            providers: {}
        };
        this.options = Object.assign(Object.assign({}, this.options), options);
        this.mergeWithDefaultProviders();
    }
    updateProviders(providers) {
        this.options.providers = Object.assign(Object.assign({}, (this.options.providers || {})), providers);
        this.mergeWithDefaultProviders();
    }
    mergeWithDefaultProviders() {
        Object.keys(this.options.providers).forEach(key => {
            if (key in defaultProviders) {
                this.options.providers[key] = Object.assign(Object.assign({}, defaultProviders[key]), this.options.providers[key]);
            }
        });
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(ɵngcc0.ɵɵinject(CONFIG_OPTIONS)); };
ConfigService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: ConfigService, factory: ConfigService.ɵfac });
ConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG_OPTIONS,] }] }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ConfigService, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [CONFIG_OPTIONS]
            }] }]; }, null); })();

class StorageService {
}

class BrowserStorageService extends StorageService {
    constructor(config) {
        super();
        this.config = config;
        this.store = {};
        this.storageType = StorageType.MEMORY;
        if (!this.updateStorageType(config.options.storageType)) {
            console.warn(config.options.storageType + ' is not available.');
        }
    }
    updateStorageType(storageType) {
        const isStorageAvailable = this.checkIsStorageAvailable(storageType);
        if (!isStorageAvailable) {
            return false;
        }
        this.storageType = storageType;
        return true;
    }
    get(key) {
        switch (this.storageType) {
            case StorageType.COOKIE:
            case StorageType.SESSION_COOKIE:
                return this.getCookie(key);
            case StorageType.LOCAL_STORAGE:
            case StorageType.SESSION_STORAGE:
                return window[this.storageType].getItem(key);
            case StorageType.MEMORY:
                return this.store[key];
            case StorageType.NONE:
            default:
                return null;
        }
    }
    set(key, value, date) {
        switch (this.storageType) {
            case StorageType.COOKIE:
            case StorageType.SESSION_COOKIE:
                this.setCookie(key, value, this.storageType === StorageType.COOKIE ? date : '');
                break;
            case StorageType.LOCAL_STORAGE:
            case StorageType.SESSION_STORAGE:
                window[this.storageType].setItem(key, value);
                break;
            case StorageType.MEMORY:
                this.store[key] = value;
                break;
            case StorageType.NONE:
            default:
                break;
        }
    }
    remove(key) {
        switch (this.storageType) {
            case StorageType.COOKIE:
            case StorageType.SESSION_COOKIE:
                this.removeCookie(key);
                break;
            case StorageType.LOCAL_STORAGE:
            case StorageType.SESSION_STORAGE:
                window[this.storageType].removeItem(key);
                break;
            case StorageType.MEMORY:
                delete this.store[key];
                break;
            case StorageType.NONE:
            default:
                break;
        }
    }
    checkIsStorageAvailable(storageType) {
        switch (storageType) {
            case StorageType.COOKIE:
            case StorageType.SESSION_COOKIE:
                return this.isCookieStorageAvailable();
            case StorageType.LOCAL_STORAGE:
            case StorageType.SESSION_STORAGE:
                return this.isWindowStorageAvailable(storageType);
            case StorageType.NONE:
            case StorageType.MEMORY:
                return true;
            default:
                return false;
        }
    }
    isWindowStorageAvailable(storageType) {
        try {
            const supported = window && storageType in window && window[storageType] !== null;
            if (supported) {
                const key = Math.random()
                    .toString(36)
                    .substring(7);
                window[storageType].setItem(key, '');
                window[storageType].removeItem(key);
            }
            return supported;
        }
        catch (e) {
            return false;
        }
    }
    isCookieStorageAvailable() {
        try {
            const supported = document && 'cookie' in document;
            if (supported) {
                const key = Math.random()
                    .toString(36)
                    .substring(7);
                this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                const value = this.getCookie(key);
                this.removeCookie(key);
                return value === 'test';
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }
    setCookie(key, value, expires = '', path = '/') {
        document.cookie = `${key}=${value}${expires ? `; expires=${expires}` : ''}; path=${path}`;
    }
    removeCookie(key, path = '/') {
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    }
    getCookie(key) {
        return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1');
    }
}
BrowserStorageService.ɵfac = function BrowserStorageService_Factory(t) { return new (t || BrowserStorageService)(ɵngcc0.ɵɵinject(ConfigService)); };
BrowserStorageService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: BrowserStorageService, factory: BrowserStorageService.ɵfac });
BrowserStorageService.ctorParameters = () => [
    { type: ConfigService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BrowserStorageService, [{
        type: Injectable
    }], function () { return [{ type: ConfigService }]; }, null); })();

class SharedService {
    constructor(storage, config) {
        this.storage = storage;
        this.config = config;
        this.tokenName = this.config.options.tokenPrefix
            ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
            : this.config.options.tokenName;
    }
    getToken() {
        return this.storage.get(this.tokenName);
    }
    getPayload(token = this.getToken()) {
        if (token && token.split('.').length === 3) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(this.b64DecodeUnicode(base64));
            }
            catch (e) {
                return undefined;
            }
        }
    }
    setToken(response) {
        if (!response) {
            // console.warn('Can\'t set token without passing a value');
            return;
        }
        let token;
        if (typeof response === 'string') {
            token = response;
        }
        else {
            token = this.config.options.resolveToken(response, this.config.options);
        }
        if (token) {
            const expDate = this.getExpirationDate(token);
            this.storage.set(this.tokenName, token, expDate ? expDate.toUTCString() : '');
        }
    }
    removeToken() {
        this.storage.remove(this.tokenName);
    }
    isAuthenticated(token = this.getToken()) {
        // a token is present
        if (token) {
            // token with a valid JWT format XXX.YYY.ZZZ
            if (token.split('.').length === 3) {
                // could be a valid JWT or an access token with the same format
                try {
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
                    // jwt with an optional expiration claims
                    if (exp) {
                        const isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                        if (isExpired) {
                            // fail: Expired token
                            this.storage.remove(this.tokenName);
                            return false;
                        }
                        else {
                            // pass: Non-expired token
                            return true;
                        }
                    }
                }
                catch (e) {
                    // pass: Non-JWT token that looks like JWT
                    return true;
                }
            }
            // pass: All other tokens
            return true;
        }
        // lail: No token at all
        return false;
    }
    getExpirationDate(token = this.getToken()) {
        const payload = this.getPayload(token);
        if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            const date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
        }
        return null;
    }
    logout() {
        return new Observable((observer) => {
            this.storage.remove(this.tokenName);
            observer.next();
            observer.complete();
        });
    }
    setStorageType(type) {
        return this.storage.updateStorageType(type);
    }
    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map
            .call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''));
    }
}
SharedService.ɵfac = function SharedService_Factory(t) { return new (t || SharedService)(ɵngcc0.ɵɵinject(StorageService), ɵngcc0.ɵɵinject(ConfigService)); };
SharedService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: SharedService, factory: SharedService.ɵfac });
SharedService.ctorParameters = () => [
    { type: StorageService },
    { type: ConfigService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SharedService, [{
        type: Injectable
    }], function () { return [{ type: StorageService }, { type: ConfigService }]; }, null); })();

class JwtInterceptor {
    constructor(shared, config) {
        this.shared = shared;
        this.config = config;
    }
    intercept(req, next) {
        const { authHeader, authToken } = this.config.options;
        const token = this.shared.getToken();
        const isAuthenticated = this.shared.isAuthenticated();
        const newReq = isAuthenticated && !req.headers.has(authHeader) ? req.clone({ setHeaders: { [authHeader]: `${authToken} ${token}` } }) : req;
        return next.handle(newReq);
    }
}
JwtInterceptor.ɵfac = function JwtInterceptor_Factory(t) { return new (t || JwtInterceptor)(ɵngcc0.ɵɵinject(SharedService), ɵngcc0.ɵɵinject(ConfigService)); };
JwtInterceptor.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: JwtInterceptor, factory: JwtInterceptor.ɵfac });
JwtInterceptor.ctorParameters = () => [
    { type: SharedService },
    { type: ConfigService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(JwtInterceptor, [{
        type: Injectable
    }], function () { return [{ type: SharedService }, { type: ConfigService }]; }, null); })();

class PopupService {
    open(url, options, isCordova = isCordovaApp()) {
        const stringifiedOptions = stringifyOptions(this.prepareOptions(options.popupOptions));
        const windowName = isCordova ? '_blank' : options.name;
        const popupWindow = typeof window !== 'undefined' ? window.open(url, windowName, stringifiedOptions) : null;
        if (popupWindow) {
            if (popupWindow.focus) {
                popupWindow.focus();
            }
            return of(popupWindow);
        }
        return throwError(new Error('Popup was not created'));
    }
    waitForClose(popupWindow, isCordova = isCordovaApp(), redirectUri = getWindowOrigin()) {
        return isCordova ? this.eventListener(popupWindow, redirectUri) : this.pollPopup(popupWindow, redirectUri);
    }
    eventListener(popupWindow, redirectUri = getWindowOrigin()) {
        if (!popupWindow) {
            return throwError(new Error('Popup was not created'));
        }
        return merge(fromEvent(popupWindow, 'exit').pipe(delay(100), map(() => {
            throw new Error('Authentication Canceled');
        })), fromEvent(popupWindow, 'loadstart')).pipe(switchMap((event) => {
            if (!popupWindow || popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return EMPTY;
            }
            const parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                const queryParams = parser.search.substring(1).replace(/\/$/, '');
                const hashParams = parser.hash.substring(1).replace(/\/$/, '');
                const hash = parseQueryString(hashParams);
                const qs = parseQueryString(queryParams);
                const allParams = Object.assign(Object.assign({}, qs), hash);
                popupWindow.close();
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return EMPTY;
        }), take(1));
    }
    pollPopup(popupWindow, redirectUri = getWindowOrigin()) {
        return interval(50).pipe(switchMap(() => {
            if (!popupWindow || popupWindow.closed) {
                return throwError(new Error('Authentication Canceled'));
            }
            const popupWindowOrigin = getWindowOrigin(popupWindow);
            if (popupWindowOrigin &&
                (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
                (popupWindow.location.search || popupWindow.location.hash)) {
                const queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                const hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                const hash = parseQueryString(hashParams);
                const qs = parseQueryString(queryParams);
                popupWindow.close();
                const allParams = Object.assign(Object.assign({}, qs), hash);
                if (allParams.error) {
                    return throwError(allParams.error);
                }
                else {
                    return of(allParams);
                }
            }
            return EMPTY;
        }), take(1));
    }
    prepareOptions(options) {
        options = options || {};
        const width = options.width || 500;
        const height = options.height || 500;
        return Object.assign({ width,
            height, left: window.screenX + (window.outerWidth - width) / 2, top: window.screenY + (window.outerHeight - height) / 2.5, toolbar: options.visibleToolbar ? 'yes' : 'no' }, options);
    }
}
PopupService.ɵfac = function PopupService_Factory(t) { return new (t || PopupService)(); };
PopupService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: PopupService, factory: PopupService.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(PopupService, [{
        type: Injectable
    }], null, null); })();

class LocalService {
    constructor(http, shared, config) {
        this.http = http;
        this.shared = shared;
        this.config = config;
    }
    login(user, url) {
        return this.http
            .post(url || joinUrl(this.config.options.baseUrl, this.config.options.loginUrl), user)
            .pipe(tap(data => this.shared.setToken(data)));
    }
    signup(user, url) {
        return this.http.post(url || joinUrl(this.config.options.baseUrl, this.config.options.signupUrl), user);
    }
}
LocalService.ɵfac = function LocalService_Factory(t) { return new (t || LocalService)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(SharedService), ɵngcc0.ɵɵinject(ConfigService)); };
LocalService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: LocalService, factory: LocalService.ɵfac });
LocalService.ctorParameters = () => [
    { type: HttpClient },
    { type: SharedService },
    { type: ConfigService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LocalService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: SharedService }, { type: ConfigService }]; }, null); })();

class AuthService {
    constructor(shared, local, oauth) {
        this.shared = shared;
        this.local = local;
        this.oauth = oauth;
    }
    login(user, url) {
        return this.local.login(user, url);
    }
    signup(user, url) {
        return this.local.signup(user, url);
    }
    logout() {
        return this.shared.logout();
    }
    authenticate(name, userData) {
        return this.oauth.authenticate(name, userData);
    }
    link(name, userData) {
        return this.oauth.authenticate(name, userData);
    }
    unlink(provider, url) {
        return this.oauth.unlink(provider, url);
    }
    isAuthenticated() {
        return this.shared.isAuthenticated();
    }
    getToken() {
        return this.shared.getToken();
    }
    setToken(token) {
        this.shared.setToken(token);
    }
    removeToken() {
        this.shared.removeToken();
    }
    getPayload() {
        return this.shared.getPayload();
    }
    setStorageType(type) {
        return this.shared.setStorageType(type);
    }
    getExpirationDate() {
        return this.shared.getExpirationDate();
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(ɵngcc0.ɵɵinject(SharedService), ɵngcc0.ɵɵinject(LocalService), ɵngcc0.ɵɵinject(OauthService)); };
AuthService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac });
AuthService.ctorParameters = () => [
    { type: SharedService },
    { type: LocalService },
    { type: OauthService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AuthService, [{
        type: Injectable
    }], function () { return [{ type: SharedService }, { type: LocalService }, { type: OauthService }]; }, null); })();

class RedirectService {
    constructor(authService, storage, oauth, shared) {
        this.authService = authService;
        this.storage = storage;
        this.oauth = oauth;
        this.shared = shared;
    }
    go(url, options, authorizationData, userData) {
        if (window) {
            const qs = buildQueryString(flatten(staticify({ options, authorizationData, userData })));
            this.storage.set('ng2-ui-auth-REDIRECT', qs, '');
            window.open(url, '_self');
            return of({});
        }
        return throwError('Failed to redirect');
    }
    isRedirect() {
        const options = this.storage.get('ng2-ui-auth-REDIRECT');
        if (options) {
            const w = window;
            const windowOrigin = getWindowOrigin(w);
            const optionsObject = expand(parseQueryString(options));
            const redirectUri = optionsObject.redirectUri;
            return redirectUri != null && windowOrigin != null
                && (redirectUri.indexOf(windowOrigin) === 0 || windowOrigin.indexOf(redirectUri) === 0)
                && (w.location.search != null || w.location.hash != null);
        }
    }
    handleRedirect() {
        const options = this.storage.get('ng2-ui-auth-REDIRECT');
        if (options) {
            const w = window;
            const windowOrigin = getWindowOrigin(w);
            const data = expand(parseQueryString(options));
            const optionsObject = data['options'];
            const authorizationData = data['authorizationData'];
            const userData = data['userData'];
            const redirectUri = optionsObject.redirectUri;
            if (redirectUri != null && windowOrigin != null
                && (redirectUri.indexOf(windowOrigin) === 0 || windowOrigin.indexOf(redirectUri) === 0)
                && (w.location.search != null || w.location.hash != null)) {
                const queryParams = w.location.search.substring(1).replace(/\/$/, '');
                const hashParams = w.location.hash.substring(1).replace(/[\/$]/, '');
                const hash = parseQueryString(hashParams);
                const qs = parseQueryString(queryParams);
                const allParams = Object.assign(Object.assign({}, qs), hash);
                if (allParams.error) {
                    throw throwError(allParams.error);
                }
                else {
                    return this.oauth.getProvider(optionsObject)
                        .exchangeForToken(optionsObject, authorizationData, allParams, userData)
                        .pipe(tap(response => {
                        this.shared.setToken(response);
                        this.storage.remove('ng2-ui-auth-REDIRECT');
                    }));
                }
            }
            return throwError('Not at valid redirect URI');
        }
        return throwError('No stored options for redirect');
    }
}
RedirectService.ɵfac = function RedirectService_Factory(t) { return new (t || RedirectService)(ɵngcc0.ɵɵinject(AuthService), ɵngcc0.ɵɵinject(StorageService), ɵngcc0.ɵɵinject(OauthService), ɵngcc0.ɵɵinject(SharedService)); };
RedirectService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: RedirectService, factory: RedirectService.ɵfac });
RedirectService.ctorParameters = () => [
    { type: AuthService },
    { type: StorageService },
    { type: OauthService },
    { type: SharedService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RedirectService, [{
        type: Injectable
    }], function () { return [{ type: AuthService }, { type: StorageService }, { type: OauthService }, { type: SharedService }]; }, null); })();

class Oauth1Service {
    constructor(http, popup, config, redirect) {
        this.http = http;
        this.popup = popup;
        this.config = config;
        this.redirect = redirect;
    }
    open(oauthOptions, userData) {
        const serverUrl = this.config.options.baseUrl ? joinUrl(this.config.options.baseUrl, oauthOptions.url) : oauthOptions.url;
        if (oauthOptions.doRedirect) {
            return this.http.post(serverUrl, oauthOptions)
                .pipe(mergeMap(authorizationData => this.redirect.go([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'), oauthOptions, authorizationData, userData)));
        }
        return this.popup.open('about:blank', oauthOptions, this.config.options.cordova).pipe(switchMap(popupWindow => this.http.post(serverUrl, oauthOptions).pipe(tap(authorizationData => popupWindow
            ? popupWindow.location.replace([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'))
            : undefined), switchMap(authorizationData => this.popup
            .waitForClose(popupWindow, this.config.options.cordova, oauthOptions.redirectUri)
            .pipe(map(oauthData => ({ authorizationData, oauthData })))))), switchMap(({ authorizationData, oauthData }) => this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData)));
    }
    exchangeForToken(oauthOptions, authorizationData, oauthData, userData) {
        const body = { oauthOptions, authorizationData, oauthData, userData };
        const { withCredentials, baseUrl } = this.config.options;
        const { method = 'POST', url } = oauthOptions;
        const exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body, withCredentials });
    }
}
Oauth1Service.ɵfac = function Oauth1Service_Factory(t) { return new (t || Oauth1Service)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(PopupService), ɵngcc0.ɵɵinject(ConfigService), ɵngcc0.ɵɵinject(RedirectService)); };
Oauth1Service.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: Oauth1Service, factory: Oauth1Service.ɵfac });
Oauth1Service.ctorParameters = () => [
    { type: HttpClient },
    { type: PopupService },
    { type: ConfigService },
    { type: RedirectService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Oauth1Service, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: PopupService }, { type: ConfigService }, { type: RedirectService }]; }, null); })();

class Oauth2Service {
    constructor(http, popup, config, redirect) {
        this.http = http;
        this.popup = popup;
        this.config = config;
        this.redirect = redirect;
    }
    open(oauthOptions, userData) {
        const authorizationData = this.getAuthorizationData(oauthOptions);
        const url = [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?');
        if (oauthOptions.doRedirect) {
            return this.redirect.go(url, oauthOptions, authorizationData, userData);
        }
        return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(switchMap((window) => this.popup.waitForClose(window, this.config.options.cordova, oauthOptions.redirectUri)), switchMap((oauthData) => {
            // when no server URL provided, return popup params as-is.
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (oauthOptions.responseType === 'token' || !oauthOptions.url) {
                return of(expand(oauthData));
            }
            if (oauthData.state && oauthData.state !== authorizationData.state) {
                return throwError('OAuth "state" mismatch');
            }
            return this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    }
    exchangeForToken(options, authorizationData, oauthData, userData) {
        const body = { authorizationData, oauthData, userData };
        const { baseUrl, withCredentials } = this.config.options;
        const { url, method = 'POST' } = options;
        const exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body, withCredentials });
    }
    getAuthorizationData(options) {
        const { responseType = 'code', clientId, redirectUri = getWindowOrigin() || '', scopeDelimiter = ',', scope, state, additionalUrlParams } = options;
        const resolvedState = typeof state === 'function' ? state() : state;
        return [
            ['response_type', responseType],
            ['client_id', clientId],
            ['redirect_uri', redirectUri],
            ...(state ? [['state', resolvedState]] : []),
            ...(scope ? [['scope', scope.join(scopeDelimiter)]] : []),
            ...(additionalUrlParams
                ? Object.keys(additionalUrlParams).map(key => {
                    const value = additionalUrlParams[key];
                    if (typeof value === 'string') {
                        return [key, value];
                    }
                    else if (typeof value === 'function') {
                        return [key, value()];
                    }
                    else if (value === null) {
                        return [key, ''];
                    }
                    return ['', ''];
                })
                : [])
        ]
            .filter(_ => !!_[0])
            .reduce((acc, next) => (Object.assign(Object.assign({}, acc), { [next[0]]: next[1] })), {});
    }
}
Oauth2Service.ɵfac = function Oauth2Service_Factory(t) { return new (t || Oauth2Service)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(PopupService), ɵngcc0.ɵɵinject(ConfigService), ɵngcc0.ɵɵinject(RedirectService)); };
Oauth2Service.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: Oauth2Service, factory: Oauth2Service.ɵfac });
Oauth2Service.ctorParameters = () => [
    { type: HttpClient },
    { type: PopupService },
    { type: ConfigService },
    { type: RedirectService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Oauth2Service, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: PopupService }, { type: ConfigService }, { type: RedirectService }]; }, null); })();

class OauthService {
    constructor(http, shared, config, popup) {
        this.http = http;
        this.shared = shared;
        this.config = config;
        this.popup = popup;
        this.depProviders = [
            { provide: HttpClient, useValue: this.http },
            { provide: PopupService, useValue: this.popup },
            { provide: ConfigService, useValue: this.config }
        ];
        this.deps = [HttpClient, PopupService, ConfigService];
    }
    authenticate(name, userData) {
        const provider = this.getProvider(name);
        return provider.open(this.config.options.providers[name], userData || {}).pipe(tap(response => {
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (this.config.options.providers[name].url) {
                this.shared.setToken(response);
            }
        }));
    }
    getProvider(id) {
        const type = typeof (id) === 'string' ? this.config.options.providers[id].oauthType : id['oauthType'];
        const provider = type === '1.0'
            ? Injector.create([...this.depProviders, { provide: Oauth1Service, deps: this.deps }]).get(Oauth1Service)
            : Injector.create([...this.depProviders, { provide: Oauth2Service, deps: this.deps }]).get(Oauth2Service);
        return provider;
    }
    unlink(provider, url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl), method = 'POST') {
        return this.http.request(method, url, { body: { provider } });
    }
}
OauthService.ɵfac = function OauthService_Factory(t) { return new (t || OauthService)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(SharedService), ɵngcc0.ɵɵinject(ConfigService), ɵngcc0.ɵɵinject(PopupService)); };
OauthService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: OauthService, factory: OauthService.ɵfac });
OauthService.ctorParameters = () => [
    { type: HttpClient },
    { type: SharedService },
    { type: ConfigService },
    { type: PopupService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(OauthService, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: SharedService }, { type: ConfigService }, { type: PopupService }]; }, null); })();

class RedirectDirective {
    constructor(redirect) {
        this.redirect = redirect;
        this.onLogin = new EventEmitter();
        this.onLoginError = new EventEmitter();
    }
    ngOnInit() {
        if (this.redirect.isRedirect()) {
            this.redirect.handleRedirect()
                .subscribe({
                next: value => this.onLogin.emit(value),
                error: err => this.onLoginError.emit(err)
            });
        }
    }
}
RedirectDirective.ɵfac = function RedirectDirective_Factory(t) { return new (t || RedirectDirective)(ɵngcc0.ɵɵdirectiveInject(RedirectService)); };
RedirectDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: RedirectDirective, selectors: [["", "authRedirect", ""]], outputs: { onLogin: "onLogin", onLoginError: "onLoginError" } });
RedirectDirective.ctorParameters = () => [
    { type: RedirectService }
];
RedirectDirective.propDecorators = {
    onLogin: [{ type: Output }],
    onLoginError: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RedirectDirective, [{
        type: Directive,
        args: [{
                selector: '[authRedirect]'
            }]
    }], function () { return [{ type: RedirectService }]; }, { onLogin: [{
            type: Output
        }], onLoginError: [{
            type: Output
        }] }); })();

class Ng2UiAuthModule {
    static forRoot(configOptions, defaultJwtInterceptor = true) {
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                ...(configOptions ? [{ provide: CONFIG_OPTIONS, useValue: configOptions }] : []),
                { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS] },
                { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                { provide: LocalService, useClass: LocalService, deps: [HttpClient, SharedService, ConfigService] },
                { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                { provide: OauthService, useClass: OauthService, deps: [HttpClient, SharedService, ConfigService, PopupService] },
                { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] },
                ...(defaultJwtInterceptor
                    ? [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService] }]
                    : [])
            ]
        };
    }
}
Ng2UiAuthModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: Ng2UiAuthModule });
Ng2UiAuthModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function Ng2UiAuthModule_Factory(t) { return new (t || Ng2UiAuthModule)(); }, imports: [[HttpClientModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(Ng2UiAuthModule, { declarations: function () { return [RedirectDirective]; }, imports: function () { return [HttpClientModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Ng2UiAuthModule, [{
        type: NgModule,
        args: [{
                imports: [HttpClientModule],
                declarations: [RedirectDirective],
                exports: []
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { AuthService, BrowserStorageService, CONFIG_OPTIONS, ConfigService, JwtInterceptor, LocalService, Ng2UiAuthModule, Oauth1Service, Oauth2Service, OauthService, PopupService, SharedService, StorageService, StorageType, RedirectDirective as ɵb, RedirectService as ɵc };

//# sourceMappingURL=ng2-ui-auth.js.map