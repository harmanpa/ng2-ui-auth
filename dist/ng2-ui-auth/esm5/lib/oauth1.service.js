import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { PopupService } from './popup.service';
import { buildQueryString, joinUrl } from './utils';
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
export { Oauth1Service };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgxLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9vYXV0aDEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR3BEO0lBQ0UsdUJBQW9CLElBQWdCLEVBQVUsS0FBbUIsRUFBVSxNQUFxQjtRQUE1RSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBRyxDQUFDO0lBRXBHLDRCQUFJLEdBQUosVUFBc0MsWUFBNEIsRUFBRSxRQUFnQjtRQUFwRixpQkFtQkM7UUFsQkMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUMxSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNuRixTQUFTLENBQUMsVUFBQSxXQUFXO1lBQ25CLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FDbEQsR0FBRyxDQUFDLFVBQUEsaUJBQWlCO2dCQUNuQixPQUFBLFdBQVc7b0JBQ1QsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25ILENBQUMsQ0FBQyxTQUFTO1lBRmIsQ0FFYSxDQUNkLEVBQ0QsU0FBUyxDQUFDLFVBQUEsaUJBQWlCO2dCQUN6QixPQUFBLEtBQUksQ0FBQyxLQUFLO3FCQUNQLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUM7cUJBQ2hGLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxDQUFDLEVBQUUsaUJBQWlCLG1CQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLENBQUM7WUFGN0QsQ0FFNkQsQ0FDOUQsQ0FDRjtRQVhELENBV0MsQ0FDRixFQUNELFNBQVMsQ0FBQyxVQUFDLEVBQWdDO2dCQUE5QixpQkFBaUIsdUJBQUEsRUFBRSxTQUFTLGVBQUE7WUFBTyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBSSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztRQUE5RSxDQUE4RSxDQUFDLENBQ2hJLENBQUM7SUFDSixDQUFDO0lBRU8sd0NBQWdCLEdBQXhCLFVBQTRCLFlBQTRCLEVBQUUsaUJBQXlCLEVBQUUsU0FBaUIsRUFBRSxRQUFnQjtRQUN0SCxJQUFNLElBQUksR0FBRyxFQUFFLFlBQVksY0FBQSxFQUFFLGlCQUFpQixtQkFBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUM7UUFDaEUsSUFBQSxLQUErQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBaEQsZUFBZSxxQkFBQSxFQUFFLE9BQU8sYUFBd0IsQ0FBQztRQUNqRCxJQUFBLEtBQXlCLFlBQVksT0FBdEIsRUFBZixNQUFNLG1CQUFHLE1BQU0sS0FBQSxFQUFFLEdBQUcsR0FBSyxZQUFZLElBQWpCLENBQWtCO1FBQzlDLElBQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBSSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxlQUFlLGlCQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7O2dCQTdCeUIsVUFBVTtnQkFBaUIsWUFBWTtnQkFBa0IsYUFBYTs7SUFEckYsYUFBYTtRQUR6QixVQUFVLEVBQUU7eUNBRWUsVUFBVSxFQUFpQixZQUFZLEVBQWtCLGFBQWE7T0FEckYsYUFBYSxDQStCekI7SUFBRCxvQkFBQztDQUFBLEFBL0JELElBK0JDO1NBL0JZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSU9hdXRoMU9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgYnVpbGRRdWVyeVN0cmluZywgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT2F1dGgxU2VydmljZSBpbXBsZW1lbnRzIElPYXV0aFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBwb3B1cDogUG9wdXBTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cclxuXHJcbiAgb3BlbjxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihvYXV0aE9wdGlvbnM6IElPYXV0aDFPcHRpb25zLCB1c2VyRGF0YTogb2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBjb25zdCBzZXJ2ZXJVcmwgPSB0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwgPyBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgb2F1dGhPcHRpb25zLnVybCkgOiBvYXV0aE9wdGlvbnMudXJsO1xyXG4gICAgcmV0dXJuIHRoaXMucG9wdXAub3BlbignYWJvdXQ6YmxhbmsnLCBvYXV0aE9wdGlvbnMsIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSkucGlwZShcclxuICAgICAgc3dpdGNoTWFwKHBvcHVwV2luZG93ID0+XHJcbiAgICAgICAgdGhpcy5odHRwLnBvc3Q8b2JqZWN0PihzZXJ2ZXJVcmwsIG9hdXRoT3B0aW9ucykucGlwZShcclxuICAgICAgICAgIHRhcChhdXRob3JpemF0aW9uRGF0YSA9PlxyXG4gICAgICAgICAgICBwb3B1cFdpbmRvd1xyXG4gICAgICAgICAgICAgID8gcG9wdXBXaW5kb3cubG9jYXRpb24ucmVwbGFjZShbb2F1dGhPcHRpb25zLmF1dGhvcml6YXRpb25FbmRwb2ludCwgYnVpbGRRdWVyeVN0cmluZyhhdXRob3JpemF0aW9uRGF0YSldLmpvaW4oJz8nKSlcclxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIHN3aXRjaE1hcChhdXRob3JpemF0aW9uRGF0YSA9PlxyXG4gICAgICAgICAgICB0aGlzLnBvcHVwXHJcbiAgICAgICAgICAgICAgLndhaXRGb3JDbG9zZShwb3B1cFdpbmRvdywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhLCBvYXV0aE9wdGlvbnMucmVkaXJlY3RVcmkpXHJcbiAgICAgICAgICAgICAgLnBpcGUobWFwKG9hdXRoRGF0YSA9PiAoeyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhIH0pKSlcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICksXHJcbiAgICAgIHN3aXRjaE1hcCgoeyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhIH0pID0+IHRoaXMuZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4Y2hhbmdlRm9yVG9rZW48VD4ob2F1dGhPcHRpb25zOiBJT2F1dGgxT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGE6IG9iamVjdCwgb2F1dGhEYXRhOiBvYmplY3QsIHVzZXJEYXRhOiBvYmplY3QpIHtcclxuICAgIGNvbnN0IGJvZHkgPSB7IG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcclxuICAgIGNvbnN0IHsgd2l0aENyZWRlbnRpYWxzLCBiYXNlVXJsIH0gPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gICAgY29uc3QgeyBtZXRob2QgPSAnUE9TVCcsIHVybCB9ID0gb2F1dGhPcHRpb25zO1xyXG4gICAgY29uc3QgZXhjaGFuZ2VGb3JUb2tlblVybCA9IGJhc2VVcmwgPyBqb2luVXJsKGJhc2VVcmwsIHVybCkgOiB1cmw7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCBleGNoYW5nZUZvclRva2VuVXJsLCB7IGJvZHksIHdpdGhDcmVkZW50aWFscyB9KTtcclxuICB9XHJcbn1cclxuIl19