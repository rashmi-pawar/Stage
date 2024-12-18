import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../providers';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";
import {FCM} from "@ionic-native/fcm";
import {Platform} from "ionic-angular/index";
import {HttpClient} from "@angular/common/http";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  error_messages: any = {};
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
              public formBuilder: FormBuilder) {
    platform.ready().then(() => {
      if (platform.is('cordova')) {
        this.getFirebaseToken();
      }
    });
    this.setupLoginFormData();
  }
  setupLoginFormData() {
    this.error_messages = {
      email: [
        { type: "required", message: "Email/Mobile is required" },
        /*{ type: "pattern", message: 'Please enter valid email' }*/
      ],

      password: [
        { type: "required", message: 'Password is required' },
        { type: "minlength", message: "Minimun length should be 8" },
        { type: "maxlength", message: "Maximum length should be 12" }
      ]
    };
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            /*Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),*/
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12)
          ])
        )},
    );
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
  signUp() {
    this.navCtrl.push('SignupPage');
  }

  login() {
    this.util.presentLoader('');
    let data = {
      'email_mobile':this.loginForm.value.email,
      'password':this.loginForm.value.password,
      'Firebase_token':this.firebaseToken,
    }

    this.user.login(data).subscribe(res=>{
      let response : any = res;
      if (response.status){
        this.storage.set('token',response.data.Authorization);
        this.storage.set('userData',JSON.stringify(response.data));
        setTimeout(()=>{
          this.util.dismissLoader();
          this.navCtrl.setRoot('MenuPage');
        },500)
      }else {
        this.util.dismissLoader();
        this.util.presentToast(response.message);
      }
    },error => {
      console.error(error);
      this.util.dismissLoader();
      this.util.presentToast(error.error.message);
    })
  }

  forgotPassword() {
    this.navCtrl.push('ForgotPasswordPage');
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
  }

}
