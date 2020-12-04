import {Directive, EventEmitter, OnInit, Output} from '@angular/core';
import {RedirectService} from './redirect.service';
import {IHierarchicalObject} from './config-interfaces';

@Directive({
  selector: '[authRedirect]'
})
export class RedirectDirective implements OnInit {
  @Output() onLogin = new EventEmitter<IHierarchicalObject>();
  @Output() onLoginError = new EventEmitter<any>();

  constructor(private redirect: RedirectService) {
  }

  ngOnInit(): void {
    if (this.redirect.isRedirect()) {
      this.redirect.handleRedirect()
        .subscribe({
          next: value => this.onLogin.emit(value),
          error: err => this.onLoginError.emit(err)
        });
    }
  }

}
