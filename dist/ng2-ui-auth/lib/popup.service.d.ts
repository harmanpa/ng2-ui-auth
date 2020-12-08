import { Observable } from 'rxjs';
import { IOauth1Options, IOauth2Options, ISimpleObject } from './config-interfaces';
export declare class PopupService {
    open(url: string, options: IOauth2Options | IOauth1Options, isCordova?: boolean): Observable<Window>;
    waitForClose(popupWindow: Window, isCordova?: boolean, redirectUri?: string): Observable<ISimpleObject>;
    private eventListener;
    private pollPopup;
    private prepareOptions;
}
