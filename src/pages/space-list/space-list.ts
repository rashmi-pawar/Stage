import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";
import {Refresher} from "ionic-angular/index";

@IonicPage()
@Component({
  selector: 'page-space-list',
  templateUrl: 'space-list.html',
})
export class SpaceListPage {
  spaceList : any = [];
  pageNumber : any = 1;
  pageSize : any = 10;
  isListEmpty: boolean = false;
  constructor(public navCtrl: NavController,
              public user:User,
              public util:UtilProvider,
              public storage:Storage,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getAllSpace(true).then(data=>{
      this.spaceList = data;
      (this.spaceList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
    }).catch(err=>{
      (this.spaceList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
    });
  }

  openSpaceDetailPage(space: any) {
    this.navCtrl.push('SpaceDetailPage',{space:space});
    localStorage.setItem("showComplete","show");
  }

  getAllSpace(showLoader) {
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
        this.user.getSpaceList(data, user.Authorization).subscribe(res => {
          let resp: any = res;
          // console.log(res);
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

  loadMore(infiniteScroll) {
    setTimeout(()=>{
      this.getAllSpace(false).then((data)=>{
        let list : any = data;
        this.spaceList = [...this.spaceList, ...list];
        (this.spaceList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
        infiniteScroll.complete();
      }).catch(()=>{
        (this.spaceList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
        infiniteScroll.complete();
      })
    },500)
  }

  refresh(refresher: Refresher) {
    this.pageNumber = 1;
    this.getAllSpace(false).then((data)=>{
      let list : any = data
      this.spaceList = list;
      (this.spaceList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
      refresher.complete();
    }).catch(()=>{
      refresher.complete();
      (this.spaceList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
    });
  }
}
