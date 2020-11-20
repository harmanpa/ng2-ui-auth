import { __assign, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { empty, fromEvent, interval, merge, Observable, of, throwError } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { getWindowOrigin } from './utils';
var PopupService = /** @class */ (function () {
    function PopupService() {
    }
    PopupService.prototype.open = function (url, options, cordova) {
        if (cordova === void 0) { cordova = this.isCordovaApp(); }
        var stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
        var windowName = cordova ? '_blank' : options.name;
        var popupWindow = typeof window !== 'undefined' ? window.open(url, windowName, stringifiedOptions) : null;
        if (popupWindow) {
            if (popupWindow.focus) {
                popupWindow.focus();
            }
            return of(popupWindow);
        }
        return empty();
    };
    PopupService.prototype.waitForClose = function (popupWindow, cordova, redirectUri) {
        if (cordova === void 0) { cordova = this.isCordovaApp(); }
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        return cordova ? this.eventListener(popupWindow, redirectUri) : this.pollPopup(popupWindow, redirectUri);
    };
    PopupService.prototype.eventListener = function (popupWindow, redirectUri) {
        var _this = this;
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        if (!popupWindow) {
            throw new Error('Popup was not created');
        }
        return merge(fromEvent(popupWindow, 'exit').pipe(delay(100), map(function () {
            throw new Error('Authentication Canceled');
        })), fromEvent(popupWindow, 'loadstart')).pipe(switchMap(function (event) {
            if (!popupWindow || popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return empty();
            }
            var parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                var queryParams = parser.search.substring(1).replace(/\/$/, '');
                var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                var hash = _this.parseQueryString(hashParams);
                var qs = _this.parseQueryString(queryParams);
                var allParams = __assign(__assign({}, qs), hash);
                popupWindow.close();
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return empty();
        }), take(1));
    };
    PopupService.prototype.pollPopup = function (popupWindow, redirectUri) {
        var _this = this;
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        return interval(50).pipe(switchMap(function () {
            if (!popupWindow || popupWindow.closed) {
                return throwError(new Error('Authentication Canceled'));
            }
            var popupWindowOrigin = getWindowOrigin(popupWindow);
            if (popupWindowOrigin &&
                (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
                (popupWindow.location.search || popupWindow.location.hash)) {
                var queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                var hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                var hash = _this.parseQueryString(hashParams);
                var qs = _this.parseQueryString(queryParams);
                popupWindow.close();
                var allParams = __assign(__assign({}, qs), hash);
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return empty();
        }), take(1));
    };
    PopupService.prototype.prepareOptions = function (options) {
        options = options || {};
        var width = options.width || 500;
        var height = options.height || 500;
        return __assign({ width: width,
            height: height, left: window.screenX + (window.outerWidth - width) / 2, top: window.screenY + (window.outerHeight - height) / 2.5, toolbar: options.visibleToolbar ? 'yes' : 'no' }, options);
    };
    PopupService.prototype.stringifyOptions = function (options) {
        return Object.keys(options)
            .map(function (key) { return (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]); })
            .join(',');
    };
    PopupService.prototype.parseQueryString = function (joinedKeyValue) {
        var key;
        var value;
        return joinedKeyValue.split('&').reduce(function (obj, keyValue) {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }, {});
    };
    PopupService.prototype.isCordovaApp = function () {
        return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
    };
    PopupService = __decorate([
        Injectable()
    ], PopupService);
    return PopupService;
}());
export { PopupService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL3BvcHVwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRixPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUkxQztJQUFBO0lBd0lBLENBQUM7SUF2SVEsMkJBQUksR0FBWCxVQUFZLEdBQVcsRUFBRSxPQUF3QyxFQUFFLE9BQTZCO1FBQTdCLHdCQUFBLEVBQUEsVUFBVSxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQzlGLElBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDNUYsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFFckQsSUFBTSxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTVHLElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNyQixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDckI7WUFD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RyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0lBRU8sdUNBQWdCLEdBQXhCLFVBQXlCLGNBQXNCO1FBQzdDLElBQUksR0FBRyxDQUFDO1FBQ1IsSUFBSSxLQUFLLENBQUM7UUFDVixPQUFPLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUNyQyxVQUFDLEdBQUcsRUFBRSxRQUFRO1lBQ1osSUFBSSxRQUFRLEVBQUU7Z0JBQ1osS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzthQUNsRjtZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxFQUNELEVBQW9DLENBQ3JDLENBQUM7SUFDSixDQUFDO0lBRU8sbUNBQVksR0FBcEI7UUFDRSxPQUFPLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUgsQ0FBQztJQXZJVSxZQUFZO1FBRHhCLFVBQVUsRUFBRTtPQUNBLFlBQVksQ0F3SXhCO0lBQUQsbUJBQUM7Q0FBQSxBQXhJRCxJQXdJQztTQXhJWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBlbXB0eSwgZnJvbUV2ZW50LCBpbnRlcnZhbCwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlbGF5LCBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSU9hdXRoMU9wdGlvbnMsIElPYXV0aDJPcHRpb25zLCBJUG9wdXBPcHRpb25zIH0gZnJvbSAnLi9jb25maWctaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IGdldFdpbmRvd09yaWdpbiB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuZGVjbGFyZSBjb25zdCBjb3Jkb3ZhOiBhbnk7XHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZSB7XHJcbiAgcHVibGljIG9wZW4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IElPYXV0aDJPcHRpb25zIHwgSU9hdXRoMU9wdGlvbnMsIGNvcmRvdmEgPSB0aGlzLmlzQ29yZG92YUFwcCgpKSB7XHJcbiAgICBjb25zdCBzdHJpbmdpZmllZE9wdGlvbnMgPSB0aGlzLnN0cmluZ2lmeU9wdGlvbnModGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zLnBvcHVwT3B0aW9ucykpO1xyXG4gICAgY29uc3Qgd2luZG93TmFtZSA9IGNvcmRvdmEgPyAnX2JsYW5rJyA6IG9wdGlvbnMubmFtZTtcclxuXHJcbiAgICBjb25zdCBwb3B1cFdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93Lm9wZW4odXJsLCB3aW5kb3dOYW1lLCBzdHJpbmdpZmllZE9wdGlvbnMpIDogbnVsbDtcclxuXHJcbiAgICBpZiAocG9wdXBXaW5kb3cpIHtcclxuICAgICAgaWYgKHBvcHVwV2luZG93LmZvY3VzKSB7XHJcbiAgICAgICAgcG9wdXBXaW5kb3cuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb2YocG9wdXBXaW5kb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVtcHR5KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgd2FpdEZvckNsb3NlKHBvcHVwV2luZG93OiBXaW5kb3csIGNvcmRvdmEgPSB0aGlzLmlzQ29yZG92YUFwcCgpLCByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpKSB7XHJcbiAgICByZXR1cm4gY29yZG92YSA/IHRoaXMuZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdywgcmVkaXJlY3RVcmkpIDogdGhpcy5wb2xsUG9wdXAocG9wdXBXaW5kb3csIHJlZGlyZWN0VXJpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdzogV2luZG93LCByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpKSB7XHJcbiAgICBpZiAoIXBvcHVwV2luZG93KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUG9wdXAgd2FzIG5vdCBjcmVhdGVkJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVyZ2UoXHJcbiAgICAgIGZyb21FdmVudDxFdmVudD4ocG9wdXBXaW5kb3csICdleGl0JykucGlwZShcclxuICAgICAgICBkZWxheSgxMDApLFxyXG4gICAgICAgIG1hcCgoKSA9PiB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKSxcclxuICAgICAgZnJvbUV2ZW50KHBvcHVwV2luZG93LCAnbG9hZHN0YXJ0JylcclxuICAgICkucGlwZShcclxuICAgICAgc3dpdGNoTWFwKChldmVudDogRXZlbnQgJiB7IHVybDogc3RyaW5nIH0pID0+IHtcclxuICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xyXG4gICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3cobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LnVybC5pbmRleE9mKHJlZGlyZWN0VXJpKSAhPT0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIGVtcHR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgcGFyc2VyLmhyZWYgPSBldmVudC51cmw7XHJcblxyXG4gICAgICAgIGlmIChwYXJzZXIuc2VhcmNoIHx8IHBhcnNlci5oYXNoKSB7XHJcbiAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcGFyc2VyLmhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGhhc2hQYXJhbXMpO1xyXG4gICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXMpO1xyXG4gICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xyXG5cclxuICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5KCk7XHJcbiAgICAgIH0pLFxyXG4gICAgICB0YWtlKDEpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwb2xsUG9wdXAocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSkge1xyXG4gICAgcmV0dXJuIGludGVydmFsKDUwKS5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xyXG4gICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcG9wdXBXaW5kb3dPcmlnaW4gPSBnZXRXaW5kb3dPcmlnaW4ocG9wdXBXaW5kb3cpO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBwb3B1cFdpbmRvd09yaWdpbiAmJlxyXG4gICAgICAgICAgKHJlZGlyZWN0VXJpLmluZGV4T2YocG9wdXBXaW5kb3dPcmlnaW4pID09PSAwIHx8IHBvcHVwV2luZG93T3JpZ2luLmluZGV4T2YocmVkaXJlY3RVcmkpID09PSAwKSAmJlxyXG4gICAgICAgICAgKHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwb3B1cFdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XHJcbiAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvW1xcLyRdLywgJycpO1xyXG4gICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoUGFyYW1zKTtcclxuICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XHJcbiAgICAgICAgICBjb25zdCBhbGxQYXJhbXMgPSB7IC4uLnFzLCAuLi5oYXNoIH07XHJcbiAgICAgICAgICBpZiAoYWxsUGFyYW1zLmVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IGFsbFBhcmFtcy5lcnJvcjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihhbGxQYXJhbXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW1wdHkoKTtcclxuICAgICAgfSksXHJcbiAgICAgIHRha2UoMSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHByZXBhcmVPcHRpb25zKG9wdGlvbnM/OiBJUG9wdXBPcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCA1MDA7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA1MDA7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICBsZWZ0OiB3aW5kb3cuc2NyZWVuWCArICh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpZHRoKSAvIDIsXHJcbiAgICAgIHRvcDogd2luZG93LnNjcmVlblkgKyAod2luZG93Lm91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDIuNSxcclxuICAgICAgdG9vbGJhcjogb3B0aW9ucy52aXNpYmxlVG9vbGJhciA/ICd5ZXMnIDogJ25vJyxcclxuICAgICAgLi4ub3B0aW9uc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RyaW5naWZ5T3B0aW9ucyhvcHRpb25zOiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQgfSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgIC5tYXAoa2V5ID0+IChvcHRpb25zW2tleV0gPT09IG51bGwgfHwgb3B0aW9uc1trZXldID09PSB1bmRlZmluZWQgPyBrZXkgOiBrZXkgKyAnPScgKyBvcHRpb25zW2tleV0pKVxyXG4gICAgICAuam9pbignLCcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVF1ZXJ5U3RyaW5nKGpvaW5lZEtleVZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgbGV0IGtleTtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIHJldHVybiBqb2luZWRLZXlWYWx1ZS5zcGxpdCgnJicpLnJlZHVjZShcclxuICAgICAgKG9iaiwga2V5VmFsdWUpID0+IHtcclxuICAgICAgICBpZiAoa2V5VmFsdWUpIHtcclxuICAgICAgICAgIHZhbHVlID0ga2V5VmFsdWUuc3BsaXQoJz0nKTtcclxuICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVswXSk7XHJcbiAgICAgICAgICBvYmpba2V5XSA9IHR5cGVvZiB2YWx1ZVsxXSAhPT0gJ3VuZGVmaW5lZCcgPyBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMV0pIDogdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgfSxcclxuICAgICAge30gYXMgeyBbazogc3RyaW5nXTogc3RyaW5nIHwgdHJ1ZSB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0NvcmRvdmFBcHAoKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIGNvcmRvdmEgPT09ICdvYmplY3QnIHx8IChkb2N1bWVudC5VUkwuaW5kZXhPZignaHR0cDovLycpID09PSAtMSAmJiBkb2N1bWVudC5VUkwuaW5kZXhPZignaHR0cHM6Ly8nKSA9PT0gLTEpO1xyXG4gIH1cclxufVxyXG4iXX0=