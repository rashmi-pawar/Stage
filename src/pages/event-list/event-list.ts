import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";
import {Refresher} from "ionic-angular/index";


@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  eventList : any = [];
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
    this.getAllEvents(true).then(data=>{
      this.eventList = data;
      (this.eventList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
    }).catch(err=>{
      (this.eventList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
    });
  }

  openCompleteEventPage(event:any) {
    this.navCtrl.push('EventCompletePage',{event:event});
  }

  getAllEvents(showLoader) {
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
        this.user.getEventList(data, user.Authorization).subscribe(res => {
          let resp: any = res;
          if (resp.status) {
            resolve(resp.data);
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
      this.getAllEvents(false).then((data)=>{
        let list : any = data;
        this.eventList = [...this.eventList, ...list];
        (this.eventList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
        infiniteScroll.complete();
      }).catch(()=>{
        (this.eventList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
        infiniteScroll.complete();
      })
    },500)
  }

  refresh(refresher: Refresher) {
    this.pageNumber = 1;
    this.getAllEvents(false).then((data)=>{
      let list : any = data
      this.eventList = list;
      (this.eventList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
      refresher.complete();
    }).catch(()=>{
      refresher.complete();
      (this.eventList.length>0)?this.isListEmpty=false:this.isListEmpty=true;
    });
  }
}
