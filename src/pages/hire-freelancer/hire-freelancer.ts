import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";
import { UtilProvider } from "../../providers/util/util";
import { App } from "ionic-angular/index";
import { FirebaseProvider } from "../../providers/firebase/firebase";

@IonicPage()
@Component({
  selector: 'page-hire-freelancer',
  templateUrl: 'hire-freelancer.html',
})
export class HireFreelancerPage {
  @ViewChild(Slides) slides: Slides;
  isReviewSelected: boolean = false;
  hireDetail: any;
  userData: any;
  reviewData: any;
  projectId: any = '';
  portfolioList: any = [];
  myAllProjects: any = [];
  isPortfolioEmpty: boolean = false;
  followUnFollowText: any = 'Follow';
  bannerData: any = [];
  userDataNew: any =[];
  bannerIndex: number = 1;
  loginUserId: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public user: User,
    public fireDb: FirebaseProvider,
    public app: App,
    public util: UtilProvider, ) {
    this.hireDetail = navParams.data.detail;
    console.log('HireFreelancerPage >>>', this.hireDetail);
    this.storage.get('userData').then(userData => {
      this.userDataNew = JSON.parse(userData);
      this.loginUserId = this.userDataNew.id;
      console.log(this.userDataNew.id)
    });
  }

  ionViewDidLoad() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      this.getOtherUserData();
      this.getMyAllProjects();
    });
  }

  back() {
    this.navCtrl.pop();
  }

  selectSegment(data) {
    this.isReviewSelected = data;
  }

  viewDetail(item: any) {
    console.log(item);
    // this.navCtrl.push('FreelancerDetailPage');
    if (item.portfolio_type == 'Project') {
      this.navCtrl.push('ProjectInnerPage', { status: item });
      localStorage.setItem("showComplete","byfreelanser")
    }
    if (item.portfolio_type == 'Event') {
      this.navCtrl.push('EventDetailPage', { event: item });
    }
    if (item.portfolio_type == 'Equipment') {
      this.navCtrl.push('EquipmentDetailPage', { equip: item });
    }
    if (item.portfolio_type == 'Space') {
      this.navCtrl.push('SpaceDetailPage', { space: item });
    }
  }

  getOtherUserData() {
    this.util.presentLoader();
    let data = {
      "user_id": this.hireDetail.user_id
    }
    this.user.getProfileData(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.reviewData = resp.data.review_data;
        this.portfolioList = resp.data.portfolio_data;
        this.bannerData = resp.data.banner_data;
        this.followUnFollowText = resp.data.follow_status == '1' ? 'Unfollow' : 'Follow';
      }
      this.portfolioList.length > 0 ? this.isPortfolioEmpty = false : this.isPortfolioEmpty = true;
      setTimeout(() => {
        this.util.dismissLoader();
      }, 500);
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    });
  }

  hire() {
    // if (this.myAllProjects.length === 0) {
    //   this.util.presentAlert('', 'You have not posted any project, please add/post your project first');
    //   return;
    // }
    // if (this.projectId === '') {
    //   this.util.presentToast('Please select your project');
    //   return;
    // }
    // this.util.presentLoader();
    // this.storage.get('userData').then(userData => {
    //   this.userData = JSON.parse(userData);
    //   let data = {
    //     "user_id": this.hireDetail.user_id,
    //     'project_id': this.projectId
    //   }
    //   this.user.userHire(data, this.userData.Authorization).subscribe(res => {
    //     let resp: any = res;
    //     console.log(resp);
    //     this.util.presentAlert('', resp.message);
    //     if (resp.status) {
          let user = {
            date_of_join: new Date().getTime(),
            id: this.hireDetail.user_id,
            image: this.hireDetail.profile_pic,
            name: this.hireDetail.first_name !== '' ? this.hireDetail.first_name + ' ' + this.hireDetail.last_name : this.hireDetail.name,
            roomId: 'StageChatRoom_' + (Math.floor(Math.random() * 10000) + 1),
            project_id: this.projectId
          }
          this.fireDb.addUser(user, this.userData.id);
          this.navCtrl.setRoot('InboxPage');
      //   }
      //   setTimeout(() => {
      //     this.util.dismissLoader();
      //   }, 500);
      // }, error => {
      //   console.error(error);
      //   this.util.dismissLoader();
      // });
    // });
  }
  getMyAllProjects() {
    let data = {
      pageNumber: '1',
      pageSize: '100'
    }
    this.user.myPostedProjects(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.myAllProjects = resp.data;
      }
    }, error => {
      console.error(error);
    });
  }

  selectProject(project: any) {
    this.projectId = project.id;
  }

  followUnfollowUser() {
    let data = {
      other_user_id: this.hireDetail.user_id,
      follow: this.followUnFollowText == 'Follow' ? '1' : '0'
    }
    this.util.presentLoader();
    this.user.followUnfollow(data, this.userData.Authorization).subscribe(res => {
      let resp: any = res;
      if (resp.status) {
        this.followUnFollowText == 'Follow' ? this.followUnFollowText = 'Unfollow' : this.followUnFollowText = 'Follow'
      }
      // this.util.presentAlert('',resp.message);
      this.util.dismissLoader();
    }, error => {
      console.error(error);
      this.util.dismissLoader();
    })
  }

  bannerChange() {
    this.bannerIndex = this.slides.getActiveIndex() + 1;
  }
}
