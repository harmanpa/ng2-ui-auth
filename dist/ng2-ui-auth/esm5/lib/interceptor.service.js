import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
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
export { JwtInterceptor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL2ludGVyY2VwdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUlqRDtJQUNFLHdCQUFvQixNQUFxQixFQUFVLE1BQXFCO1FBQXBELFdBQU0sR0FBTixNQUFNLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO0lBQUcsQ0FBQztJQUU1RSxrQ0FBUyxHQUFULFVBQVUsR0FBcUIsRUFBRSxJQUFpQjs7UUFDMUMsSUFBQSxLQUE0QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBN0MsVUFBVSxnQkFBQSxFQUFFLFNBQVMsZUFBd0IsQ0FBQztRQUN0RCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEQsSUFBTSxNQUFNLEdBQ1YsZUFBZSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLFlBQUksR0FBQyxVQUFVLElBQU0sU0FBUyxTQUFJLEtBQU8sS0FBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQy9ILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDOztnQkFUMkIsYUFBYTtnQkFBa0IsYUFBYTs7SUFEN0QsY0FBYztRQUQxQixVQUFVLEVBQUU7eUNBRWlCLGFBQWEsRUFBa0IsYUFBYTtPQUQ3RCxjQUFjLENBVzFCO0lBQUQscUJBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSnd0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cclxuXHJcbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XHJcbiAgICBjb25zdCB7IGF1dGhIZWFkZXIsIGF1dGhUb2tlbiB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcclxuICAgIGNvbnN0IHRva2VuID0gdGhpcy5zaGFyZWQuZ2V0VG9rZW4oKTtcclxuICAgIGNvbnN0IGlzQXV0aGVudGljYXRlZCA9IHRoaXMuc2hhcmVkLmlzQXV0aGVudGljYXRlZCgpO1xyXG4gICAgY29uc3QgbmV3UmVxID1cclxuICAgICAgaXNBdXRoZW50aWNhdGVkICYmICFyZXEuaGVhZGVycy5oYXMoYXV0aEhlYWRlcikgPyByZXEuY2xvbmUoeyBzZXRIZWFkZXJzOiB7IFthdXRoSGVhZGVyXTogYCR7YXV0aFRva2VufSAke3Rva2VufWAgfSB9KSA6IHJlcTtcclxuICAgIHJldHVybiBuZXh0LmhhbmRsZShuZXdSZXEpO1xyXG4gIH1cclxufVxyXG4iXX0=