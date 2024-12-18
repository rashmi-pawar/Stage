import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import moment from "moment";
import { App } from "ionic-angular/index";
import { User } from "../../providers";
import { Storage } from "@ionic/storage";
import { UtilProvider } from '../../providers/util/util';
// import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  weekList: any = [];
  homedata: any = [];
  categoryData: any = [];
  projectData: any = [];
  eventData: any = [];
  dayname: string;
  spacedata: any = [];
  equdata: any = [];
  bannerDetail: any = [];
  projectList: any = [];
  pageNumber: any = 1;
  pageSize: any = 10;
  isListEmpty: boolean = false;
  eventList: any = [];
  spaceList: any = [];
  equipList: any = [];
  isListEmptySpace: boolean = false;
  isListEmptyEquipments: boolean = false;
  constructor(public navCtrl: NavController,
    public app: App,
    public user: User,
    public platform: Platform,
    public util: UtilProvider,
    public event: Events,
    public storage: Storage,
    public navParams: NavParams) {
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      console.log('>>>>', this.app.getActiveNavs()[0])
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();
      console.log('>>>>activeView', activeView)
      console.log('activeView>>>>', activeView.name)
      // Checks if can go back before show up the alert
      if (activeView.name === 'HomePage') {
        if (nav.canGoBack()) {
          console.log('canGoBack')
          nav.pop();
        }
        else {
          this.platform.exitApp();
        }
      } else if (activeView.name === 'InboxPage') {
        nav.parent.select(0);
      } else if (activeView.name === 'SearchPage') {
        nav.parent.select(0);
      } else if (activeView.name === 'ProfilePage') {
        // nav.parent.select(0);
        nav.setRoot('TabsPage');
      } else {
        nav.setRoot('TabsPage');
      }
    });
  }

  ionViewDidLoad() {
    this.getWeekList();
    this.gethomedetail('showLoader');
    this.getProjectList('showLoader');
    this.getAllEvents(true).then(data => {
      this.eventList = data;
      (this.eventList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    }).catch(err => {
      (this.eventList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    });
    this.getAllSpace(true).then(data => {
      this.spaceList = data;
      (this.spaceList.length > 0) ? this.isListEmptySpace = false : this.isListEmptySpace = true;
    }).catch(err => {
      (this.spaceList.length > 0) ? this.isListEmptySpace = false : this.isListEmptySpace = true;
    });
    this.getAllEquipments(true).then(data=>{
      this.equipList = data;
      (this.equipList.length>0)?this.isListEmptyEquipments=false:this.isListEmptyEquipments=true;
    }).catch(err=>{
      (this.equipList.length>0)?this.isListEmptyEquipments=false:this.isListEmptyEquipments=true;
    });
  }
  gethomedetail(showLoader) {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      if (showLoader) {
        this.util.presentLoader();
      }
      let data = {
        "search_text": ''
      }
      this.user.getHomedetail(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        console.log(resp);
        if (resp.status) {
          this.homedata = resp.data;
          this.categoryData = this.homedata.category_data;
          this.projectData = this.homedata.project_data;
          this.spacedata = this.homedata.sapace_data;
          this.equdata = this.homedata.equipment_data;
          this.eventData = this.homedata.event_data[0].event_info;
        }
        this.util.dismissLoader();
        // console.log(res);
      }, error => {
        console.error(error);
      });
      this.user.getHomebanner(user.Authorization).subscribe(res => {
        let resp: any = res;
        if (resp.status) {
          this.bannerDetail = resp.data;
        }
      }, error => {
        console.error(error);
      });
    })
  }
  getWeekList() {
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      let d = moment(date, 'YYYY-MM-DD');
      if (i == 0) {
        this.dayname = d.format('dddd');
        this.weekList.push({
          name: d.format('dddd'),
          date: date,
          isSelected: true
        })
      } else {
        this.weekList.push({
          name: d.format('dddd'),
          date: date,
          isSelected: false
        })
      }
    }
  }

  getToday(day) {
    let date1 = new Date(Date.now());
    let d1 = moment(date1, 'YYYY-MM-DD');
    if (day.name == d1.format('dddd')) {
      return 'todayDate';
    } else {
      return '';
    }
  }

  selectDay(day: any, i) {
    this.util.presentLoader();
    this.eventData = this.homedata.event_data[i].event_info;
    this.util.dismissLoader();
    this.weekList.filter(item => {
      if (item.name == day.name) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    })
  }

  openCategory(type: any) {
    this.navCtrl.push('CategoryListPage', { categoryType: type })
    localStorage.setItem("catname", type.title);
  }

  openAllProjects(item) {
    this.navCtrl.push('ProjectListPage', { detail: item });
  }

  openAllCategories(categoryData) {
    this.navCtrl.push('AllCategoriesPage', { detail: categoryData });
  }

  openNotification() {
    this.navCtrl.push('NotificationPage');
  }

  openProjectInner(status: string) {
    localStorage.setItem("showCancle", "");
    this.app.getRootNav().push('ProjectInnerPage', { status: status });
  }

  eventDetail(event: any) {
    // this.app.getRootNav().push('EventDetailPage');
    this.navCtrl.push('EventDetailPage', { event: event });
  }

  spaceDetail(space: any) {
    // this.app.getRootNav().push('SpaceDetailPage');
    this.navCtrl.push('SpaceDetailPage', { space: space });
  }
  equipmentDetailOwner(equip: any) {
    // this.app.getRootNav().push('EquipmentDetailPage');
    this.navCtrl.push('EquipmentDetailPage', { equip: equip });
    localStorage.setItem("showComplete","show");
  }
  equipmentDetail(equip: any) {
    // this.app.getRootNav().push('EquipmentDetailPage');
    this.navCtrl.push('EquipmentDetailPage', { equip: equip });
  }
  openSpaceDetailPage(space: any) {
    this.navCtrl.push('SpaceDetailPage',{space:space});
    localStorage.setItem("showComplete","show");
  }
  getProjectList(showLoader) {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      if (showLoader) {
        this.util.presentLoader();
      }
      let data = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      }
      this.user.getSearchProject(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        this.projectList = resp.data;
        if (resp.status) {
          this.util.dismissLoader();
        }
      }, error => {
        console.error(error);
      });
    })
  }

  gotoSearchTab() {
    // this.event.publish('changeTab',3);
    this.navCtrl.push('HomesearchPage');
  }
  getAllEvents(showLoader) {
    return new Promise((resolve, reject) => {
      this.storage.get('userData').then(userData => {
        let user: any = JSON.parse(userData);
        let data = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        if (showLoader) {
          this.util.presentLoader();
        }
        this.user.getEventList(data, user.Authorization).subscribe(res => {
          let resp: any = res;
          if (resp.status) {
            resolve(resp.data);
            this.pageNumber++;
          } else {
            reject('');
          }
          if (showLoader) {
            setTimeout(() => {
              this.util.dismissLoader();
            }, 500);
          }
        }, error => {
          console.error(error);
          reject(error);
          this.util.dismissLoader();
        });
      })
    })
  }
  openCompleteEventPage(event: any) {
    this.navCtrl.push('EventCompletePage', { event: event });
  }

  getAllSpace(showLoader) {
    return new Promise((resolve, reject) => {
      this.storage.get('userData').then(userData => {
        let user: any = JSON.parse(userData);
        let data = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        if (showLoader) {
          this.util.presentLoader();
        }
        this.user.getSpaceList(data, user.Authorization).subscribe(res => {
          let resp: any = res;
          if (resp.status) {
            resolve(resp.data)
            this.pageNumber++;
          } else {
            reject('');
          }
          if (showLoader) {
            setTimeout(() => {
              this.util.dismissLoader();
            }, 500);
          }
        }, error => {
          console.error(error);
          reject(error);
          this.util.dismissLoader();
        });
      })
    })
  }
  getAllEquipments(showLoader) {
    return new Promise((resolve, reject) => {
      this.storage.get('userData').then(userData => {
        let user: any = JSON.parse(userData);
        let data = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        if (showLoader){
          this.util.presentLoader();
        }
        this.user.getEquipmentList(data, user.Authorization).subscribe(res => {
          let resp: any = res;
          console.log('getEquipmentList',res);
          if (resp.status) {
            resolve(resp.data)
            this.pageNumber++;
          }else {
            reject('');
          }
          if (showLoader){
            setTimeout(() => {
              this.util.dismissLoader();
            }, 500);
          }
        }, error => {
          console.error(error);
          reject(error);
          this.util.dismissLoader();
        });
      })
    })
  }
}
