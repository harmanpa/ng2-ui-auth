import { getWindowOrigin } from './utils';
const ɵ0 = () => encodeURIComponent(Math.random()
    .toString(36)
    .substr(2)), ɵ1 = () => encodeURIComponent(Math.random()
    .toString(36)
    .substr(2));
export const defaultProviders = {
    facebook: {
        name: 'facebook',
        url: '/auth/facebook',
        redirectUri: `${getWindowOrigin()}/`,
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
        redirectUri: `${getWindowOrigin()}/`,
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
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9wZXRlci9EZXZlbG9wbWVudC9uZzItdWktYXV0aC9wcm9qZWN0cy9uZzItdWktYXV0aC9zcmMvIiwic291cmNlcyI6WyJsaWIvY29uZmlnLXByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO1dBaUMvQixHQUFHLEVBQUUsQ0FDVixrQkFBa0IsQ0FDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtLQUNWLFFBQVEsQ0FBQyxFQUFFLENBQUM7S0FDWixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ2IsT0F1RkksR0FBRyxFQUFFLENBQ1Ysa0JBQWtCLENBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUU7S0FDVixRQUFRLENBQUMsRUFBRSxDQUFDO0tBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNiO0FBaElQLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFlO0lBQzFDLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxVQUFVO1FBQ2hCLEdBQUcsRUFBRSxnQkFBZ0I7UUFDckIsV0FBVyxFQUFFLEdBQUcsZUFBZSxFQUFFLEdBQUc7UUFDcEMscUJBQXFCLEVBQUUsNENBQTRDO1FBQ25FLG1CQUFtQixFQUFFO1lBQ25CLE9BQU8sRUFBRSxPQUFPO1NBQ2pCO1FBQ0QsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2hCLGNBQWMsRUFBRSxHQUFHO1FBQ25CLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtLQUMxQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsR0FBRyxFQUFFLGNBQWM7UUFDbkIscUJBQXFCLEVBQUUsOENBQThDO1FBQ3JFLG1CQUFtQixFQUFFO1lBQ25CLE9BQU8sRUFBRSxPQUFPO1lB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LE1BQU0sRUFBRSxHQUFHLEVBQUU7S0FDMUM7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsV0FBVztRQUNqQixHQUFHLEVBQUUsaUJBQWlCO1FBQ3RCLHFCQUFxQixFQUFFLDZDQUE2QztRQUNwRSxXQUFXLEVBQUUsR0FBRyxlQUFlLEVBQUUsR0FBRztRQUNwQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDaEIsY0FBYyxFQUFFLEdBQUc7UUFDbkIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0tBQzNDO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFNBQVM7UUFDZixHQUFHLEVBQUUsZUFBZTtRQUNwQixxQkFBcUIsRUFBRSx3Q0FBd0M7UUFDL0QsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLGlCQUFpQixDQUFDO1FBQzlCLGNBQWMsRUFBRSxHQUFHO1FBQ25CLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtRQUN6QyxLQUFLLElBS0Y7S0FDSjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUHJvdmlkZXJzIH0gZnJvbSAnLi4vcHVibGljX2FwaSc7XHJcbmltcG9ydCB7IGdldFdpbmRvd09yaWdpbiB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRQcm92aWRlcnM6IElQcm92aWRlcnMgPSB7XHJcbiAgZmFjZWJvb2s6IHtcclxuICAgIG5hbWU6ICdmYWNlYm9vaycsXHJcbiAgICB1cmw6ICcvYXV0aC9mYWNlYm9vaycsXHJcbiAgICByZWRpcmVjdFVyaTogYCR7Z2V0V2luZG93T3JpZ2luKCl9L2AsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxyXG4gICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICBkaXNwbGF5OiAncG9wdXAnXHJcbiAgICB9LFxyXG4gICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1ODAsIGhlaWdodDogNDAwIH1cclxuICB9LFxyXG4gIGdvb2dsZToge1xyXG4gICAgbmFtZTogJ2dvb2dsZScsXHJcbiAgICB1cmw6ICcvYXV0aC9nb29nbGUnLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3YyL2F1dGgnLFxyXG4gICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICBwcm9tcHQ6IHVuZGVmaW5lZCxcclxuICAgICAgbG9naW5faGludDogdW5kZWZpbmVkLFxyXG4gICAgICBhY2Nlc3NfdHlwZTogdW5kZWZpbmVkLFxyXG4gICAgICBpbmNsdWRlX2dyYW50ZWRfc2NvcGVzOiB1bmRlZmluZWQsXHJcbiAgICAgICdvcGVuaWQucmVhbG0nOiB1bmRlZmluZWQsXHJcbiAgICAgIGhkOiB1bmRlZmluZWRcclxuICAgIH0sXHJcbiAgICBzY29wZTogWydvcGVuaWQnLCAnZW1haWwnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0NTIsIGhlaWdodDogNjMzIH0sXHJcbiAgICBzdGF0ZTogKCkgPT5cclxuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgIE1hdGgucmFuZG9tKClcclxuICAgICAgICAgIC50b1N0cmluZygzNilcclxuICAgICAgICAgIC5zdWJzdHIoMilcclxuICAgICAgKVxyXG4gIH0sXHJcbiAgZ2l0aHViOiB7XHJcbiAgICBuYW1lOiAnZ2l0aHViJyxcclxuICAgIHVybDogJy9hdXRoL2dpdGh1YicsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYXV0aG9yaXplJyxcclxuICAgIHNjb3BlOiBbJ3VzZXI6ZW1haWwnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDIwLCBoZWlnaHQ6IDYxOCB9XHJcbiAgfSxcclxuICBpbnN0YWdyYW06IHtcclxuICAgIG5hbWU6ICdpbnN0YWdyYW0nLFxyXG4gICAgdXJsOiAnL2F1dGgvaW5zdGFncmFtJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vb2F1dGgvYXV0aG9yaXplJyxcclxuICAgIHNjb3BlOiBbJ2Jhc2ljJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJysnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJ1xyXG4gIH0sXHJcbiAgbGlua2VkaW46IHtcclxuICAgIG5hbWU6ICdsaW5rZWRpbicsXHJcbiAgICB1cmw6ICcvYXV0aC9saW5rZWRpbicsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcclxuICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTI3LCBoZWlnaHQ6IDU4MiB9LFxyXG4gICAgc3RhdGU6ICdTVEFURSdcclxuICB9LFxyXG4gIHR3aXR0ZXI6IHtcclxuICAgIG5hbWU6ICd0d2l0dGVyJyxcclxuICAgIHVybDogJy9hdXRoL3R3aXR0ZXInLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdHRlci5jb20vb2F1dGgvYXV0aGVudGljYXRlJyxcclxuICAgIG9hdXRoVHlwZTogJzEuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDQ5NSwgaGVpZ2h0OiA2NDUgfVxyXG4gIH0sXHJcbiAgdHdpdGNoOiB7XHJcbiAgICBuYW1lOiAndHdpdGNoJyxcclxuICAgIHVybDogJy9hdXRoL3R3aXRjaCcsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0Y2gudHYva3Jha2VuL29hdXRoMi9hdXRob3JpemUnLFxyXG4gICAgc2NvcGU6IFsndXNlcl9yZWFkJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xyXG4gICAgICBkaXNwbGF5OiAncG9wdXAnXHJcbiAgICB9LFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDU2MCB9XHJcbiAgfSxcclxuICBsaXZlOiB7XHJcbiAgICBuYW1lOiAnbGl2ZScsXHJcbiAgICB1cmw6ICcvYXV0aC9saXZlJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vbG9naW4ubGl2ZS5jb20vb2F1dGgyMF9hdXRob3JpemUuc3JmJyxcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgZGlzcGxheTogJ3BvcHVwJ1xyXG4gICAgfSxcclxuICAgIHNjb3BlOiBbJ3dsLmVtYWlscyddLFxyXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfVxyXG4gIH0sXHJcbiAgeWFob286IHtcclxuICAgIG5hbWU6ICd5YWhvbycsXHJcbiAgICB1cmw6ICcvYXV0aC95YWhvbycsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgyL3JlcXVlc3RfYXV0aCcsXHJcbiAgICBzY29wZTogW10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTU5LCBoZWlnaHQ6IDUxOSB9XHJcbiAgfSxcclxuICBiaXRidWNrZXQ6IHtcclxuICAgIG5hbWU6ICdiaXRidWNrZXQnLFxyXG4gICAgdXJsOiAnL2F1dGgvYml0YnVja2V0JyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYml0YnVja2V0Lm9yZy9zaXRlL29hdXRoMi9hdXRob3JpemUnLFxyXG4gICAgcmVkaXJlY3RVcmk6IGAke2dldFdpbmRvd09yaWdpbigpfS9gLFxyXG4gICAgc2NvcGU6IFsnZW1haWwnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDI4LCBoZWlnaHQ6IDUyOSB9XHJcbiAgfSxcclxuICBzcG90aWZ5OiB7XHJcbiAgICBuYW1lOiAnc3BvdGlmeScsXHJcbiAgICB1cmw6ICcvYXV0aC9zcG90aWZ5JyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuc3BvdGlmeS5jb20vYXV0aG9yaXplJyxcclxuICAgIHNjb3BlOiBbJycsICd1c2VyLXJlYWQtZW1haWwnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTMwIH0sXHJcbiAgICBzdGF0ZTogKCkgPT5cclxuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICAgIE1hdGgucmFuZG9tKClcclxuICAgICAgICAgIC50b1N0cmluZygzNilcclxuICAgICAgICAgIC5zdWJzdHIoMilcclxuICAgICAgKVxyXG4gIH1cclxufTtcclxuIl19