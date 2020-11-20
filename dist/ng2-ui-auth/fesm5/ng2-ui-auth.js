import { __assign, __decorate, __param, __metadata, __extends, __spread } from 'tslib';
import { InjectionToken, Inject, Injectable, Injector, NgModule } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Observable, of, empty, merge, fromEvent, interval, throwError } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';

/**
 * Created by Ron on 17/12/2015.
 */
function joinUrl(baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
    }
    var joined = [baseUrl, url].join('/');
    return joined
        .replace(/[\/]+/g, '/')
        .replace(/\/\?/g, '?')
        .replace(/\/\#/g, '#')
        .replace(/\:\//g, '://');
}
function buildQueryString(obj) {
    return Object.keys(obj)
        .map(function (key) { return (!!obj[key] ? encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) : key); })
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
            return w.location.protocol + "//" + w.location.hostname + (w.location.port ? ':' + w.location.port : '');
        }
        return w.location.origin;
    }
    catch (error) {
        return null;
        // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // error instanceof DOMException && error.name === 'SecurityError'
    }
}

var ɵ0 = function () {
    return encodeURIComponent(Math.random()
        .toString(36)
        .substr(2));
}, ɵ1 = function () {
    return encodeURIComponent(Math.random()
        .toString(36)
        .substr(2));
};
var defaultProviders = {
    facebook: {
        name: 'facebook',
        url: '/auth/facebook',
        redirectUri: getWindowOrigin() + "/",
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
        redirectUri: getWindowOrigin() + "/",
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

var CONFIG_OPTIONS = new InjectionToken('config.options');
var ConfigService = /** @class */ (function () {
    function ConfigService(options) {
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
            resolveToken: function (response, config) {
                var accessToken = response && (response.access_token || response.token || response.data);
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
                var tokenRootData = config.tokenRoot &&
                    config.tokenRoot.split('.').reduce(function (o, x) {
                        return o[x];
                    }, accessToken);
                var token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
                if (token) {
                    return token;
                }
                // const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
                // console.warn('Expecting a token named "' + tokenPath);
                return null;
            },
            providers: {}
        };
        this.options = __assign(__assign({}, this.options), options);
        this.mergeWithDefaultProviders();
    }
    ConfigService.prototype.updateProviders = function (providers) {
        this.options.providers = __assign(__assign({}, (this.options.providers || {})), providers);
        this.mergeWithDefaultProviders();
    };
    ConfigService.prototype.mergeWithDefaultProviders = function () {
        var _this = this;
        Object.keys(this.options.providers).forEach(function (key) {
            if (key in defaultProviders) {
                _this.options.providers[key] = __assign(__assign({}, defaultProviders[key]), _this.options.providers[key]);
            }
        });
    };
    ConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [CONFIG_OPTIONS,] }] }
    ]; };
    ConfigService = __decorate([
        Injectable(),
        __param(0, Inject(CONFIG_OPTIONS)),
        __metadata("design:paramtypes", [Object])
    ], ConfigService);
    return ConfigService;
}());

var StorageService = /** @class */ (function () {
    function StorageService() {
    }
    return StorageService;
}());

var BrowserStorageService = /** @class */ (function (_super) {
    __extends(BrowserStorageService, _super);
    function BrowserStorageService(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.store = {};
        _this.storageType = StorageType.MEMORY;
        if (!_this.updateStorageType(config.options.storageType)) {
            console.warn(config.options.storageType + ' is not available.');
        }
        return _this;
    }
    BrowserStorageService.prototype.updateStorageType = function (storageType) {
        var isStorageAvailable = this.checkIsStorageAvailable(storageType);
        if (!isStorageAvailable) {
            return false;
        }
        this.storageType = storageType;
        return true;
    };
    BrowserStorageService.prototype.get = function (key) {
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
    };
    BrowserStorageService.prototype.set = function (key, value, date) {
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
    };
    BrowserStorageService.prototype.remove = function (key) {
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
    };
    BrowserStorageService.prototype.checkIsStorageAvailable = function (storageType) {
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
    };
    BrowserStorageService.prototype.isWindowStorageAvailable = function (storageType) {
        try {
            var supported = window && storageType in window && window[storageType] !== null;
            if (supported) {
                var key = Math.random()
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
    };
    BrowserStorageService.prototype.isCookieStorageAvailable = function () {
        try {
            var supported = document && 'cookie' in document;
            if (supported) {
                var key = Math.random()
                    .toString(36)
                    .substring(7);
                this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                var value = this.getCookie(key);
                this.removeCookie(key);
                return value === 'test';
            }
            return false;
        }
        catch (e) {
            return false;
        }
    };
    BrowserStorageService.prototype.setCookie = function (key, value, expires, path) {
        if (expires === void 0) { expires = ''; }
        if (path === void 0) { path = '/'; }
        document.cookie = key + "=" + value + (expires ? "; expires=" + expires : '') + "; path=" + path;
    };
    BrowserStorageService.prototype.removeCookie = function (key, path) {
        if (path === void 0) { path = '/'; }
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    };
    BrowserStorageService.prototype.getCookie = function (key) {
        return document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"), '$1');
    };
    BrowserStorageService.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    BrowserStorageService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ConfigService])
    ], BrowserStorageService);
    return BrowserStorageService;
}(StorageService));

var SharedService = /** @class */ (function () {
    function SharedService(storage, config) {
        this.storage = storage;
        this.config = config;
        this.tokenName = this.config.options.tokenPrefix
            ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
            : this.config.options.tokenName;
    }
    SharedService.prototype.getToken = function () {
        return this.storage.get(this.tokenName);
    };
    SharedService.prototype.getPayload = function (token) {
        if (token === void 0) { token = this.getToken(); }
        if (token && token.split('.').length === 3) {
            try {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(this.b64DecodeUnicode(base64));
            }
            catch (e) {
                return undefined;
            }
        }
    };
    SharedService.prototype.setToken = function (response) {
        if (!response) {
            // console.warn('Can\'t set token without passing a value');
            return;
        }
        var token;
        if (typeof response === 'string') {
            token = response;
        }
        else {
            token = this.config.options.resolveToken(response, this.config.options);
        }
        if (token) {
            var expDate = this.getExpirationDate(token);
            this.storage.set(this.tokenName, token, expDate ? expDate.toUTCString() : '');
        }
    };
    SharedService.prototype.removeToken = function () {
        this.storage.remove(this.tokenName);
    };
    SharedService.prototype.isAuthenticated = function (token) {
        if (token === void 0) { token = this.getToken(); }
        // a token is present
        if (token) {
            // token with a valid JWT format XXX.YYY.ZZZ
            if (token.split('.').length === 3) {
                // could be a valid JWT or an access token with the same format
                try {
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
                    // jwt with an optional expiration claims
                    if (exp) {
                        var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
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
    };
    SharedService.prototype.getExpirationDate = function (token) {
        if (token === void 0) { token = this.getToken(); }
        var payload = this.getPayload(token);
        if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            var date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
        }
        return null;
    };
    SharedService.prototype.logout = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.storage.remove(_this.tokenName);
            observer.next();
            observer.complete();
        });
    };
    SharedService.prototype.setStorageType = function (type) {
        return this.storage.updateStorageType(type);
    };
    SharedService.prototype.b64DecodeUnicode = function (str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join(''));
    };
    SharedService.ctorParameters = function () { return [
        { type: StorageService },
        { type: ConfigService }
    ]; };
    SharedService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [StorageService, ConfigService])
    ], SharedService);
    return SharedService;
}());

var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(shared, config) {
        this.shared = shared;
        this.config = config;
    }
    JwtInterceptor.prototype.intercept = function (req, next) {
        var _a;
        var _b = this.config.options, authHeader = _b.authHeader, authToken = _b.authToken;
        var token = this.shared.getToken();
        var isAuthenticated = this.shared.isAuthenticated();
        var newReq = isAuthenticated && !req.headers.has(authHeader) ? req.clone({ setHeaders: (_a = {}, _a[authHeader] = authToken + " " + token, _a) }) : req;
        return next.handle(newReq);
    };
    JwtInterceptor.ctorParameters = function () { return [
        { type: SharedService },
        { type: ConfigService }
    ]; };
    JwtInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [SharedService, ConfigService])
    ], JwtInterceptor);
    return JwtInterceptor;
}());

var PopupService = /** @class */ (function () {
    function PopupService() {
    }
    PopupService.prototype.open = function (url, options, cordova) {
        if (cordova === void 0) { cordova = this.isCordovaApp(); }
        var stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
        var windowName = cordova ? '_blank' : options.name;
        var popupWindow = typeof window !== 'undefined' ? window.open(url, windowName, stringifiedOptions) : null;
        if (popupWindow) {
            if (popupWindow.focus) {
                popupWindow.focus();
            }
            return of(popupWindow);
        }
        return empty();
    };
    PopupService.prototype.waitForClose = function (popupWindow, cordova, redirectUri) {
        if (cordova === void 0) { cordova = this.isCordovaApp(); }
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        return cordova ? this.eventListener(popupWindow, redirectUri) : this.pollPopup(popupWindow, redirectUri);
    };
    PopupService.prototype.eventListener = function (popupWindow, redirectUri) {
        var _this = this;
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        if (!popupWindow) {
            throw new Error('Popup was not created');
        }
        return merge(fromEvent(popupWindow, 'exit').pipe(delay(100), map(function () {
            throw new Error('Authentication Canceled');
        })), fromEvent(popupWindow, 'loadstart')).pipe(switchMap(function (event) {
            if (!popupWindow || popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return empty();
            }
            var parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                var queryParams = parser.search.substring(1).replace(/\/$/, '');
                var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                var hash = _this.parseQueryString(hashParams);
                var qs = _this.parseQueryString(queryParams);
                var allParams = __assign(__assign({}, qs), hash);
                popupWindow.close();
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return empty();
        }), take(1));
    };
    PopupService.prototype.pollPopup = function (popupWindow, redirectUri) {
        var _this = this;
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        return interval(50).pipe(switchMap(function () {
            if (!popupWindow || popupWindow.closed) {
                return throwError(new Error('Authentication Canceled'));
            }
            var popupWindowOrigin = getWindowOrigin(popupWindow);
            if (popupWindowOrigin &&
                (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
                (popupWindow.location.search || popupWindow.location.hash)) {
                var queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                var hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                var hash = _this.parseQueryString(hashParams);
                var qs = _this.parseQueryString(queryParams);
                popupWindow.close();
                var allParams = __assign(__assign({}, qs), hash);
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return empty();
        }), take(1));
    };
    PopupService.prototype.prepareOptions = function (options) {
        options = options || {};
        var width = options.width || 500;
        var height = options.height || 500;
        return __assign({ width: width,
            height: height, left: window.screenX + (window.outerWidth - width) / 2, top: window.screenY + (window.outerHeight - height) / 2.5, toolbar: options.visibleToolbar ? 'yes' : 'no' }, options);
    };
    PopupService.prototype.stringifyOptions = function (options) {
        return Object.keys(options)
            .map(function (key) { return (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]); })
            .join(',');
    };
    PopupService.prototype.parseQueryString = function (joinedKeyValue) {
        var key;
        var value;
        return joinedKeyValue.split('&').reduce(function (obj, keyValue) {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }, {});
    };
    PopupService.prototype.isCordovaApp = function () {
        return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
    };
    PopupService = __decorate([
        Injectable()
    ], PopupService);
    return PopupService;
}());

var Oauth1Service = /** @class */ (function () {
    function Oauth1Service(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    Oauth1Service.prototype.open = function (oauthOptions, userData) {
        var _this = this;
        var serverUrl = this.config.options.baseUrl ? joinUrl(this.config.options.baseUrl, oauthOptions.url) : oauthOptions.url;
        return this.popup.open('about:blank', oauthOptions, this.config.options.cordova).pipe(switchMap(function (popupWindow) {
            return _this.http.post(serverUrl, oauthOptions).pipe(tap(function (authorizationData) {
                return popupWindow
                    ? popupWindow.location.replace([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'))
                    : undefined;
            }), switchMap(function (authorizationData) {
                return _this.popup
                    .waitForClose(popupWindow, _this.config.options.cordova, oauthOptions.redirectUri)
                    .pipe(map(function (oauthData) { return ({ authorizationData: authorizationData, oauthData: oauthData }); }));
            }));
        }), switchMap(function (_a) {
            var authorizationData = _a.authorizationData, oauthData = _a.oauthData;
            return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    };
    Oauth1Service.prototype.exchangeForToken = function (oauthOptions, authorizationData, oauthData, userData) {
        var body = { oauthOptions: oauthOptions, authorizationData: authorizationData, oauthData: oauthData, userData: userData };
        var _a = this.config.options, withCredentials = _a.withCredentials, baseUrl = _a.baseUrl;
        var _b = oauthOptions.method, method = _b === void 0 ? 'POST' : _b, url = oauthOptions.url;
        var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
    };
    Oauth1Service.ctorParameters = function () { return [
        { type: HttpClient },
        { type: PopupService },
        { type: ConfigService }
    ]; };
    Oauth1Service = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, PopupService, ConfigService])
    ], Oauth1Service);
    return Oauth1Service;
}());

var Oauth2Service = /** @class */ (function () {
    function Oauth2Service(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    Oauth2Service.prototype.open = function (oauthOptions, userData) {
        var _this = this;
        var authorizationData = this.getAuthorizationData(oauthOptions);
        var url = [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?');
        return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(switchMap(function (window) {
            return window ? _this.popup.waitForClose(window, _this.config.options.cordova, oauthOptions.redirectUri) : empty();
        }), switchMap(function (oauthData) {
            // when no server URL provided, return popup params as-is.
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (oauthOptions.responseType === 'token' || !oauthOptions.url) {
                return of(oauthData);
            }
            if (oauthData.state && oauthData.state !== authorizationData.state) {
                throw new Error('OAuth "state" mismatch');
            }
            return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    };
    Oauth2Service.prototype.exchangeForToken = function (options, authorizationData, oauthData, userData) {
        var body = { authorizationData: authorizationData, oauthData: oauthData, userData: userData };
        var _a = this.config.options, baseUrl = _a.baseUrl, withCredentials = _a.withCredentials;
        var url = options.url, _b = options.method, method = _b === void 0 ? 'POST' : _b;
        var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
    };
    Oauth2Service.prototype.getAuthorizationData = function (options) {
        var _a = options.responseType, responseType = _a === void 0 ? 'code' : _a, clientId = options.clientId, _b = options.redirectUri, redirectUri = _b === void 0 ? getWindowOrigin() || '' : _b, _c = options.scopeDelimiter, scopeDelimiter = _c === void 0 ? ',' : _c, scope = options.scope, state = options.state, additionalUrlParams = options.additionalUrlParams;
        var resolvedState = typeof state === 'function' ? state() : state;
        return __spread([
            ['response_type', responseType],
            ['client_id', clientId],
            ['redirect_uri', redirectUri]
        ], (state ? [['state', resolvedState]] : []), (scope ? [['scope', scope.join(scopeDelimiter)]] : []), (additionalUrlParams
            ? Object.keys(additionalUrlParams).map(function (key) {
                var value = additionalUrlParams[key];
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
            : [])).filter(function (_) { return !!_[0]; })
            .reduce(function (acc, next) {
            var _a;
            return (__assign(__assign({}, acc), (_a = {}, _a[next[0]] = next[1], _a)));
        }, {});
    };
    Oauth2Service.ctorParameters = function () { return [
        { type: HttpClient },
        { type: PopupService },
        { type: ConfigService }
    ]; };
    Oauth2Service = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, PopupService, ConfigService])
    ], Oauth2Service);
    return Oauth2Service;
}());

var OauthService = /** @class */ (function () {
    function OauthService(http, shared, config, popup) {
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
    OauthService.prototype.authenticate = function (name, userData) {
        var _this = this;
        var provider = this.config.options.providers[name].oauthType === '1.0'
            ? Injector.create(__spread(this.depProviders, [{ provide: Oauth1Service, deps: this.deps }])).get(Oauth1Service)
            : Injector.create(__spread(this.depProviders, [{ provide: Oauth2Service, deps: this.deps }])).get(Oauth2Service);
        return provider.open(this.config.options.providers[name], userData || {}).pipe(tap(function (response) {
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (_this.config.options.providers[name].url) {
                _this.shared.setToken(response);
            }
        }));
    };
    OauthService.prototype.unlink = function (provider, url, method) {
        if (url === void 0) { url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl); }
        if (method === void 0) { method = 'POST'; }
        return this.http.request(method, url, { body: { provider: provider } });
    };
    OauthService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: SharedService },
        { type: ConfigService },
        { type: PopupService }
    ]; };
    OauthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, SharedService, ConfigService, PopupService])
    ], OauthService);
    return OauthService;
}());

var LocalService = /** @class */ (function () {
    function LocalService(http, shared, config) {
        this.http = http;
        this.shared = shared;
        this.config = config;
    }
    LocalService.prototype.login = function (user, url) {
        var _this = this;
        return this.http
            .post(url || joinUrl(this.config.options.baseUrl, this.config.options.loginUrl), user)
            .pipe(tap(function (data) { return _this.shared.setToken(data); }));
    };
    LocalService.prototype.signup = function (user, url) {
        return this.http.post(url || joinUrl(this.config.options.baseUrl, this.config.options.signupUrl), user);
    };
    LocalService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: SharedService },
        { type: ConfigService }
    ]; };
    LocalService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, SharedService, ConfigService])
    ], LocalService);
    return LocalService;
}());

var AuthService = /** @class */ (function () {
    function AuthService(shared, local, oauth) {
        this.shared = shared;
        this.local = local;
        this.oauth = oauth;
    }
    AuthService.prototype.login = function (user, url) {
        return this.local.login(user, url);
    };
    AuthService.prototype.signup = function (user, url) {
        return this.local.signup(user, url);
    };
    AuthService.prototype.logout = function () {
        return this.shared.logout();
    };
    AuthService.prototype.authenticate = function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    AuthService.prototype.link = function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    AuthService.prototype.unlink = function (provider, url) {
        return this.oauth.unlink(provider, url);
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.shared.isAuthenticated();
    };
    AuthService.prototype.getToken = function () {
        return this.shared.getToken();
    };
    AuthService.prototype.setToken = function (token) {
        this.shared.setToken(token);
    };
    AuthService.prototype.removeToken = function () {
        this.shared.removeToken();
    };
    AuthService.prototype.getPayload = function () {
        return this.shared.getPayload();
    };
    AuthService.prototype.setStorageType = function (type) {
        return this.shared.setStorageType(type);
    };
    AuthService.prototype.getExpirationDate = function () {
        return this.shared.getExpirationDate();
    };
    AuthService.ctorParameters = function () { return [
        { type: SharedService },
        { type: LocalService },
        { type: OauthService }
    ]; };
    AuthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [SharedService, LocalService, OauthService])
    ], AuthService);
    return AuthService;
}());

var Ng2UiAuthModule = /** @class */ (function () {
    function Ng2UiAuthModule() {
    }
    Ng2UiAuthModule_1 = Ng2UiAuthModule;
    Ng2UiAuthModule.forRoot = function (configOptions, defaultJwtInterceptor) {
        if (defaultJwtInterceptor === void 0) { defaultJwtInterceptor = true; }
        return {
            ngModule: Ng2UiAuthModule_1,
            providers: __spread((configOptions ? [{ provide: CONFIG_OPTIONS, useValue: configOptions }] : []), [
                { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS] },
                { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                { provide: LocalService, useClass: LocalService, deps: [HttpClient, SharedService, ConfigService] },
                { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                { provide: OauthService, useClass: OauthService, deps: [HttpClient, SharedService, ConfigService, PopupService] },
                { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] }
            ], (defaultJwtInterceptor
                ? [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService] }]
                : []))
        };
    };
    var Ng2UiAuthModule_1;
    Ng2UiAuthModule = Ng2UiAuthModule_1 = __decorate([
        NgModule({
            imports: [HttpClientModule],
            declarations: [],
            exports: []
        })
    ], Ng2UiAuthModule);
    return Ng2UiAuthModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { AuthService, BrowserStorageService, CONFIG_OPTIONS, ConfigService, JwtInterceptor, LocalService, Ng2UiAuthModule, Oauth1Service, Oauth2Service, OauthService, PopupService, SharedService, StorageService, StorageType };
//# sourceMappingURL=ng2-ui-auth.js.map
