import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/root.html'
})
export class RootPage {

  constructor(
    private platform: Platform,
    private events: Events) {

    // just waiting at root page for 1 second
    // this is where we will check for the update
    setTimeout(() => this.events.publish('root:nav-to-home'), 1000);
  }

}
