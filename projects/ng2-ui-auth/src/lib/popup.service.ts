import {Injectable} from '@angular/core';
import {EMPTY, fromEvent, interval, merge, Observable, of, throwError} from 'rxjs';
import {delay, map, switchMap, take} from 'rxjs/operators';
import {IOauth1Options, IOauth2Options, IPopupOptions, ISimpleObject} from './config-interfaces';
import {getWindowOrigin, isCordovaApp, parseQueryString, stringifyOptions} from './utils';


@Injectable()
export class PopupService {
  public open(url: string, options: IOauth2Options | IOauth1Options, isCordova = isCordovaApp()): Observable<Window> {
    const stringifiedOptions = stringifyOptions(this.prepareOptions(options.popupOptions));
    const windowName = isCordova ? '_blank' : options.name;

    const popupWindow = typeof window !== 'undefined' ? window.open(url, windowName, stringifiedOptions) : null;

    if (popupWindow) {
      if (popupWindow.focus) {
        popupWindow.focus();
      }
      return of(popupWindow);
    }
    return throwError(new Error('Popup was not created'));
  }

  public waitForClose(popupWindow: Window, isCordova = isCordovaApp(), redirectUri = getWindowOrigin()): Observable<ISimpleObject> {
    return isCordova ? this.eventListener(popupWindow, redirectUri) : this.pollPopup(popupWindow, redirectUri);
  }

  private eventListener(popupWindow: Window, redirectUri = getWindowOrigin()): Observable<ISimpleObject> {
    if (!popupWindow) {
      return throwError(new Error('Popup was not created'));
    }
    return merge(
      fromEvent<Event>(popupWindow, 'exit').pipe(
        delay(100),
        map(() => {
          throw new Error('Authentication Canceled');
        })
      ),
      fromEvent(popupWindow, 'loadstart')
    ).pipe(
      switchMap((event: Event & { url: string }) => {
        if (!popupWindow || popupWindow.closed) {
          return Observable.throw(new Error('Authentication Canceled'));
        }
        if (event.url.indexOf(redirectUri) !== 0) {
          return EMPTY;
        }

        const parser = document.createElement('a');
        parser.href = event.url;

        if (parser.search || parser.hash) {
          const queryParams = parser.search.substring(1).replace(/\/$/, '');
          const hashParams = parser.hash.substring(1).replace(/\/$/, '');
          const hash = parseQueryString(hashParams);
          const qs = parseQueryString(queryParams);
          const allParams = {...qs, ...hash};

          popupWindow.close();

          if (allParams.error) {
            throw allParams.error;
          } else {
            return of(allParams);
          }
        }
        return EMPTY;
      }),
      take(1)
    );
  }

  private pollPopup(popupWindow: Window, redirectUri = getWindowOrigin()): Observable<ISimpleObject> {
    return interval(50).pipe(
      switchMap(() => {
        if (!popupWindow || popupWindow.closed) {
          return throwError(new Error('Authentication Canceled'));
        }

        const popupWindowOrigin = getWindowOrigin(popupWindow);

        if (
          popupWindowOrigin &&
          (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
          (popupWindow.location.search || popupWindow.location.hash)
        ) {
          const queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
          const hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
          const hash = parseQueryString(hashParams);
          const qs = parseQueryString(queryParams);
          popupWindow.close();
          const allParams = {...qs, ...hash};
          if (allParams.error) {
            return throwError(allParams.error);
          } else {
            return of(allParams);
          }
        }
        return EMPTY;
      }),
      take(1)
    );
  }

  private prepareOptions(options?: IPopupOptions): ISimpleObject {
    options = options || {};
    const width = options.width || 500;
    const height = options.height || 500;
    return {
      width,
      height,
      left: window.screenX + (window.outerWidth - width) / 2,
      top: window.screenY + (window.outerHeight - height) / 2.5,
      toolbar: options.visibleToolbar ? 'yes' : 'no',
      ...options
    };
  }
}
