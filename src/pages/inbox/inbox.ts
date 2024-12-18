import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController, App } from "ionic-angular/index";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { UtilProvider } from "../../providers/util/util";
import { Storage } from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  allUsers: any = [];
  userData: any = {};
  isListEmpty: boolean = false;
  constructor(public navCtrl: NavController,
    public app: App,
    public firedb: FirebaseProvider,
    public util: UtilProvider,
    public storage: Storage,
    public alertCtrl: AlertController,
    public platform: Platform,
    public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      this.getAllUsers();
    })
  }

  openChat(user) {
    // console.log(user);
    this.app.getRootNav().push('ChatPage', { chatRef: user.roomId, otherUser: user, me: this.userData });
  }

  getAllUsers() {
    this.util.presentLoader();
    this.firedb.getAllUsers(this.userData.id).subscribe(data => {
      if (data && data.length) {
        this.allUsers = data;
        this.allUsers = this.allUsers.filter(item => {
          this.firedb.getFirstChat(item.roomId).subscribe(data => {
            if (data && data[0]) {
              item.last_message = data[0]['message'];
              item.last_message_time = data[0]['date'];
            } else {
              //if latest message is undefined then check again for latest message
              this.firedb.getFirstChat(item.roomId).subscribe(data => {
                item.last_message = data[0]['message'];
                item.last_message_time = data[0]['date'];
              })
            }
          })
          return item;
        })
      }
      this.allUsers.length && this.allUsers.length > 0 ? this.isListEmpty = false : this.isListEmpty = true;
      // console.log('all users of drivers >>>',this.allUsers);
      setTimeout(() => {
        this.util.dismissLoader();
      }, 500);
    }, error => {
      this.util.dismissLoader();
    });
  }

  notification() {
    this.navCtrl.push('NotificationPage');
  }
}
