import { EventEmitter, OnInit } from '@angular/core';
import { RedirectService } from './redirect.service';
import { IHierarchicalObject } from './config-interfaces';
import * as ɵngcc0 from '@angular/core';
export declare class RedirectDirective implements OnInit {
    private redirect;
    onLogin: EventEmitter<IHierarchicalObject>;
    onLoginError: EventEmitter<any>;
    constructor(redirect: RedirectService);
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<RedirectDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<RedirectDirective, "[authRedirect]", never, {}, { "onLogin": "onLogin"; "onLoginError": "onLoginError"; }, never>;
}

//# sourceMappingURL=redirect.directive.d.ts.map