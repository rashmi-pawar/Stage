import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../providers";
import { Platform, ViewController } from "ionic-angular/index";
import { UtilProvider } from "../../providers/util/util";
import { Storage } from "@ionic/storage";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { HttpClient } from "@angular/common/http";
import { FCM } from "@ionic-native/fcm";
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signUpForm: FormGroup;
  error_messages: any = {};
  firebaseToken: any = '';
  constructor(public navCtrl: NavController,
    public user: User,
    public storage: Storage,
    public util: UtilProvider,
    public fb: Facebook,
    private googlePlus: GooglePlus,
    public fcm: FCM,
    public platform: Platform,
    public httpClient: HttpClient,
    public viewCtrl: ViewController,
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
        { type: "required", message: "Email is required" },
        { type: "pattern", message: 'Please enter valid email' }
      ],
      username: [
        { type: "required", message: "Username is required" }
      ],
      password: [
        { type: "required", message: 'Password is required' },
        { type: "minlength", message: "Minimun length should be 8" },
        { type: "maxlength", message: "Maximum length should be 12" }
      ],
      confirmPassword: [
        { type: "required", message: 'Confirm Password is required' },
        { type: "minlength", message: "Minimun length should be 8" },
        { type: "maxlength", message: "Maximum length should be 12" }
      ]
    };
    this.signUpForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          ])
        ),
        username: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12)
          ])
        ),
        confirmPassword: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12)
          ])
        )
      },
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
    if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.util.presentToast('Password and Confirm Password are not matched');
      return;
    }
    this.util.presentLoader('');
    let formData = new FormData();
    formData.append('username', this.signUpForm.value.username);
    formData.append('email_mobile', this.signUpForm.value.email);
    formData.append('password', this.signUpForm.value.password);
    formData.append('Firebase_token', this.firebaseToken);

    this.user.signup(formData).subscribe(res => {
      let resp: any = res;
      this.util.presentAlert('', resp.message);
      if (resp.status) {
        this.storage.set('token', resp.data.Authorization);
        this.storage.set('userData', JSON.stringify(resp.data)).then(() => {
          this.navCtrl.setRoot('MenuPage');
        });
      }
      setTimeout(() => {
        this.util.dismissLoader();
      }, 500);
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    })
  }

  login() {
    // this.viewCtrl.dismiss();
    this.navCtrl.setRoot('LoginPage');
  }

  fbLogin() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        let authResponse = res.authResponse;
        if (authResponse.accessToken) {
          this.httpClient.get(`https://graph.facebook.com/me?fields=name,email,picture.width(400).height(400)&access_token=${authResponse.accessToken}`).subscribe(
            data => {
              let fbResponse: any = data;
              console.log(fbResponse);
              this.callSocialRegisterApi(fbResponse.name, fbResponse.email, fbResponse.picture.data.url ? fbResponse.picture.data.url : '', 1);
            }, error => {
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
      username: name,
      email: email,
      Firebase_token: this.firebaseToken,
      social_login: type
    }
    this.user.socialLogin(data).subscribe(res => {
      let resp: any = res;
      console.log('social login response >>', resp);
      setTimeout(() => {
        this.util.dismissLoader();
      }, 500)
      if (resp.status) {
        let userData: any = resp.data;
        this.storage.set('isSocialLogin', true);
        this.storage.set('token', userData.Authorization);
        this.storage.set('userData', JSON.stringify(userData)).then(() => {
          this.navCtrl.setRoot('MenuPage');
        });
      } else {
        this.util.presentToast(resp.message);
      }

    }, error => {
      this.util.dismissLoader();
    })
  }
  getFirebaseToken() {
    this.fcm.getToken().then(token => {
      this.firebaseToken = token;
      console.log('signup page token >>>', this.firebaseToken);
    });
  }
}
