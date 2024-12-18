import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../providers";
import { App } from "ionic-angular/index";
import { UtilProvider } from "../../providers/util/util";
import { Storage } from "@ionic/storage";
import { Refresher } from "ionic-angular/index";

@IonicPage()
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {

  projectList: any = [];
  pageNumber: any = 1;
  pageSize: any = 10;
  isListEmpty: boolean = false;
  allproject: any;
  constructor(public navCtrl: NavController,
    public user: User,
    public util: UtilProvider,
    public app: App,
    public storage: Storage,
    public navParams: NavParams) {
    this.allproject = navParams.data.detail;
  }

  ionViewDidLoad() {
    this.getAllSpace(true).then(data => {
      this.projectList = data;
      (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    }).catch(err => {
      (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    });
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
        this.user.myHiredProject(data, user.Authorization).subscribe(res => {
          let resp: any = res;
          console.log(resp);
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

  loadMore(infiniteScroll) {
    setTimeout(() => {
      this.getAllSpace(false).then((data) => {
        let list: any = data;
        this.projectList = [...this.projectList, ...list];
        (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
        infiniteScroll.complete();
      }).catch(() => {
        (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
        infiniteScroll.complete();
      })
    }, 500)
  }

  refresh(refresher: Refresher) {
    this.pageNumber = 1;
    this.getAllSpace(false).then((data) => {
      let list: any = data
      this.projectList = list;
      (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
      refresher.complete();
    }).catch(() => {
      refresher.complete();
      (this.projectList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
    });
  }
  openProjectInner(status: string,item:any) {
    this.app.getRootNav().push('ProjectInnerPage', { status: status });   
    if(item=='cancle'){
      localStorage.setItem("showComplete","show");
    }else{
      localStorage.setItem("showComplete","");
    }
    }
}
