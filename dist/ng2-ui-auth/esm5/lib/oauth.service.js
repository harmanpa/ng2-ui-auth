import { __decorate, __metadata, __read, __spread } from "tslib";
import { Injectable, Injector } from '@angular/core';
import { joinUrl } from './utils';
import { tap } from 'rxjs/operators';
import { Oauth1Service } from './oauth1.service';
import { Oauth2Service } from './oauth2.service';
import { PopupService } from './popup.service';
import { ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
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
export { OauthService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL29hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBSWxEO0lBUUUsc0JBQW9CLElBQWdCLEVBQVUsTUFBcUIsRUFBVSxNQUFxQixFQUFVLEtBQW1CO1FBQTNHLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWM7UUFQdEgsaUJBQVksR0FBRztZQUN0QixFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDNUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQy9DLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtTQUNsRCxDQUFDO1FBQ08sU0FBSSxHQUFHLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUV3RSxDQUFDO0lBRTVILG1DQUFZLEdBQW5CLFVBQStDLElBQVksRUFBRSxRQUFjO1FBQTNFLGlCQWdCQztRQWZDLElBQU0sUUFBUSxHQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEtBQUssS0FBSztZQUNyRCxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sVUFBSyxJQUFJLENBQUMsWUFBWSxHQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUN6RyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sVUFBSyxJQUFJLENBQUMsWUFBWSxHQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTlHLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDL0UsR0FBRyxDQUFDLFVBQUEsUUFBUTtZQUNWLDZEQUE2RDtZQUM3RCw4REFBOEQ7WUFDOUQsMkJBQTJCO1lBQzNCLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRTtnQkFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVNLDZCQUFNLEdBQWIsVUFBaUIsUUFBZ0IsRUFBRSxHQUF5RSxFQUFFLE1BQWU7UUFBMUYsb0JBQUEsRUFBQSxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQUUsdUJBQUEsRUFBQSxlQUFlO1FBQzNILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUksTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsVUFBQSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7O2dCQXRCeUIsVUFBVTtnQkFBa0IsYUFBYTtnQkFBa0IsYUFBYTtnQkFBaUIsWUFBWTs7SUFScEgsWUFBWTtRQUR4QixVQUFVLEVBQUU7eUNBU2UsVUFBVSxFQUFrQixhQUFhLEVBQWtCLGFBQWEsRUFBaUIsWUFBWTtPQVJwSCxZQUFZLENBK0J4QjtJQUFELG1CQUFDO0NBQUEsQUEvQkQsSUErQkM7U0EvQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGpvaW5VcmwgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPYXV0aDFTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDEuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoMlNlcnZpY2UgfSBmcm9tICcuL29hdXRoMi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPYXV0aFNlcnZpY2Uge1xyXG4gIHJlYWRvbmx5IGRlcFByb3ZpZGVycyA9IFtcclxuICAgIHsgcHJvdmlkZTogSHR0cENsaWVudCwgdXNlVmFsdWU6IHRoaXMuaHR0cCB9LFxyXG4gICAgeyBwcm92aWRlOiBQb3B1cFNlcnZpY2UsIHVzZVZhbHVlOiB0aGlzLnBvcHVwIH0sXHJcbiAgICB7IHByb3ZpZGU6IENvbmZpZ1NlcnZpY2UsIHVzZVZhbHVlOiB0aGlzLmNvbmZpZyB9XHJcbiAgXTtcclxuICByZWFkb25seSBkZXBzID0gW0h0dHBDbGllbnQsIFBvcHVwU2VydmljZSwgQ29uZmlnU2VydmljZV07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBzaGFyZWQ6IFNoYXJlZFNlcnZpY2UsIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLCBwcml2YXRlIHBvcHVwOiBQb3B1cFNlcnZpY2UpIHt9XHJcblxyXG4gIHB1YmxpYyBhdXRoZW50aWNhdGU8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZz4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgY29uc3QgcHJvdmlkZXI6IElPYXV0aFNlcnZpY2UgPVxyXG4gICAgICB0aGlzLmNvbmZpZy5vcHRpb25zLnByb3ZpZGVyc1tuYW1lXS5vYXV0aFR5cGUgPT09ICcxLjAnXHJcbiAgICAgICAgPyBJbmplY3Rvci5jcmVhdGUoWy4uLnRoaXMuZGVwUHJvdmlkZXJzLCB7IHByb3ZpZGU6IE9hdXRoMVNlcnZpY2UsIGRlcHM6IHRoaXMuZGVwcyB9XSkuZ2V0KE9hdXRoMVNlcnZpY2UpXHJcbiAgICAgICAgOiBJbmplY3Rvci5jcmVhdGUoWy4uLnRoaXMuZGVwUHJvdmlkZXJzLCB7IHByb3ZpZGU6IE9hdXRoMlNlcnZpY2UsIGRlcHM6IHRoaXMuZGVwcyB9XSkuZ2V0KE9hdXRoMlNlcnZpY2UpO1xyXG5cclxuICAgIHJldHVybiBwcm92aWRlci5vcGVuPFQ+KHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLCB1c2VyRGF0YSB8fCB7fSkucGlwZShcclxuICAgICAgdGFwKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXHJcbiAgICAgICAgLy8gc2F0ZWxsaXplcidzIG1hZ2ljIGJ5IGRvaW5nIGF1dGhvcml6YXRpb24gY29kZSBleGNoYW5nZSBhbmRcclxuICAgICAgICAvLyBzYXZpbmcgYSB0b2tlbiBtYW51YWxseS5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0udXJsKSB7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZC5zZXRUb2tlbihyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bmxpbms8VD4ocHJvdmlkZXI6IHN0cmluZywgdXJsID0gam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIHRoaXMuY29uZmlnLm9wdGlvbnMudW5saW5rVXJsKSwgbWV0aG9kID0gJ1BPU1QnKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCB1cmwsIHsgYm9keTogeyBwcm92aWRlciB9IH0pO1xyXG4gIH1cclxufVxyXG4iXX0=