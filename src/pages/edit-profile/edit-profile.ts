import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { ActionSheetController, App, ViewController } from "ionic-angular/index";
import { Storage } from "@ionic/storage";
import { User } from "../../providers";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  dobMax: String = new Date().toISOString();
  profileImg: any = '';
  profileImgToShow: any = '';
  profileImgPortofolio: any = [];
  profileImgportofolioToShow: any = '';
  profileImages: any = [];
  userData: any = {};
  firstName: any = '';
  lastName: any = '';
  email: any = '';
  password: any = '';
  hourly_rate_from: any = '';
  hourly_rate_to: any = '';
  city: any = 'city';
  country: any = 'country';
  state: any = 'state';
  address1: any = '';
  address2: any = '';
  gender: any = 'Male';
  dob: any = '';
  occupation: any = '';
  about: any = '';
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  account_no: any = '';
  bank_name: any = '';
  ifsc_code: any = '';
  showArrow: any = '';
  category_id: any = [];
  subcategory_id: any = '';
  //Note:-project_status >>> 1=Inprogress,2=Completed"
  attachmentToShow: any = '';
  allCategories: any = [];
  allSubCategories: any = [];
  attachmentToShowNew: any = [];
  profileImgPortofolioGet: any;
  profileImgPortofolioNew: any = [];
  stateNew: any = '';
  cityNew: any = '';

  constructor(public navCtrl: NavController,
    public util: UtilProvider,
    public viewCtrl: ViewController,
    public app: App,
    public user: User,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams) {
    this.showArrow = navParams.data.detail;
  }

  ionViewDidLoad() {
    //alert("sda")
    this.storedatainlocal();
    this.getMyProfileData();
    this.getAllCountries();
    this.getAllCategories();

  }
  getMyProfileData() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      this.profileImgToShow = this.userData.image;
      this.email = this.userData.email;
      this.firstName = this.userData.first_name;
      this.lastName = this.userData.last_name;
      this.gender = this.userData.gender !== '' ? this.userData.gender : 'gender';
      this.dob = this.userData.dob;
      this.country = this.userData.country !== '' ? this.userData.country : '';
      this.cityNew = this.userData.city !== '' ? this.userData.city : '';
      this.address1 = this.userData.address1;
      this.address2 = this.userData.address2;
      this.occupation = this.userData.occupation;
      this.about = this.userData.about;
      this.account_no = this.userData.account_no;
      this.bank_name = this.userData.bank_name;
      this.ifsc_code = this.userData.ifsc_code;
      this.hourly_rate_from = this.userData.hourly_rate_from;
      this.hourly_rate_to = this.userData.hourly_rate_to;
      this.category_id = this.userData.category_id.split(/[ ,]+/);
      // if(this.userData.portfolio_image[0]!==''){
      //   this.attachmentToShow = 'https://alphawizztest.tk/Stage//uploads/user/'+ this.userData.portfolio_image[0].image;
      // }else{
      //   this.attachmentToShow ='';
      // }

      this.subcategory_id = this.userData.subcategory_id.split(/[ ,]+/);
      this.profileImgportofolioToShow = this.userData.portfolio_image[0];     //
      console.log("this.subcategory_id get data", this.userData.portfolio_image)
      this.stateNew = this.userData.state !== '' ? this.userData.state : '';
      this.getSubCategoryList(this.userData.category_id);
    })
  }

  deleteAccount() {
    this.util.presentConfirm('Are You Sure?', 'Do you really want to delete your account? This process can not be undo', 'Cancel', 'Delete').then(succ => {
      this.deleteAccountApi();
    }).catch(rejected => {
    })
  }
  deleteAccountApi() {
    let data = { account_status: '1' }
    this.util.presentLoader();
    this.user.deleteAccount(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.storage.set('userData', null);
        this.storage.set('token', null);
        this.storage.set('isSocialLogin', null);
        this.app.getRootNav().setRoot('EntryPage');
      }
      setTimeout(() => {
        this.util.dismissLoader();
      }, 500);
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    });
  }

  back() {
    this.viewCtrl.dismiss();
  }
  openPicker() {
    let select = 'Choose a picture';
    // let takePicture = 'Take a picture';
    let choosePicture = 'Choose picture';
    let actionSheet = this.actionSheetCtrl.create({
      title: select,
      buttons: [
        // {
        //   text: takePicture,
        //   handler: () => {
        //     this.util.takePicture().then(data => {
        //       this.profileImg = data;
        //       this.profileImgToShow = 'data:image/png;base64,' + data;
        //       // this.profileImgToShow = data;
        //       console.log('this.profileImgToShow',this.profileImgToShow);
        //     });
        //   }
        // },
        {
          text: choosePicture,
          handler: () => {
            this.util.aceesGallery().then(data => {
              this.profileImg = data;
              this.profileImgToShow = 'data:image/png;base64,' + data;
            });
          }
        }
      ]
    });
    actionSheet.present();
  }


  openPickerportofolio() {
    let select = 'Choose a picture';
    // let takePicture = 'Take a picture';
    let choosePicture = 'Choose picture';
    let actionSheet = this.actionSheetCtrl.create({
      title: select,
      buttons: [
        // {
        //   text: takePicture,
        //   handler: () => {
        //     this.util.takePicture().then(data => {
        //       this.profileImg = data;
        //       this.profileImgToShow = 'data:image/png;base64,' + data;
        //       // this.profileImgToShow = data;
        //       console.log('this.profileImgToShow',this.profileImgToShow);
        //     });
        //   }
        // },
        {
          text: choosePicture,
          handler: () => {
            this.util.aceesGallery().then(data => {
              this.profileImgPortofolio.push(data)
              this.profileImgportofolioToShow = 'data:image/png;base64,' + data;
              this.profileImages.push(this.profileImgportofolioToShow)
              console.log('profileImgPortofolio', this.profileImgPortofolio);
              console.log('profileImgportofolioToShow', this.profileImgportofolioToShow);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  update() {
    console.log('this.profileImgPortofolioNew', this.state, this.city, this.stateNew, this.cityNew)
    if (this.state == 'state') {
      this.state = this.stateNew;
    }
    if (this.city == 'city') {
      this.city = this.cityNew;
    }
    if (this.hourly_rate_from !== '' || this.hourly_rate_to !== '') {
      if (this.hourly_rate_from > this.hourly_rate_to) {
        this.util.presentToast('Invalid hourly rate provided');
        return;
      }
    }
    let string = JSON.stringify(this.category_id);
    var cat = string.replace(/"/g, '');
    var cat1 = cat.replace(/[\[\]']+/g, '');
    let substring = JSON.stringify(this.subcategory_id);
    var subcat = substring.replace(/"/g, '');
    var subcat1 = subcat.replace(/[\[\]']+/g, '');
    let formData = new FormData();
    if (this.profileImgPortofolioNew.length > 0) {
      var ins = this.profileImgPortofolioNew[0].length;
      for (var x = 0; x < ins; x++) {
        formData.append("portfolio_image[]", this.profileImgPortofolioNew[0][x]);
      }
    }
    formData.append('email', this.email);
    formData.append('first_name', this.firstName);
    formData.append('last_name', this.lastName);
    formData.append('image', this.profileImg);
    // formData.append('portfolio_image[]', this.profileImgPortofolioNew[0]);
    formData.append('country', this.country);
    formData.append('city', this.city);
    formData.append('address1', this.address1);
    formData.append('address2', this.address2);
    formData.append('dob', this.dob);
    formData.append('gender', this.gender);
    formData.append('occupation', this.occupation);
    formData.append('about', this.about);
    formData.append('state', this.state);
    formData.append('account_no', this.account_no);
    formData.append('bank_name', this.bank_name);
    formData.append('ifsc_code', this.ifsc_code);
    formData.append('hourly_rate_from', this.hourly_rate_from);
    formData.append('hourly_rate_to', this.hourly_rate_to);
    formData.append('category_id', cat1);
    formData.append('subcategory_id', subcat1);
    let data = {
      'email': this.email,
      'first_name': this.firstName,
      'last_name': this.lastName,
      'image': this.profileImg,
      'portfolio_image[]': this.profileImgPortofolioGet,
      'country': this.country,
      'city': this.city,
      'address1': this.address1,
      'address2': this.address2,
      'dob': this.dob,
      'gender': this.gender,
      'occupation': this.occupation,
      'about': this.about,
      'state': this.state,
      'account_no': this.account_no,
      'bank_name': this.bank_name,
      'ifsc_code': this.ifsc_code,
      'category_id': cat1,
      'subcategory_id': subcat1,
      'hourly_rate_from': this.hourly_rate_from,
      'hourly_rate_to': this.hourly_rate_to
    }
    console.log('data', data)
    
    console.log('formData', formData)
    this.util.presentLoader();
    this.user.updateProfile(formData, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      console.log('resp>>>>>>>>', resp)
      this.util.presentAlert('', resp.message);
      if (resp.status) {
        // this.storage.set('userData', JSON.stringify(resp.data));
        this.storedatainlocal();
        this.navCtrl.pop();
      }
      setTimeout(() => {
        this.util.dismissLoader();
      }, 500);
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    });
  }



  getAllCountries() {
    this.user.getCountry().subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.countryList = resp.data;
      }
    }, error => {
      console.error(error);
    });
  }
  getAllStates(id) {
    let data = {
      "country_id": id
    }
    this.user.getState(data).subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.stateList = resp.data;
      }
    }, error => {
      console.error(error);
    });
  }
  getAllCity(id) {
    let data = {
      "state_id": id
    }
    this.user.getCity(data).subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.cityList = resp.data;
      }
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    });
  }
  selectCountry(event: any) {
    console.log(event)
    this.stateNew = '';
    this.cityNew = ''
    // let country = document.getElementById('country');
    // let val = country['options'][country['selectedIndex']].text;
    this.country = event;
    let selectedCountryId = 1;
    this.countryList.filter(item => {
      if (event == item.name) {
        selectedCountryId = item.id;
      }
    })
    this.getAllStates(selectedCountryId);
  }
  selectState(event: any) {
    console.log(event)
    this.cityNew = ''
    // let state = document.getElementById('state');
    // let val = state['options'][state['selectedIndex']].text;
    this.state = event;
    let selectedStateId = 1;
    this.stateList.filter(item => {
      if (event == item.name) {
        selectedStateId = item.id;
      }
    })
    this.getAllCity(selectedStateId);
  }

  selectCity(event: any) {
    console.log(event)
    // let city = document.getElementById('city');
    // this.city = city['options'][city['selectedIndex']].text;
    this.city = event;
  }
  storedatainlocal() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      let data = {
        "user_id": this.userData.id
      }
      this.user.getProfileData(data, this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        console.log('getProfileData', resp);
        if (resp.status) {
          this.storage.set('userData', JSON.stringify(resp.data.profile_data));
        }
        setTimeout(() => {
          this.util.dismissLoader();
        }, 500);
      }, error => {
        console.error(error);
        this.util.dismissLoader();
      });
    });
  }
  getAllCategories() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      console.log("this.userData", this.userData)
      this.user.getCategoryList(this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        if (resp.status) {
          this.allCategories = resp.data
        }
      }, error => {
        console.error(error);
      });
    })
  }

  selectCategory(category) {
    var string = JSON.stringify(category);
    var cat = string.replace(/"/g, '');
    var cat1 = cat.replace(/[\[\]']+/g, '');
    this.getSubCategoryList(cat1);
  }

  getSubCategoryList(id) {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      let data = { category_id: id }
      this.user.subCatlist(data, this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        this.allSubCategories = resp.data
      }, error => {
        console.error(error);
      });
    })
  };

  getAttachmentEvent(event) {
    this.profileImgPortofolio = event.target.files;
    this.profileImgPortofolioGet = event.target.files;
    console.log('this.profileImgPortofolio', event)
    this.profileImgPortofolioNew.push(event.target.files);

    let reader = new FileReader();
    let that = this;
    reader.onload = function () {
      let datatogo = reader.result
      that.attachmentToShowNew = datatogo;
      that.attachmentToShow = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };

}