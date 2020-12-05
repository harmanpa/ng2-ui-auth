import { ModuleWithProviders } from '@angular/core';
import { IPartialConfigOptions } from './config-interfaces';
export declare class Ng2UiAuthModule {
    constructor();
    static forRoot(configOptions?: IPartialConfigOptions, defaultJwtInterceptor?: boolean): ModuleWithProviders<Ng2UiAuthModule>;
}
