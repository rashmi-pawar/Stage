import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';
import {Platform} from "ionic-angular/index";
import {Storage} from "@ionic/storage";
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {SocialSharing} from "@ionic-native/social-sharing";
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'TabsPage';
  userData : any = {};
  constructor(public navCtrl: NavController,
              public user:User,
              private googlePlus: GooglePlus,
              public fb: Facebook,
              public util:UtilProvider,
              public storage:Storage,
              public share:SocialSharing,
              public platform:Platform) {

  }
  getUserData(){
    this.storage.get('userData').then(userData=>{
      this.userData = JSON.parse(userData);
    })
  }

  ionViewDidLoad() {
    this.getUserData();
  }

  openPage(page) {
    this.nav.setRoot(page);
  }
  openPageNew(page) {
    this.nav.setRoot(page,{detail:'showMenu'});
  }

  logout() {
    this.util.presentConfirm('Are You Sure?','You want to Logout?','Cancel','Logout').then(succ=>{
      this.util.presentLoader();
      this.user.logout(this.userData.Authorization).subscribe(res=>{
        let resp:any =res;
        this.util.presentToast(resp.message);
        if (resp.status){
          this.storage.set('userData',null);
          this.storage.set('token',null);
          this.storage.set('isSocialLogin',null);
          this.navCtrl.setRoot('EntryPage');
          this.googlePlus.logout();
          this.fb.logout();
        }
        setTimeout(()=>{
          this.util.dismissLoader();
        },500);
      },error => {
        console.error(error);
        this.util.dismissLoader();
      })
    }).catch(rejected=>{
    })
  }

  openMenu() {
    this.storage.get('userData').then(userData=>{
      this.userData = JSON.parse(userData);
    })
  }

  socialShare() {
    this.share.share('','','','').then(succ=>{}).catch(err=>{});
  }
  goProfile(){
    this.navCtrl.push('EditProfilePage',{detail:'showArrow'});
  }
}
