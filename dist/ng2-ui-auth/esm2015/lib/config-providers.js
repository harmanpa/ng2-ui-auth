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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL2NvbmZpZy1wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQztXQWlDL0IsR0FBRyxFQUFFLENBQ1Ysa0JBQWtCLENBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUU7S0FDVixRQUFRLENBQUMsRUFBRSxDQUFDO0tBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNiLE9BdUZJLEdBQUcsRUFBRSxDQUNWLGtCQUFrQixDQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFO0tBQ1YsUUFBUSxDQUFDLEVBQUUsQ0FBQztLQUNaLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDYjtBQWhJUCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBZTtJQUMxQyxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsVUFBVTtRQUNoQixHQUFHLEVBQUUsZ0JBQWdCO1FBQ3JCLFdBQVcsRUFBRSxHQUFHLGVBQWUsRUFBRSxHQUFHO1FBQ3BDLHFCQUFxQixFQUFFLDRDQUE0QztRQUNuRSxtQkFBbUIsRUFBRTtZQUNuQixPQUFPLEVBQUUsT0FBTztTQUNqQjtRQUNELEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNoQixjQUFjLEVBQUUsR0FBRztRQUNuQixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7S0FDMUM7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLEdBQUcsRUFBRSxjQUFjO1FBQ25CLHFCQUFxQixFQUFFLDhDQUE4QztRQUNyRSxtQkFBbUIsRUFBRTtZQUNuQixPQUFPLEVBQUUsT0FBTztZQUNoQixNQUFNLEVBQUUsU0FBUztZQUNqQixVQUFVLEVBQUUsU0FBUztZQUNyQixX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SUFBSSxFQUFFLFdBQVc7UUFDakIsR0FBRyxFQUFFLGlCQUFpQjtRQUN0QixxQkFBcUIsRUFBRSw2Q0FBNkM7UUFDcEUsV0FBVyxFQUFFLEdBQUcsZUFBZSxFQUFFLEdBQUc7UUFDcEMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2hCLGNBQWMsRUFBRSxHQUFHO1FBQ25CLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtLQUMzQztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxTQUFTO1FBQ2YsR0FBRyxFQUFFLGVBQWU7UUFDcEIscUJBQXFCLEVBQUUsd0NBQXdDO1FBQy9ELEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQztRQUM5QixjQUFjLEVBQUUsR0FBRztRQUNuQixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7UUFDekMsS0FBSyxJQUtGO0tBQ0o7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVByb3ZpZGVycyB9IGZyb20gJy4uL3B1YmxpY19hcGknO1xyXG5pbXBvcnQgeyBnZXRXaW5kb3dPcmlnaW4gfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvdmlkZXJzOiBJUHJvdmlkZXJzID0ge1xyXG4gIGZhY2Vib29rOiB7XHJcbiAgICBuYW1lOiAnZmFjZWJvb2snLFxyXG4gICAgdXJsOiAnL2F1dGgvZmFjZWJvb2snLFxyXG4gICAgcmVkaXJlY3RVcmk6IGAke2dldFdpbmRvd09yaWdpbigpfS9gLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3YyLjUvZGlhbG9nL29hdXRoJyxcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgZGlzcGxheTogJ3BvcHVwJ1xyXG4gICAgfSxcclxuICAgIHNjb3BlOiBbJ2VtYWlsJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQwMCB9XHJcbiAgfSxcclxuICBnb29nbGU6IHtcclxuICAgIG5hbWU6ICdnb29nbGUnLFxyXG4gICAgdXJsOiAnL2F1dGgvZ29vZ2xlJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi92Mi9hdXRoJyxcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgcHJvbXB0OiB1bmRlZmluZWQsXHJcbiAgICAgIGxvZ2luX2hpbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgYWNjZXNzX3R5cGU6IHVuZGVmaW5lZCxcclxuICAgICAgaW5jbHVkZV9ncmFudGVkX3Njb3BlczogdW5kZWZpbmVkLFxyXG4gICAgICAnb3BlbmlkLnJlYWxtJzogdW5kZWZpbmVkLFxyXG4gICAgICBoZDogdW5kZWZpbmVkXHJcbiAgICB9LFxyXG4gICAgc2NvcGU6IFsnb3BlbmlkJywgJ2VtYWlsJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDUyLCBoZWlnaHQ6IDYzMyB9LFxyXG4gICAgc3RhdGU6ICgpID0+XHJcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgICBNYXRoLnJhbmRvbSgpXHJcbiAgICAgICAgICAudG9TdHJpbmcoMzYpXHJcbiAgICAgICAgICAuc3Vic3RyKDIpXHJcbiAgICAgIClcclxuICB9LFxyXG4gIGdpdGh1Yjoge1xyXG4gICAgbmFtZTogJ2dpdGh1YicsXHJcbiAgICB1cmw6ICcvYXV0aC9naXRodWInLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9naXRodWIuY29tL2xvZ2luL29hdXRoL2F1dGhvcml6ZScsXHJcbiAgICBzY29wZTogWyd1c2VyOmVtYWlsJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogMTAyMCwgaGVpZ2h0OiA2MTggfVxyXG4gIH0sXHJcbiAgaW5zdGFncmFtOiB7XHJcbiAgICBuYW1lOiAnaW5zdGFncmFtJyxcclxuICAgIHVybDogJy9hdXRoL2luc3RhZ3JhbScsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS5pbnN0YWdyYW0uY29tL29hdXRoL2F1dGhvcml6ZScsXHJcbiAgICBzY29wZTogWydiYXNpYyddLFxyXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcrJyxcclxuICAgIG9hdXRoVHlwZTogJzIuMCdcclxuICB9LFxyXG4gIGxpbmtlZGluOiB7XHJcbiAgICBuYW1lOiAnbGlua2VkaW4nLFxyXG4gICAgdXJsOiAnL2F1dGgvbGlua2VkaW4nLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvbicsXHJcbiAgICBzY29wZTogWydyX2VtYWlsYWRkcmVzcyddLFxyXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUyNywgaGVpZ2h0OiA1ODIgfSxcclxuICAgIHN0YXRlOiAnU1RBVEUnXHJcbiAgfSxcclxuICB0d2l0dGVyOiB7XHJcbiAgICBuYW1lOiAndHdpdHRlcicsXHJcbiAgICB1cmw6ICcvYXV0aC90d2l0dGVyJyxcclxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLnR3aXR0ZXIuY29tL29hdXRoL2F1dGhlbnRpY2F0ZScsXHJcbiAgICBvYXV0aFR5cGU6ICcxLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0OTUsIGhlaWdodDogNjQ1IH1cclxuICB9LFxyXG4gIHR3aXRjaDoge1xyXG4gICAgbmFtZTogJ3R3aXRjaCcsXHJcbiAgICB1cmw6ICcvYXV0aC90d2l0Y2gnLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdGNoLnR2L2tyYWtlbi9vYXV0aDIvYXV0aG9yaXplJyxcclxuICAgIHNjb3BlOiBbJ3VzZXJfcmVhZCddLFxyXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcclxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcclxuICAgICAgZGlzcGxheTogJ3BvcHVwJ1xyXG4gICAgfSxcclxuICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfVxyXG4gIH0sXHJcbiAgbGl2ZToge1xyXG4gICAgbmFtZTogJ2xpdmUnLFxyXG4gICAgdXJsOiAnL2F1dGgvbGl2ZScsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfYXV0aG9yaXplLnNyZicsXHJcbiAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XHJcbiAgICAgIGRpc3BsYXk6ICdwb3B1cCdcclxuICAgIH0sXHJcbiAgICBzY29wZTogWyd3bC5lbWFpbHMnXSxcclxuICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXHJcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxyXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTYwIH1cclxuICB9LFxyXG4gIHlhaG9vOiB7XHJcbiAgICBuYW1lOiAneWFob28nLFxyXG4gICAgdXJsOiAnL2F1dGgveWFob28nLFxyXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoMi9yZXF1ZXN0X2F1dGgnLFxyXG4gICAgc2NvcGU6IFtdLFxyXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcclxuICAgIG9hdXRoVHlwZTogJzIuMCcsXHJcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU1OSwgaGVpZ2h0OiA1MTkgfVxyXG4gIH0sXHJcbiAgYml0YnVja2V0OiB7XHJcbiAgICBuYW1lOiAnYml0YnVja2V0JyxcclxuICAgIHVybDogJy9hdXRoL2JpdGJ1Y2tldCcsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2JpdGJ1Y2tldC5vcmcvc2l0ZS9vYXV0aDIvYXV0aG9yaXplJyxcclxuICAgIHJlZGlyZWN0VXJpOiBgJHtnZXRXaW5kb3dPcmlnaW4oKX0vYCxcclxuICAgIHNjb3BlOiBbJ2VtYWlsJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogMTAyOCwgaGVpZ2h0OiA1MjkgfVxyXG4gIH0sXHJcbiAgc3BvdGlmeToge1xyXG4gICAgbmFtZTogJ3Nwb3RpZnknLFxyXG4gICAgdXJsOiAnL2F1dGgvc3BvdGlmeScsXHJcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLnNwb3RpZnkuY29tL2F1dGhvcml6ZScsXHJcbiAgICBzY29wZTogWycnLCAndXNlci1yZWFkLWVtYWlsJ10sXHJcbiAgICBzY29wZURlbGltaXRlcjogJywnLFxyXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcclxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDUzMCB9LFxyXG4gICAgc3RhdGU6ICgpID0+XHJcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgICBNYXRoLnJhbmRvbSgpXHJcbiAgICAgICAgICAudG9TdHJpbmcoMzYpXHJcbiAgICAgICAgICAuc3Vic3RyKDIpXHJcbiAgICAgIClcclxuICB9XHJcbn07XHJcbiJdfQ==