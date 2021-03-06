import {Component, OnDestroy} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

import {AuthorizationServices} from '../../services/authorization.services';

import {environment as _env} from '../../environments/environment';

import {NavigationItem} from '../../models/navigation-item.model';

@Component({
  selector: 'header-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class HeaderElement implements OnDestroy {

  navigationItems: NavigationItem[];
  mobileNav: boolean;

  routerSubscription: Subscription;

  constructor(private _services: AuthorizationServices,
              private router: Router) {
    this.navigationItems = _env.navigation;
    this.mobileNav = false;
    this.routerSubscription = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.mobileNav = false;
      }
    })
  }

  logout = (): void => {
    this._services.logout();
  };

  toggleNavigation(ev?: MouseEvent): void {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    this.mobileNav = !this.mobileNav;
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
