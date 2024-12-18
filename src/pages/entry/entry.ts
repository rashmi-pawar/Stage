import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {FCM} from "@ionic-native/fcm";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";
import {Platform} from "ionic-angular/index";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {HttpClient} from "@angular/common/http";
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {
  firebaseToken: any = '';
  constructor(public navCtrl: NavController,
              public user: User,
              public fcm: FCM,
              private googlePlus: GooglePlus,
              public util: UtilProvider,
              public storage: Storage,
              public platform: Platform,
              public fb: Facebook,
              public httpClient: HttpClient,
              public navParams: NavParams) {
    platform.ready().then(() => {
      if (platform.is('cordova')) {
        this.getFirebaseToken();
      }
    });
  }

  ionViewDidLoad() {
  }

  openSignUp() {
    this.navCtrl.setRoot('SignupPage');
  }

  openLogin() {
    this.navCtrl.setRoot('LoginPage');
  }
  fbLogin() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        let authResponse = res.authResponse;
        if (authResponse.accessToken) {
          this.httpClient.get(`https://graph.facebook.com/me?fields=name,email,picture.width(400).height(400)&access_token=${authResponse.accessToken}`).subscribe(
            data=> {
              let fbResponse:any = data;
              console.log(fbResponse);
              this.callSocialRegisterApi(fbResponse.name,fbResponse.email,fbResponse.picture.data.url?fbResponse.picture.data.url:'',1);
            },error => {
              console.log(error);
            }
          );
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
  googleLogin() {
    this.googlePlus.login({})
      .then(res => {
        console.log('response ====>', res);
        let googleData: any = res;
        console.log(res);
        this.callSocialRegisterApi(googleData.givenName, googleData.email, googleData.imageUrl ? googleData.imageUrl : '', 2);
      })
      .catch(err => console.error('google error >>>>', JSON.stringify(err)));
  }
  callSocialRegisterApi(name: any, email: any, profile: any, type: number) {
    this.util.presentLoader('');
    let data = {
      username:name,
      email:email,
      Firebase_token:this.firebaseToken,
      social_login:type
    }
    this.user.socialLogin(data).subscribe(res=>{
      let resp : any = res;
      console.log('social login response >>',resp);
      setTimeout(()=>{
        this.util.dismissLoader();
      },500)
      if (resp.status){
        let userData : any = resp.data;
        this.storage.set('isSocialLogin',true);
        this.storage.set('token',userData.Authorization);
        this.storage.set('userData',JSON.stringify(userData)).then(()=>{
          this.navCtrl.setRoot('MenuPage');
        });
      }else {
        this.util.presentToast(resp.message);
      }

    },error => {
      this.util.dismissLoader();
    })
  }

  getFirebaseToken() {
    this.fcm.getToken().then(token => {
      this.firebaseToken = token;
      console.log('token >>>',this.firebaseToken);
    });

    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background",data);
      } else {
        console.log("Received in foreground",data);
      }
      this.util.presentAlert('Notification',data.message_info);
      if (data.types == '1'){

      }
    });
  }
}
