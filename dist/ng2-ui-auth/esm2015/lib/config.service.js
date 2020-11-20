import { Inject, Injectable, InjectionToken } from '@angular/core';
import { defaultProviders } from './config-providers';
import { StorageType } from './storage-type.enum';
export const CONFIG_OPTIONS = new InjectionToken('config.options');
export class ConfigService {
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
ConfigService.decorators = [
    { type: Injectable }
];
ConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG_OPTIONS,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvcGV0ZXIvRGV2ZWxvcG1lbnQvbmcyLXVpLWF1dGgvcHJvamVjdHMvbmcyLXVpLWF1dGgvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbEQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFNLGdCQUFnQixDQUFDLENBQUM7QUFFeEUsTUFBTSxPQUFPLGFBQWE7SUE2Q3hCLFlBQW9DLE9BQThCO1FBNUMzRCxZQUFPLEdBQUc7WUFDZixlQUFlLEVBQUUsS0FBSztZQUN0QixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxHQUFHO1lBQ1osUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLGNBQWM7WUFDekIsU0FBUyxFQUFFLGVBQWU7WUFDMUIsU0FBUyxFQUFFLE9BQU87WUFDbEIsY0FBYyxFQUFFLEdBQUc7WUFDbkIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsVUFBVSxFQUFFLGVBQWU7WUFDM0IsU0FBUyxFQUFFLFFBQVE7WUFDbkIsV0FBVyxFQUFFLFdBQVcsQ0FBQyxhQUFhO1lBQ3RDLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFlBQVksRUFBRSxDQUFDLFFBQWEsRUFBRSxNQUFzQixFQUFFLEVBQUU7Z0JBQ3RELE1BQU0sV0FBVyxHQUNmLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2hCLGtDQUFrQztvQkFDbEMsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7b0JBQ25DLE9BQU8sV0FBVyxDQUFDO2lCQUNwQjtnQkFDRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTtvQkFDbkMsa0NBQWtDO29CQUNsQyxPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxNQUFNLGFBQWEsR0FDakIsTUFBTSxDQUFDLFNBQVM7b0JBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRTt3QkFDcEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlGLElBQUksS0FBSyxFQUFFO29CQUNULE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUNELDZGQUE2RjtnQkFDN0YseURBQXlEO2dCQUN6RCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7WUFDRCxTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFHQSxJQUFJLENBQUMsT0FBTyxtQ0FDUCxJQUFJLENBQUMsT0FBTyxHQUNaLE9BQU8sQ0FDWCxDQUFDO1FBQ0YsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELGVBQWUsQ0FBQyxTQUFxQjtRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsbUNBQ2pCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEdBQzlCLFNBQVMsQ0FDYixDQUFDO1FBQ0YsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELHlCQUF5QjtRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hELElBQUksR0FBRyxJQUFJLGdCQUFnQixFQUFFO2dCQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUNBQ3RCLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FDL0IsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF2RUYsVUFBVTs7OzRDQThDSSxNQUFNLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSUNvbmZpZ09wdGlvbnMsIElQYXJ0aWFsQ29uZmlnT3B0aW9ucywgSVByb3ZpZGVycyB9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0UHJvdmlkZXJzIH0gZnJvbSAnLi9jb25maWctcHJvdmlkZXJzJztcclxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcclxuXHJcbmV4cG9ydCBjb25zdCBDT05GSUdfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdjb25maWcub3B0aW9ucycpO1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcclxuICBwdWJsaWMgb3B0aW9ucyA9IHtcclxuICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXHJcbiAgICB0b2tlblJvb3Q6IG51bGwsXHJcbiAgICBiYXNlVXJsOiAnLycsXHJcbiAgICBsb2dpblVybDogJy9hdXRoL2xvZ2luJyxcclxuICAgIHNpZ251cFVybDogJy9hdXRoL3NpZ251cCcsXHJcbiAgICB1bmxpbmtVcmw6ICcvYXV0aC91bmxpbmsvJyxcclxuICAgIHRva2VuTmFtZTogJ3Rva2VuJyxcclxuICAgIHRva2VuU2VwYXJhdG9yOiAnXycsXHJcbiAgICB0b2tlblByZWZpeDogJ25nMi11aS1hdXRoJyxcclxuICAgIGF1dGhIZWFkZXI6ICdBdXRob3JpemF0aW9uJyxcclxuICAgIGF1dGhUb2tlbjogJ0JlYXJlcicsXHJcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRSxcclxuICAgIGNvcmRvdmE6IHVuZGVmaW5lZCxcclxuICAgIHJlc29sdmVUb2tlbjogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHtcclxuICAgICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsIHwgdW5kZWZpbmVkID1cclxuICAgICAgICByZXNwb25zZSAmJiAocmVzcG9uc2UuYWNjZXNzX3Rva2VuIHx8IHJlc3BvbnNlLnRva2VuIHx8IHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICBpZiAoIWFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjY2Vzc1Rva2VuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHRva2VuUm9vdERhdGEgPVxyXG4gICAgICAgIGNvbmZpZy50b2tlblJvb3QgJiZcclxuICAgICAgICBjb25maWcudG9rZW5Sb290LnNwbGl0KCcuJykucmVkdWNlKChvOiBhbnksIHg6IGFueSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG9beF07XHJcbiAgICAgICAgfSwgYWNjZXNzVG9rZW4pO1xyXG4gICAgICBjb25zdCB0b2tlbiA9IHRva2VuUm9vdERhdGEgPyB0b2tlblJvb3REYXRhW2NvbmZpZy50b2tlbk5hbWVdIDogYWNjZXNzVG9rZW5bY29uZmlnLnRva2VuTmFtZV07XHJcbiAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgfVxyXG4gICAgICAvLyBjb25zdCB0b2tlblBhdGggPSB0aGlzLnRva2VuUm9vdCA/IHRoaXMudG9rZW5Sb290ICsgJy4nICsgdGhpcy50b2tlbk5hbWUgOiB0aGlzLnRva2VuTmFtZTtcclxuICAgICAgLy8gY29uc29sZS53YXJuKCdFeHBlY3RpbmcgYSB0b2tlbiBuYW1lZCBcIicgKyB0b2tlblBhdGgpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICBwcm92aWRlcnM6IHt9XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChDT05GSUdfT1BUSU9OUykgb3B0aW9uczogSVBhcnRpYWxDb25maWdPcHRpb25zKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgIC4uLnRoaXMub3B0aW9ucyxcclxuICAgICAgLi4ub3B0aW9uc1xyXG4gICAgfTtcclxuICAgIHRoaXMubWVyZ2VXaXRoRGVmYXVsdFByb3ZpZGVycygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUHJvdmlkZXJzKHByb3ZpZGVyczogSVByb3ZpZGVycykge1xyXG4gICAgdGhpcy5vcHRpb25zLnByb3ZpZGVycyA9IHtcclxuICAgICAgLi4uKHRoaXMub3B0aW9ucy5wcm92aWRlcnMgfHwge30pLFxyXG4gICAgICAuLi5wcm92aWRlcnNcclxuICAgIH07XHJcbiAgICB0aGlzLm1lcmdlV2l0aERlZmF1bHRQcm92aWRlcnMoKTtcclxuICB9XHJcblxyXG4gIG1lcmdlV2l0aERlZmF1bHRQcm92aWRlcnMoKSB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMucHJvdmlkZXJzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGlmIChrZXkgaW4gZGVmYXVsdFByb3ZpZGVycykge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wcm92aWRlcnNba2V5XSA9IHtcclxuICAgICAgICAgIC4uLmRlZmF1bHRQcm92aWRlcnNba2V5XSxcclxuICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5wcm92aWRlcnNba2V5XVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=