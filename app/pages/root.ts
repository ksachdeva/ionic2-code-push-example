import { Component, NgZone } from '@angular/core';
import { Platform, Events, AlertController } from 'ionic-angular';

import { SyncStatus } from 'ionic-native';
import { CodePushService } from 'ionic2-code-push';

@Component({
  templateUrl: 'build/pages/root.html',
  providers: [CodePushService]
})
export class RootPage {

  messageText: string;

  constructor(
    private codePushService: CodePushService,
    private alertController: AlertController,
    private ngZone: NgZone,
    private platform: Platform,
    private events: Events) {

    this.messageText = '';

    this.platform.ready().then(() => {

      this.codePushService.sync().subscribe((syncStatus) => {

        console.log('Sync Status: ', syncStatus);

        if (syncStatus === SyncStatus.UP_TO_DATE) {

          // facing some zoning problems here !!
          // why ??

          // forcing to run in the ngzone
          this.ngZone.run(() => {
            this.messageText = 'App is up to date !';
            this.events.publish('root:nav-to-home');
          });
        }

        // not facing zoning issue here ?

        switch (syncStatus) {
          case SyncStatus.IN_PROGRESS:
            this.messageText = 'An update is in progress ..';
            break;

          case SyncStatus.CHECKING_FOR_UPDATE:
            this.messageText = 'Checking for update ..';
            break;

          case SyncStatus.DOWNLOADING_PACKAGE:
            this.messageText = 'Downloading package ..';
            break;

          case SyncStatus.INSTALLING_UPDATE:
            this.messageText = 'Installing update ..';
            break;

          case SyncStatus.UPDATE_INSTALLED:
            this.messageText = 'Installed the update ..';
            const alert = this.alertController.create({
              title: 'Update',
              message: 'A new update was installed and will be available on next app restart',
              buttons: ['OK']
            });
            alert.present();
            alert.onDidDismiss(() => {
              this.events.publish('root:nav-to-home');
            });
            break;

          case SyncStatus.ERROR:
            this.messageText = 'An error occurred :( ...';
            break;

          default:
            this.messageText = 'An unhandled sync status ..';
            break;
        }

      });

    });
  }

}
