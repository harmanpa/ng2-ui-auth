import { __assign, __decorate, __metadata, __read, __spread } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { PopupService } from './popup.service';
import { buildQueryString, getWindowOrigin, joinUrl } from './utils';
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
export { Oauth2Service };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9vYXV0aDIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHckU7SUFDRSx1QkFBb0IsSUFBZ0IsRUFBVSxLQUFtQixFQUFVLE1BQXFCO1FBQTVFLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFHLENBQUM7SUFFcEcsNEJBQUksR0FBSixVQUFzQyxZQUE0QixFQUFFLFFBQWdCO1FBQXBGLGlCQXNCQztRQXJCQyxJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRSxJQUFNLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hHLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3pFLFNBQVMsQ0FBQyxVQUFDLE1BQWU7WUFDeEIsT0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7UUFBekcsQ0FBeUcsQ0FDMUcsRUFDRCxTQUFTLENBQUMsVUFBQyxTQUFjO1lBQ3ZCLDBEQUEwRDtZQUMxRCw2REFBNkQ7WUFDN0QsOERBQThEO1lBQzlELDJCQUEyQjtZQUMzQixJQUFJLFlBQVksQ0FBQyxZQUFZLEtBQUssT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtnQkFDOUQsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDdEI7WUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLEtBQUssS0FBSyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUMzQztZQUNELE9BQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFJLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEYsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTyx3Q0FBZ0IsR0FBeEIsVUFBNEIsT0FBdUIsRUFBRSxpQkFBeUIsRUFBRSxTQUFpQixFQUFFLFFBQWdCO1FBQ2pILElBQU0sSUFBSSxHQUFHLEVBQUUsaUJBQWlCLG1CQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsQ0FBQztRQUNsRCxJQUFBLEtBQStCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFoRCxPQUFPLGFBQUEsRUFBRSxlQUFlLHFCQUF3QixDQUFDO1FBQ2pELElBQUEsR0FBRyxHQUFzQixPQUFPLElBQTdCLEVBQUUsS0FBb0IsT0FBTyxPQUFaLEVBQWYsTUFBTSxtQkFBRyxNQUFNLEtBQUEsQ0FBYTtRQUN6QyxJQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUksTUFBTSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsZUFBZSxpQkFBQSxFQUFFLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRU8sNENBQW9CLEdBQTVCLFVBQTZCLE9BQXVCO1FBRWhELElBQUEsS0FPRSxPQUFPLGFBUFksRUFBckIsWUFBWSxtQkFBRyxNQUFNLEtBQUEsRUFDckIsUUFBUSxHQU1OLE9BQU8sU0FORCxFQUNSLEtBS0UsT0FBTyxZQUw0QixFQUFyQyxXQUFXLG1CQUFHLGVBQWUsRUFBRSxJQUFJLEVBQUUsS0FBQSxFQUNyQyxLQUlFLE9BQU8sZUFKVyxFQUFwQixjQUFjLG1CQUFHLEdBQUcsS0FBQSxFQUNwQixLQUFLLEdBR0gsT0FBTyxNQUhKLEVBQ0wsS0FBSyxHQUVILE9BQU8sTUFGSixFQUNMLG1CQUFtQixHQUNqQixPQUFPLG9CQURVLENBQ1Q7UUFDWixJQUFNLGFBQWEsR0FBRyxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDcEUsT0FBTztZQUNMLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztZQUMvQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUM7WUFDdkIsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDO1dBQzFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUN6QyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQ3RELENBQUMsbUJBQW1CO1lBQ3JCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztnQkFDdEMsSUFBTSxLQUFLLEdBQWdELG1CQUEyQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDN0IsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDckI7cUJBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUU7b0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDdkI7cUJBQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO29CQUN6QixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNsQjtnQkFDRCxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFFTixNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFOLENBQU0sQ0FBQzthQUNuQixNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsSUFBSTs7WUFBSyxPQUFBLHVCQUFNLEdBQUcsZ0JBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBRztRQUFoQyxDQUFnQyxFQUFFLEVBQStCLENBQUMsQ0FBQztJQUM5RixDQUFDOztnQkFuRXlCLFVBQVU7Z0JBQWlCLFlBQVk7Z0JBQWtCLGFBQWE7O0lBRHJGLGFBQWE7UUFEekIsVUFBVSxFQUFFO3lDQUVlLFVBQVUsRUFBaUIsWUFBWSxFQUFrQixhQUFhO09BRHJGLGFBQWEsQ0FxRXpCO0lBQUQsb0JBQUM7Q0FBQSxBQXJFRCxJQXFFQztTQXJFWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBlbXB0eSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBJT2F1dGgyT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBidWlsZFF1ZXJ5U3RyaW5nLCBnZXRXaW5kb3dPcmlnaW4sIGpvaW5VcmwgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE9hdXRoMlNlcnZpY2UgaW1wbGVtZW50cyBJT2F1dGhTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgcG9wdXA6IFBvcHVwU2VydmljZSwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHt9XHJcblxyXG4gIG9wZW48VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4ob2F1dGhPcHRpb25zOiBJT2F1dGgyT3B0aW9ucywgdXNlckRhdGE6IG9iamVjdCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgY29uc3QgYXV0aG9yaXphdGlvbkRhdGEgPSB0aGlzLmdldEF1dGhvcml6YXRpb25EYXRhKG9hdXRoT3B0aW9ucyk7XHJcbiAgICBjb25zdCB1cmwgPSBbb2F1dGhPcHRpb25zLmF1dGhvcml6YXRpb25FbmRwb2ludCwgYnVpbGRRdWVyeVN0cmluZyhhdXRob3JpemF0aW9uRGF0YSldLmpvaW4oJz8nKTtcclxuICAgIHJldHVybiB0aGlzLnBvcHVwLm9wZW4odXJsLCBvYXV0aE9wdGlvbnMsIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSkucGlwZShcclxuICAgICAgc3dpdGNoTWFwKCh3aW5kb3c/OiBXaW5kb3cpID0+XHJcbiAgICAgICAgd2luZG93ID8gdGhpcy5wb3B1cC53YWl0Rm9yQ2xvc2Uod2luZG93LCB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEsIG9hdXRoT3B0aW9ucy5yZWRpcmVjdFVyaSkgOiBlbXB0eSgpXHJcbiAgICAgICksXHJcbiAgICAgIHN3aXRjaE1hcCgob2F1dGhEYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAvLyB3aGVuIG5vIHNlcnZlciBVUkwgcHJvdmlkZWQsIHJldHVybiBwb3B1cCBwYXJhbXMgYXMtaXMuXHJcbiAgICAgICAgLy8gdGhpcyBpcyBmb3IgYSBzY2VuYXJpbyB3aGVuIHNvbWVvbmUgd2lzaGVzIHRvIG9wdCBvdXQgZnJvbVxyXG4gICAgICAgIC8vIHNhdGVsbGl6ZXIncyBtYWdpYyBieSBkb2luZyBhdXRob3JpemF0aW9uIGNvZGUgZXhjaGFuZ2UgYW5kXHJcbiAgICAgICAgLy8gc2F2aW5nIGEgdG9rZW4gbWFudWFsbHkuXHJcbiAgICAgICAgaWYgKG9hdXRoT3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICd0b2tlbicgfHwgIW9hdXRoT3B0aW9ucy51cmwpIHtcclxuICAgICAgICAgIHJldHVybiBvZihvYXV0aERhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9hdXRoRGF0YS5zdGF0ZSAmJiBvYXV0aERhdGEuc3RhdGUgIT09IGF1dGhvcml6YXRpb25EYXRhLnN0YXRlKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09BdXRoIFwic3RhdGVcIiBtaXNtYXRjaCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhjaGFuZ2VGb3JUb2tlbjxUPihvcHRpb25zOiBJT2F1dGgyT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGE6IG9iamVjdCwgb2F1dGhEYXRhOiBvYmplY3QsIHVzZXJEYXRhOiBvYmplY3QpIHtcclxuICAgIGNvbnN0IGJvZHkgPSB7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhIH07XHJcbiAgICBjb25zdCB7IGJhc2VVcmwsIHdpdGhDcmVkZW50aWFscyB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcclxuICAgIGNvbnN0IHsgdXJsLCBtZXRob2QgPSAnUE9TVCcgfSA9IG9wdGlvbnM7XHJcbiAgICBjb25zdCBleGNoYW5nZUZvclRva2VuVXJsID0gYmFzZVVybCA/IGpvaW5VcmwoYmFzZVVybCwgdXJsKSA6IHVybDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBdXRob3JpemF0aW9uRGF0YShvcHRpb25zOiBJT2F1dGgyT3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICByZXNwb25zZVR5cGUgPSAnY29kZScsXHJcbiAgICAgIGNsaWVudElkLFxyXG4gICAgICByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpIHx8ICcnLFxyXG4gICAgICBzY29wZURlbGltaXRlciA9ICcsJyxcclxuICAgICAgc2NvcGUsXHJcbiAgICAgIHN0YXRlLFxyXG4gICAgICBhZGRpdGlvbmFsVXJsUGFyYW1zXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB0eXBlb2Ygc3RhdGUgPT09ICdmdW5jdGlvbicgPyBzdGF0ZSgpIDogc3RhdGU7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBbJ3Jlc3BvbnNlX3R5cGUnLCByZXNwb25zZVR5cGVdLFxyXG4gICAgICBbJ2NsaWVudF9pZCcsIGNsaWVudElkXSxcclxuICAgICAgWydyZWRpcmVjdF91cmknLCByZWRpcmVjdFVyaV0sXHJcbiAgICAgIC4uLihzdGF0ZSA/IFtbJ3N0YXRlJywgcmVzb2x2ZWRTdGF0ZV1dIDogW10pLFxyXG4gICAgICAuLi4oc2NvcGUgPyBbWydzY29wZScsIHNjb3BlLmpvaW4oc2NvcGVEZWxpbWl0ZXIpXV0gOiBbXSksXHJcbiAgICAgIC4uLihhZGRpdGlvbmFsVXJsUGFyYW1zXHJcbiAgICAgICAgPyBPYmplY3Qua2V5cyhhZGRpdGlvbmFsVXJsUGFyYW1zKS5tYXAoa2V5ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpIHwgbnVsbCB8IHVuZGVmaW5lZCA9IChhZGRpdGlvbmFsVXJsUGFyYW1zIGFzIGFueSlba2V5XTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZSgpXTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCAnJ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFsnJywgJyddO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICA6IFtdKVxyXG4gICAgXVxyXG4gICAgICAuZmlsdGVyKF8gPT4gISFfWzBdKVxyXG4gICAgICAucmVkdWNlKChhY2MsIG5leHQpID0+ICh7IC4uLmFjYywgW25leHRbMF1dOiBuZXh0WzFdIH0pLCB7fSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9KTtcclxuICB9XHJcbn1cclxuIl19