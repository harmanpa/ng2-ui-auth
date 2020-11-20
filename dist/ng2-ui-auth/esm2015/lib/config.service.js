import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { defaultProviders } from './config-providers';
import { StorageType } from './storage-type.enum';
export const CONFIG_OPTIONS = new InjectionToken('config.options');
let ConfigService = class ConfigService {
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
};
ConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG_OPTIONS,] }] }
];
ConfigService = __decorate([
    Injectable(),
    __param(0, Inject(CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], ConfigService);
export { ConfigService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVsRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQU0sZ0JBQWdCLENBQUMsQ0FBQztBQUV4RSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBNkN4QixZQUFvQyxPQUE4QjtRQTVDM0QsWUFBTyxHQUFHO1lBQ2YsZUFBZSxFQUFFLEtBQUs7WUFDdEIsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsR0FBRztZQUNaLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLFNBQVMsRUFBRSxlQUFlO1lBQzFCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFdBQVcsRUFBRSxhQUFhO1lBQzFCLFVBQVUsRUFBRSxlQUFlO1lBQzNCLFNBQVMsRUFBRSxRQUFRO1lBQ25CLFdBQVcsRUFBRSxXQUFXLENBQUMsYUFBYTtZQUN0QyxPQUFPLEVBQUUsU0FBUztZQUNsQixZQUFZLEVBQUUsQ0FBQyxRQUFhLEVBQUUsTUFBc0IsRUFBRSxFQUFFO2dCQUN0RCxNQUFNLFdBQVcsR0FDZixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6RSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNoQixrQ0FBa0M7b0JBQ2xDLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO29CQUNuQyxPQUFPLFdBQVcsQ0FBQztpQkFDcEI7Z0JBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7b0JBQ25DLGtDQUFrQztvQkFDbEMsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsTUFBTSxhQUFhLEdBQ2pCLE1BQU0sQ0FBQyxTQUFTO29CQUNoQixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLEVBQUU7d0JBQ3BELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNkLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM5RixJQUFJLEtBQUssRUFBRTtvQkFDVCxPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCw2RkFBNkY7Z0JBQzdGLHlEQUF5RDtnQkFDekQsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQ0QsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBR0EsSUFBSSxDQUFDLE9BQU8sbUNBQ1AsSUFBSSxDQUFDLE9BQU8sR0FDWixPQUFPLENBQ1gsQ0FBQztRQUNGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxlQUFlLENBQUMsU0FBcUI7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLG1DQUNqQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxHQUM5QixTQUFTLENBQ2IsQ0FBQztRQUNGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCx5QkFBeUI7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoRCxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1DQUN0QixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQy9CLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7OzRDQTFCYyxNQUFNLFNBQUMsY0FBYzs7QUE3Q3ZCLGFBQWE7SUFEekIsVUFBVSxFQUFFO0lBOENFLFdBQUEsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBOztHQTdDeEIsYUFBYSxDQXVFekI7U0F2RVksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSUNvbmZpZ09wdGlvbnMsIElQYXJ0aWFsQ29uZmlnT3B0aW9ucywgSVByb3ZpZGVycyB9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0UHJvdmlkZXJzIH0gZnJvbSAnLi9jb25maWctcHJvdmlkZXJzJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbmV4cG9ydCBjb25zdCBDT05GSUdfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdjb25maWcub3B0aW9ucycpO1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICBwdWJsaWMgb3B0aW9ucyA9IHtcclxuICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXHJcbiAgICB0b2tlblJvb3Q6IG51bGwsXHJcbiAgICBiYXNlVXJsOiAnLycsXHJcbiAgICBsb2dpblVybDogJy9hdXRoL2xvZ2luJyxcclxuICAgIHNpZ251cFVybDogJy9hdXRoL3NpZ251cCcsXHJcbiAgICB1bmxpbmtVcmw6ICcvYXV0aC91bmxpbmsvJyxcclxuICAgIHRva2VuTmFtZTogJ3Rva2VuJyxcclxuICAgIHRva2VuU2VwYXJhdG9yOiAnXycsXHJcbiAgICB0b2tlblByZWZpeDogJ25nMi11aS1hdXRoJyxcclxuICAgIGF1dGhIZWFkZXI6ICdBdXRob3JpemF0aW9uJyxcclxuICAgIGF1dGhUb2tlbjogJ0JlYXJlcicsXHJcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRSxcclxuICAgIGNvcmRvdmE6IHVuZGVmaW5lZCxcclxuICAgIHJlc29sdmVUb2tlbjogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHtcclxuICAgICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsIHwgdW5kZWZpbmVkID1cclxuICAgICAgICByZXNwb25zZSAmJiAocmVzcG9uc2UuYWNjZXNzX3Rva2VuIHx8IHJlc3BvbnNlLnRva2VuIHx8IHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICBpZiAoIWFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHRva2VuUm9vdERhdGEgPVxyXG4gICAgICAgIGNvbmZpZy50b2tlblJvb3QgJiZcclxuICAgICAgICBjb25maWcudG9rZW5Sb290LnNwbGl0KCcuJykucmVkdWNlKChvOiBhbnksIHg6IGFueSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG9beF07XHJcbiAgICAgICAgfSwgYWNjZXNzVG9rZW4pO1xyXG4gICAgICBjb25zdCB0b2tlbiA9IHRva2VuUm9vdERhdGEgPyB0b2tlblJvb3REYXRhW2NvbmZpZy50b2tlbk5hbWVdIDogYWNjZXNzVG9rZW5bY29uZmlnLnRva2VuTmFtZV07XHJcbiAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgfVxyXG4gICAgICAvLyBjb25zdCB0b2tlblBhdGggPSB0aGlzLnRva2VuUm9vdCA/IHRoaXMudG9rZW5Sb290ICsgJy4nICsgdGhpcy50b2tlbk5hbWUgOiB0aGlzLnRva2VuTmFtZTtcclxuICAgICAgLy8gY29uc29sZS53YXJuKCdFeHBlY3RpbmcgYSB0b2tlbiBuYW1lZCBcIicgKyB0b2tlblBhdGgpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBwcm92aWRlcnM6IHt9XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChDT05GSUdfT1BUSU9OUykgb3B0aW9uczogSVBhcnRpYWxDb25maWdPcHRpb25zKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgLi4ub3B0aW9uc1xyXG4gICAgfTtcclxuICAgIHRoaXMubWVyZ2VXaXRoRGVmYXVsdFByb3ZpZGVycygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUHJvdmlkZXJzKHByb3ZpZGVyczogSVByb3ZpZGVycykge1xyXG4gICAgdGhpcy5vcHRpb25zLnByb3ZpZGVycyA9IHtcclxuICAgICAgLi4uKHRoaXMub3B0aW9ucy5wcm92aWRlcnMgfHwge30pLFxyXG4gICAgICAuLi5wcm92aWRlcnNcclxuICAgIH07XHJcbiAgICB0aGlzLm1lcmdlV2l0aERlZmF1bHRQcm92aWRlcnMoKTtcclxuICB9XHJcblxyXG4gIG1lcmdlV2l0aERlZmF1bHRQcm92aWRlcnMoKSB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMucHJvdmlkZXJzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGlmIChrZXkgaW4gZGVmYXVsdFByb3ZpZGVycykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wcm92aWRlcnNba2V5XSA9IHtcclxuICAgICAgICAgIC4uLmRlZmF1bHRQcm92aWRlcnNba2V5XSxcclxuICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5wcm92aWRlcnNba2V5XVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=