import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../providers";
import { Storage } from "@ionic/storage";
import { UtilProvider } from '../../providers/util/util';


@IonicPage()
@Component({
  selector: 'page-dj-list',
  templateUrl: 'dj-list.html',
})
export class DjListPage {
  searchTxt: any = '';
  isFreeLancerSelected: boolean = false;
  projectData: any = [];
  pageNumber: any = 1;
  pageSize: any = 10;
  userData:any={};
  isProjectListEmpty: boolean = false;
  catdata: any;
  userDataList: any = [];
  isUserListEmpty: boolean = false;
  isUserSelected : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public user: User,
    public util: UtilProvider,
    public storage: Storage) {
    this.catdata = navParams.data.detail;
  }

  ionViewDidLoad() {
    this.storage.get('userData').then(userData => {
      this.userData = JSON.parse(userData);
      this.pageNumber = 1;
        // this.getProjectData(true).then(data=>{
        //   this.projectData = data;
        //   (this.projectData.length>0)?this.isProjectListEmpty=false:this.isProjectListEmpty=true;
        // }).catch(err=>{
        //   (this.projectData.length>0)?this.isProjectListEmpty=false:this.isProjectListEmpty=true;
        // });
        this.getUserData(true).then(data => {
          this.userDataList = data;
          (this.userDataList.length > 0) ? this.isUserListEmpty = false : this.isUserListEmpty = true;
        }).catch(err => {
          (this.userDataList.length > 0) ? this.isUserListEmpty = false : this.isUserListEmpty = true;
        });
    });
  }
  getProjectData(showLoader){
    return new Promise((resolve, reject) => {
      if (showLoader) {
        this.util.presentLoader();
      }
      let data = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        subcategory_id: this.catdata.id
      }
      console.log('data>>',data)
      this.user.getSearchProject(data, this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        console.log('resp>>',resp)
        if (resp.status) {
          this.pageNumber++;
          resolve(resp.data);
        }else {
          resolve([]);
        }
        showLoader?this.util.dismissLoader():'';
      }, error => {
        console.error(error);
        showLoader?this.util.dismissLoader():'';
        reject(error);
      });
    })
  }

  calculateDiff(item) {
    var date1 = new Date(item.project_from);
    var date2 = new Date(item.project_to);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  }

  openProject(item: any) {
    this.navCtrl.push('ViewProjectPage', { detail: item });
  }
  openNotification() {
    this.navCtrl.push('NotificationPage');
  }
  openHirePage(item: any) {
    this.navCtrl.push('HireFreelancerPage', { detail: item });
  }
  selectSegment(data) {
    console.log('data',data);
    this.searchTxt = '';
    this.isUserSelected = data;
    this.pageNumber = 1;
    if (!this.isUserSelected) {
      this.getUserData(true).then(data => {
        this.userDataList = data;
        (this.userDataList.length > 0) ? this.isUserListEmpty = false : this.isUserListEmpty = true;
      }).catch(err => {
        (this.userDataList.length > 0) ? this.isUserListEmpty = false : this.isUserListEmpty = true;
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

  getUserData(showLoader) {
    return new Promise((resolve, reject) => {
      if (showLoader) {
        this.util.presentLoader();
      }
      let data = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        subcategory_id: this.catdata.id
      }
      this.user.getUserList(data, this.userData.Authorization).subscribe(res => {
        let resp: any = res;
        console.log('resp',resp);
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
  goHire(item: any) {
    this.navCtrl.push('HireFreelancerPage', { detail: item });
  }
}
