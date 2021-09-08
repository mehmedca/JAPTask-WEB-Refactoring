import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { TokenModel } from '../_models/tokenmodel';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] | undefined;
  user: TokenModel | null | undefined;

  constructor(private viewContainerRef: ViewContainerRef, 
    private templateRef: TemplateRef<any>, 
    private accountService: AuthService) {
      this.accountService.currentUser.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
     }

  ngOnInit(): void {
    // clear view if no roles
    if (this.user?.roles == undefined || this.user == null || this.user == undefined) {
      this.viewContainerRef.clear();
      return;
    }

    if (this.user?.roles.some(r  => this.appHasRole?.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}