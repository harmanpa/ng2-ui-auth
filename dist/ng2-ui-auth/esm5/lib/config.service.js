import { __assign, __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { defaultProviders } from './config-providers';
import { StorageType } from './storage-type.enum';
export var CONFIG_OPTIONS = new InjectionToken('config.options');
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
export { ConfigService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVsRCxNQUFNLENBQUMsSUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQU0sZ0JBQWdCLENBQUMsQ0FBQztBQUV4RTtJQTZDRSx1QkFBb0MsT0FBOEI7UUE1QzNELFlBQU8sR0FBRztZQUNmLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLEdBQUc7WUFDWixRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUUsY0FBYztZQUN6QixTQUFTLEVBQUUsZUFBZTtZQUMxQixTQUFTLEVBQUUsT0FBTztZQUNsQixjQUFjLEVBQUUsR0FBRztZQUNuQixXQUFXLEVBQUUsYUFBYTtZQUMxQixVQUFVLEVBQUUsZUFBZTtZQUMzQixTQUFTLEVBQUUsUUFBUTtZQUNuQixXQUFXLEVBQUUsV0FBVyxDQUFDLGFBQWE7WUFDdEMsT0FBTyxFQUFFLFNBQVM7WUFDbEIsWUFBWSxFQUFFLFVBQUMsUUFBYSxFQUFFLE1BQXNCO2dCQUNsRCxJQUFNLFdBQVcsR0FDZixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6RSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNoQixrQ0FBa0M7b0JBQ2xDLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO29CQUNuQyxPQUFPLFdBQVcsQ0FBQztpQkFDcEI7Z0JBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7b0JBQ25DLGtDQUFrQztvQkFDbEMsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsSUFBTSxhQUFhLEdBQ2pCLE1BQU0sQ0FBQyxTQUFTO29CQUNoQixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFNLEVBQUUsQ0FBTTt3QkFDaEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNsQixJQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlGLElBQUksS0FBSyxFQUFFO29CQUNULE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUNELDZGQUE2RjtnQkFDN0YseURBQXlEO2dCQUN6RCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7WUFDRCxTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFHQSxJQUFJLENBQUMsT0FBTyx5QkFDUCxJQUFJLENBQUMsT0FBTyxHQUNaLE9BQU8sQ0FDWCxDQUFDO1FBQ0YsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELHVDQUFlLEdBQWYsVUFBZ0IsU0FBcUI7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLHlCQUNqQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxHQUM5QixTQUFTLENBQ2IsQ0FBQztRQUNGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxpREFBeUIsR0FBekI7UUFBQSxpQkFTQztRQVJDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQzdDLElBQUksR0FBRyxJQUFJLGdCQUFnQixFQUFFO2dCQUMzQixLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMseUJBQ3RCLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUNyQixLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FDL0IsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnREF6QlksTUFBTSxTQUFDLGNBQWM7O0lBN0N2QixhQUFhO1FBRHpCLFVBQVUsRUFBRTtRQThDRSxXQUFBLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTs7T0E3Q3hCLGFBQWEsQ0F1RXpCO0lBQUQsb0JBQUM7Q0FBQSxBQXZFRCxJQXVFQztTQXZFWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJQ29uZmlnT3B0aW9ucywgSVBhcnRpYWxDb25maWdPcHRpb25zLCBJUHJvdmlkZXJzIH0gZnJvbSAnLi9jb25maWctaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IGRlZmF1bHRQcm92aWRlcnMgfSBmcm9tICcuL2NvbmZpZy1wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuZXhwb3J0IGNvbnN0IENPTkZJR19PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ2NvbmZpZy5vcHRpb25zJyk7XHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zID0ge1xyXG4gICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcclxuICAgIHRva2VuUm9vdDogbnVsbCxcclxuICAgIGJhc2VVcmw6ICcvJyxcclxuICAgIGxvZ2luVXJsOiAnL2F1dGgvbG9naW4nLFxyXG4gICAgc2lnbnVwVXJsOiAnL2F1dGgvc2lnbnVwJyxcclxuICAgIHVubGlua1VybDogJy9hdXRoL3VubGluay8nLFxyXG4gICAgdG9rZW5OYW1lOiAndG9rZW4nLFxyXG4gICAgdG9rZW5TZXBhcmF0b3I6ICdfJyxcclxuICAgIHRva2VuUHJlZml4OiAnbmcyLXVpLWF1dGgnLFxyXG4gICAgYXV0aEhlYWRlcjogJ0F1dGhvcml6YXRpb24nLFxyXG4gICAgYXV0aFRva2VuOiAnQmVhcmVyJyxcclxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZS5MT0NBTF9TVE9SQUdFLFxyXG4gICAgY29yZG92YTogdW5kZWZpbmVkLFxyXG4gICAgcmVzb2x2ZVRva2VuOiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4ge1xyXG4gICAgICBjb25zdCBhY2Nlc3NUb2tlbjogc3RyaW5nIHwgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGwgfCB1bmRlZmluZWQgPVxyXG4gICAgICAgIHJlc3BvbnNlICYmIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4gfHwgcmVzcG9uc2UudG9rZW4gfHwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgIGlmICghYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAvLyBjb25zb2xlLndhcm4oJ05vIHRva2VuIGZvdW5kJyk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBhY2Nlc3NUb2tlbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICByZXR1cm4gYWNjZXNzVG9rZW47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBhY2Nlc3NUb2tlbiAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAvLyBjb25zb2xlLndhcm4oJ05vIHRva2VuIGZvdW5kJyk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdG9rZW5Sb290RGF0YSA9XHJcbiAgICAgICAgY29uZmlnLnRva2VuUm9vdCAmJlxyXG4gICAgICAgIGNvbmZpZy50b2tlblJvb3Quc3BsaXQoJy4nKS5yZWR1Y2UoKG86IGFueSwgeDogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gb1t4XTtcclxuICAgICAgICB9LCBhY2Nlc3NUb2tlbik7XHJcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5Sb290RGF0YSA/IHRva2VuUm9vdERhdGFbY29uZmlnLnRva2VuTmFtZV0gOiBhY2Nlc3NUb2tlbltjb25maWcudG9rZW5OYW1lXTtcclxuICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGNvbnN0IHRva2VuUGF0aCA9IHRoaXMudG9rZW5Sb290ID8gdGhpcy50b2tlblJvb3QgKyAnLicgKyB0aGlzLnRva2VuTmFtZSA6IHRoaXMudG9rZW5OYW1lO1xyXG4gICAgICAvLyBjb25zb2xlLndhcm4oJ0V4cGVjdGluZyBhIHRva2VuIG5hbWVkIFwiJyArIHRva2VuUGF0aCk7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIHByb3ZpZGVyczoge31cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KENPTkZJR19PUFRJT05TKSBvcHRpb25zOiBJUGFydGlhbENvbmZpZ09wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgLi4udGhpcy5vcHRpb25zLFxyXG4gICAgICAuLi5vcHRpb25zXHJcbiAgICB9O1xyXG4gICAgdGhpcy5tZXJnZVdpdGhEZWZhdWx0UHJvdmlkZXJzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQcm92aWRlcnMocHJvdmlkZXJzOiBJUHJvdmlkZXJzKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMucHJvdmlkZXJzID0ge1xyXG4gICAgICAuLi4odGhpcy5vcHRpb25zLnByb3ZpZGVycyB8fCB7fSksXHJcbiAgICAgIC4uLnByb3ZpZGVyc1xyXG4gICAgfTtcclxuICAgIHRoaXMubWVyZ2VXaXRoRGVmYXVsdFByb3ZpZGVycygpO1xyXG4gIH1cclxuXHJcbiAgbWVyZ2VXaXRoRGVmYXVsdFByb3ZpZGVycygpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5wcm92aWRlcnMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgaWYgKGtleSBpbiBkZWZhdWx0UHJvdmlkZXJzKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnByb3ZpZGVyc1trZXldID0ge1xyXG4gICAgICAgICAgLi4uZGVmYXVsdFByb3ZpZGVyc1trZXldLFxyXG4gICAgICAgICAgLi4udGhpcy5vcHRpb25zLnByb3ZpZGVyc1trZXldXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==