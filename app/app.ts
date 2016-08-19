import {Component, ViewChild} from '@angular/core';
import {Platform, Events, ionicBootstrap, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

import {RootPage} from './pages/root';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  private rootPage: any;

  constructor(
    private platform: Platform,
    private events: Events
  ) {
    this.rootPage = RootPage;

    events.subscribe('root:nav-to-home', () => {
      this.nav.setRoot(TabsPage);
    });

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
