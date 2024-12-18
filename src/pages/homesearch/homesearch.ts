
import { Component } from '@angular/core';
import {  App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../providers";
import { Storage } from "@ionic/storage";
import { UtilProvider } from '../../providers/util/util';


@IonicPage()
@Component({
  selector: 'page-homesearch',
  templateUrl: 'homesearch.html',
})
export class HomesearchPage {
  searchTxt: any = '';
  isFreeLancerSelected: boolean = false;
  projectData: any = '';
  pageNumber: any = 1;
  pageSize: any = 10;
  freelancerData: any = [];
  userData:any={};
  isFreelancerListEmpty:boolean = false;
  isProjectListEmpty: boolean = false;
  homedata: any ='';
  categoryData: any='';
  spacedata: any='';
  equdata: any='';
  eventData: any='';
  isShow = false;
  constructor(public navCtrl: NavController,public app:App, public navParams: NavParams,
    public user: User,
    public util: UtilProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
  }

  gethomedetail(showLoader) {

    return new Promise((resolve, reject) => {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      // if (showLoader) {
      //   this.util.presentLoader();
      // }
     let data = {
      "search_text":this.searchTxt
      }
      this.user.getHomedetail(data,user.Authorization).subscribe(res => {
        let resp: any = res;
        console.log(resp);
        if (resp.status) {
          this.isShow=true;
          this.homedata = resp.data;
          this.categoryData = this.homedata.category_data;
          this.projectData = this.homedata.project_data;
          this.spacedata = this.homedata.sapace_data;
          this.equdata = this.homedata.equipment_data;
          this.eventData = this.homedata.event_data[0].event_info;
        }
        // this.util.dismissLoader();
        // console.log(res);
      }, error => {
        console.error(error);
      });
    })
  })
  }

  searchInput(event: UIEvent) {
    setTimeout(()=>{
      this.gethomedetail(true);
    },200);
  }

  calculateDiff(item) {
    var date1 = new Date(item.project_from);
    var date2 = new Date(item.project_to);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  }

  openProject(item) {
    this.navCtrl.push('ViewProjectPage', { detail: item });
  }
  goHire(item: any) {
    this.navCtrl.push('HireFreelancerPage', { detail: item });
  }
  openProjectInner(status: string) {
    localStorage.setItem("showCancle","");
    this.app.getRootNav().push('ProjectInnerPage', { status: status });
  }

  eventDetail(event: any) {
    this.navCtrl.push('EventDetailPage', { event: event });
  }

  spaceDetail(space: any) {
    this.navCtrl.push('SpaceDetailPage', { space: space });
  }

  equipmentDetail(equip: any) {
    this.navCtrl.push('EquipmentDetailPage', { equip: equip });
  }
}
