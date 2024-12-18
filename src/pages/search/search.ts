import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../providers";
import { Storage } from "@ionic/storage";
import { UtilProvider } from '../../providers/util/util';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchTxt: any = '';
  isFreeLancerSelected: boolean = false;
  projectData: any = [];
  pageNumber: any = 1;
  pageSize: any = 10;
  freelancerData: any = [];
  userData: any = {};
  isFreelancerListEmpty: boolean = false;
  isProjectListEmpty: boolean = false;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams,
    public user: User,
    public util: UtilProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    this.loadFirst();
  }
  loadFirst() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      this.pageNumber = 1;
      if (this.isFreeLancerSelected) {
        this.getFreelancerData(true).then(data => {
          this.freelancerData = data;
          (this.freelancerData.length > 0) ? this.isFreelancerListEmpty = false : this.isFreelancerListEmpty = true;
        }).catch(err => {
          (this.freelancerData.length > 0) ? this.isFreelancerListEmpty = false : this.isFreelancerListEmpty = true;
        });
      } else {
        this.getProjectData(true).then(data => {
          this.projectData = data;
          (this.projectData.length > 0) ? this.isProjectListEmpty = false : this.isProjectListEmpty = true;
        }).catch(err => {
          (this.projectData.length > 0) ? this.isProjectListEmpty = false : this.isProjectListEmpty = true;
        });
      }
    });
  }
  selectSegment(data) {
    // console.log('data',data);
    this.searchTxt = '';
    this.isFreeLancerSelected = data;
    this.pageNumber = 1;
    if (this.isFreeLancerSelected) {
      this.getFreelancerData(true).then(data => {
        this.freelancerData = data;
        (this.freelancerData.length > 0) ? this.isFreelancerListEmpty = false : this.isFreelancerListEmpty = true;
      }).catch(err => {
        (this.freelancerData.length > 0) ? this.isFreelancerListEmpty = false : this.isFreelancerListEmpty = true;
      });
    } else {
      this.getProjectData(true).then(data => {
        this.projectData = data;
        (this.projectData.length > 0) ? this.isProjectListEmpty = false : this.isProjectListEmpty = true;
      }).catch(err => {
        (this.projectData.length > 0) ? this.isProjectListEmpty = false : this.isProjectListEmpty = true;
      });
    }
  }

  searchInput(event: UIEvent) {
    setTimeout(() => {
      this.pageNumber = 1;
      if (this.isFreeLancerSelected) {
        this.getFreelancerData(false).then(data => {
          this.freelancerData = data;
          (this.freelancerData.length > 0) ? this.isFreelancerListEmpty = false : this.isFreelancerListEmpty = true;
        }).catch(err => {
          (this.freelancerData.length > 0) ? this.isFreelancerListEmpty = false : this.isFreelancerListEmpty = true;
        });
      } else {
        this.getProjectData(false).then(data => {
          this.projectData = data;
          (this.projectData.length > 0) ? this.isProjectListEmpty = false : this.isProjectListEmpty = true;
        }).catch(err => {
          (this.projectData.length > 0) ? this.isProjectListEmpty = false : this.isProjectListEmpty = true;
        });
      }
    }, 200);
  }

  getFreelancerData(showLoader) {
    return new Promise((resolve, reject) => {
      if (showLoader) {
        this.util.presentLoader();
      }
      let data = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        search_text: this.searchTxt
      }
      this.user.getfreelancerList(data, this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        if (resp.status) {
          resolve(resp.data);
          this.pageNumber++;
        } else {
          resolve([]);
        }
        showLoader ? this.util.dismissLoader() : '';
      }, error => {
        console.error(error);
        reject(error);
        showLoader ? this.util.dismissLoader() : '';
      });
    })
  }

  getProjectData(showLoader) {
    return new Promise((resolve, reject) => {
      if (showLoader) {
        this.util.presentLoader();
      }
      let data = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        search_text: this.searchTxt
      }
      this.user.getSearchProject(data, this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        if (resp.status) {
          this.pageNumber++;
          resolve(resp.data);
        } else {
          resolve([]);
        }
        showLoader ? this.util.dismissLoader() : '';
      }, error => {
        console.error(error);
        showLoader ? this.util.dismissLoader() : '';
        reject(error);
      });
    })
  }

  calculateDiff(item) {
    let todayDate =  moment().format('MM/DD/YYYY');
    // var date1 = new Date(item.project_from);
    var date1 = new Date(todayDate);
    var date2 = new Date(item.project_to);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.round(Difference_In_Days + 1);
  }

  openProject(item) {
    this.navCtrl.push('ViewProjectPage', { detail: item });
  }
  goHire(item: any) {
    this.navCtrl.push('HireFreelancerPage', { detail: item });
  }
  loadMore(infiniteScroll) {
    if (this.isFreeLancerSelected) {
      this.getFreelancerData(false).then(data => {
        infiniteScroll.complete();
        let array: any = data;
        this.freelancerData = [...this.freelancerData, ...array];
        (this.freelancerData.length > 0) ? this.isFreelancerListEmpty = false : this.isFreelancerListEmpty = true;
      }).catch(err => {
        infiniteScroll.complete();
        (this.freelancerData.length > 0) ? this.isFreelancerListEmpty = false : this.isFreelancerListEmpty = true;
      });
    } else {
      this.getProjectData(false).then(data => {
        infiniteScroll.complete();
        let array: any = data;
        this.projectData = [...this.projectData, ...array];
        (this.projectData.length > 0) ? this.isProjectListEmpty = false : this.isProjectListEmpty = true;
      }).catch(err => {
        infiniteScroll.complete();
        (this.projectData.length > 0) ? this.isProjectListEmpty = false : this.isProjectListEmpty = true;
      });
    }
  }
  openNotification() {
    this.navCtrl.push('NotificationPage');
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Filter',
      inputs: [
        {
          name: 'username',
          label: 'Search by Project',
          type: 'radio',
          value: 'Project'
        },
        {
          name: 'username',
          label: 'Search by Freelancer',
          type: 'radio',
          value: 'Freelancer'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            // console.log(data);
            if (data == 'Project') {
              this.isFreeLancerSelected = false;
              this.loadFirst();
            } else {
              this.isFreeLancerSelected = true;
              this.loadFirst();
            }

          }
        }
      ]
    });
    alert.present();
  }
}
