import { Directive, EventEmitter, Output } from '@angular/core';
import { RedirectService } from './redirect.service';
export class RedirectDirective {
    constructor(redirect) {
        this.redirect = redirect;
        this.onLogin = new EventEmitter();
        this.onLoginError = new EventEmitter();
    }
    ngOnInit() {
        if (this.redirect.isRedirect()) {
            this.redirect.handleRedirect()
                .subscribe({
                next: value => this.onLogin.emit(value),
                error: err => this.onLoginError.emit(err)
            });
        }
    }
}
RedirectDirective.decorators = [
    { type: Directive, args: [{
                selector: '[authRedirect]'
            },] }
];
RedirectDirective.ctorParameters = () => [
    { type: RedirectService }
];
RedirectDirective.propDecorators = {
    onLogin: [{ type: Output }],
    onLoginError: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL3BldGVyL0RldmVsb3BtZW50L25nMi11aS1hdXRoL3Byb2plY3RzL25nMi11aS1hdXRoL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9yZWRpcmVjdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQU1uRCxNQUFNLE9BQU8saUJBQWlCO0lBSTVCLFlBQW9CLFFBQXlCO1FBQXpCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBSG5DLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBdUIsQ0FBQztRQUNsRCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFHakQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7aUJBQzNCLFNBQVMsQ0FBQztnQkFDVCxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUMxQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7OztZQWxCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7O1lBTE8sZUFBZTs7O3NCQU9wQixNQUFNOzJCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JlZGlyZWN0U2VydmljZX0gZnJvbSAnLi9yZWRpcmVjdC5zZXJ2aWNlJztcbmltcG9ydCB7SUhpZXJhcmNoaWNhbE9iamVjdH0gZnJvbSAnLi9jb25maWctaW50ZXJmYWNlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thdXRoUmVkaXJlY3RdJ1xufSlcbmV4cG9ydCBjbGFzcyBSZWRpcmVjdERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBPdXRwdXQoKSBvbkxvZ2luID0gbmV3IEV2ZW50RW1pdHRlcjxJSGllcmFyY2hpY2FsT2JqZWN0PigpO1xuICBAT3V0cHV0KCkgb25Mb2dpbkVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWRpcmVjdDogUmVkaXJlY3RTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWRpcmVjdC5pc1JlZGlyZWN0KCkpIHtcbiAgICAgIHRoaXMucmVkaXJlY3QuaGFuZGxlUmVkaXJlY3QoKVxuICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiB2YWx1ZSA9PiB0aGlzLm9uTG9naW4uZW1pdCh2YWx1ZSksXG4gICAgICAgICAgZXJyb3I6IGVyciA9PiB0aGlzLm9uTG9naW5FcnJvci5lbWl0KGVycilcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==