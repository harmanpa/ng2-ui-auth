import { Ng2UiAuthModule } from './lib/ng2-ui-auth.module';
import { LocalService } from './lib/local.service';
import { Oauth2Service } from './lib/oauth2.service';
import { Oauth1Service } from './lib/oauth1.service';
import { PopupService } from './lib/popup.service';
import { OauthService } from './lib/oauth.service';
import { SharedService } from './lib/shared.service';
import { StorageService } from './lib/storage-service';
import { BrowserStorageService } from './lib/browser-storage.service';
import { AuthService } from './lib/auth.service';
import { ConfigService, CONFIG_OPTIONS } from './lib/config.service';
import { JwtInterceptor } from './lib/interceptor.service';
import { StorageType } from './lib/storage-type.enum';
/*
 * Public API Surface of ng2-ui-auth
 */
export { Ng2UiAuthModule, LocalService, Oauth2Service, Oauth1Service, PopupService, OauthService, SharedService, StorageService, BrowserStorageService, AuthService, ConfigService, JwtInterceptor, CONFIG_OPTIONS, StorageType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsicHVibGljX2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdEQ7O0dBRUc7QUFDSCxPQUFPLEVBQ0wsZUFBZSxFQUNmLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxFQUNiLFlBQVksRUFDWixZQUFZLEVBQ1osYUFBYSxFQUNiLGNBQWMsRUFDZCxxQkFBcUIsRUFDckIsV0FBVyxFQUNYLGFBQWEsRUFDYixjQUFjLEVBQ2QsY0FBYyxFQUVkLFdBQVcsRUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmcyVWlBdXRoTW9kdWxlIH0gZnJvbSAnLi9saWIvbmcyLXVpLWF1dGgubW9kdWxlJztcclxuaW1wb3J0IHsgTG9jYWxTZXJ2aWNlIH0gZnJvbSAnLi9saWIvbG9jYWwuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoMlNlcnZpY2UgfSBmcm9tICcuL2xpYi9vYXV0aDIuc2VydmljZSc7XHJcbmltcG9ydCB7IE9hdXRoMVNlcnZpY2UgfSBmcm9tICcuL2xpYi9vYXV0aDEuc2VydmljZSc7XHJcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vbGliL3BvcHVwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYXV0aFNlcnZpY2UgfSBmcm9tICcuL2xpYi9vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vbGliL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL2xpYi9zdG9yYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCcm93c2VyU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL2xpYi9icm93c2VyLXN0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9saWIvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSwgQ09ORklHX09QVElPTlMgfSBmcm9tICcuL2xpYi9jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IEp3dEludGVyY2VwdG9yIH0gZnJvbSAnLi9saWIvaW50ZXJjZXB0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IElQcm92aWRlcnMgfSBmcm9tICcuL2xpYi9jb25maWctaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9saWIvc3RvcmFnZS10eXBlLmVudW0nO1xyXG5cclxuLypcclxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIG5nMi11aS1hdXRoXHJcbiAqL1xyXG5leHBvcnQge1xyXG4gIE5nMlVpQXV0aE1vZHVsZSxcclxuICBMb2NhbFNlcnZpY2UsXHJcbiAgT2F1dGgyU2VydmljZSxcclxuICBPYXV0aDFTZXJ2aWNlLFxyXG4gIFBvcHVwU2VydmljZSxcclxuICBPYXV0aFNlcnZpY2UsXHJcbiAgU2hhcmVkU2VydmljZSxcclxuICBTdG9yYWdlU2VydmljZSxcclxuICBCcm93c2VyU3RvcmFnZVNlcnZpY2UsXHJcbiAgQXV0aFNlcnZpY2UsXHJcbiAgQ29uZmlnU2VydmljZSxcclxuICBKd3RJbnRlcmNlcHRvcixcclxuICBDT05GSUdfT1BUSU9OUyxcclxuICBJUHJvdmlkZXJzLFxyXG4gIFN0b3JhZ2VUeXBlXHJcbn07XHJcbiJdfQ==