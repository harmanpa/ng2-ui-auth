import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { OauthService } from './oauth.service';
import { SharedService } from './shared.service';
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
export { AuthService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXVpLWF1dGgvIiwic291cmNlcyI6WyJsaWIvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBSWpEO0lBQ0UscUJBQW9CLE1BQXFCLEVBQVUsS0FBbUIsRUFBVSxLQUFtQjtRQUEvRSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUFVLFVBQUssR0FBTCxLQUFLLENBQWM7SUFBRyxDQUFDO0lBRWhHLDJCQUFLLEdBQVosVUFBOEMsSUFBcUIsRUFBRSxHQUFZO1FBQy9FLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSw0QkFBTSxHQUFiLFVBQXVCLElBQXFCLEVBQUUsR0FBWTtRQUN4RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFJLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sNEJBQU0sR0FBYjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sa0NBQVksR0FBbkIsVUFBcUQsSUFBWSxFQUFFLFFBQWM7UUFDL0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBSSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLDBCQUFJLEdBQVgsVUFBNkMsSUFBWSxFQUFFLFFBQWM7UUFDdkUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBSSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLDRCQUFNLEdBQWIsVUFBdUIsUUFBZ0IsRUFBRSxHQUFZO1FBQ25ELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUksUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxxQ0FBZSxHQUF0QjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0sOEJBQVEsR0FBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFnQixLQUFzQjtRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0saUNBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTSxnQ0FBVSxHQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sb0NBQWMsR0FBckIsVUFBc0IsSUFBaUI7UUFDckMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sdUNBQWlCLEdBQXhCO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDekMsQ0FBQzs7Z0JBcEQyQixhQUFhO2dCQUFpQixZQUFZO2dCQUFpQixZQUFZOztJQUR4RixXQUFXO1FBRHZCLFVBQVUsRUFBRTt5Q0FFaUIsYUFBYSxFQUFpQixZQUFZLEVBQWlCLFlBQVk7T0FEeEYsV0FBVyxDQXNEdkI7SUFBRCxrQkFBQztDQUFBLEFBdERELElBc0RDO1NBdERZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTG9jYWxTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGxvY2FsOiBMb2NhbFNlcnZpY2UsIHByaXZhdGUgb2F1dGg6IE9hdXRoU2VydmljZSkge31cclxuXHJcbiAgcHVibGljIGxvZ2luPFQgZXh0ZW5kcyBzdHJpbmcgfCBvYmplY3QgPSBhbnk+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2NhbC5sb2dpbjxUPih1c2VyLCB1cmwpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNpZ251cDxUID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMubG9jYWwuc2lnbnVwPFQ+KHVzZXIsIHVybCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9nb3V0KCk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkLmxvZ291dCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGF1dGhlbnRpY2F0ZTxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihuYW1lOiBzdHJpbmcsIHVzZXJEYXRhPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5vYXV0aC5hdXRoZW50aWNhdGU8VD4obmFtZSwgdXNlckRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxpbms8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMub2F1dGguYXV0aGVudGljYXRlPFQ+KG5hbWUsIHVzZXJEYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bmxpbms8VCA9IGFueT4ocHJvdmlkZXI6IHN0cmluZywgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5vYXV0aC51bmxpbms8VD4ocHJvdmlkZXIsIHVybCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkLmlzQXV0aGVudGljYXRlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFRva2VuKCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkLmdldFRva2VuKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VG9rZW4odG9rZW46IHN0cmluZyB8IG9iamVjdCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaGFyZWQuc2V0VG9rZW4odG9rZW4pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZVRva2VuKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaGFyZWQucmVtb3ZlVG9rZW4oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQYXlsb2FkKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5zaGFyZWQuZ2V0UGF5bG9hZCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFN0b3JhZ2VUeXBlKHR5cGU6IFN0b3JhZ2VUeXBlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaGFyZWQuc2V0U3RvcmFnZVR5cGUodHlwZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RXhwaXJhdGlvbkRhdGUoKTogRGF0ZSB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkLmdldEV4cGlyYXRpb25EYXRlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==