import { Observable } from 'rxjs';
import { IOauth1Options, IOauth2Options, ISimpleObject } from './config-interfaces';
import * as ɵngcc0 from '@angular/core';
export declare class PopupService {
    open(url: string, options: IOauth2Options | IOauth1Options, isCordova?: boolean): Observable<Window>;
    waitForClose(popupWindow: Window, isCordova?: boolean, redirectUri?: string): Observable<ISimpleObject>;
    private eventListener;
    private pollPopup;
    private prepareOptions;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PopupService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PopupService>;
}

//# sourceMappingURL=popup.service.d.ts.map