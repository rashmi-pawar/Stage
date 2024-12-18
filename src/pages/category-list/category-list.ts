import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from "ionic-angular/index";
import { UtilProvider } from '../../providers/util/util';
import { Storage } from "@ionic/storage";
import { User } from "../../providers";


@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {
  categoryType: any = 'Music';
  categoryList: any = [
    {
      categoryImage: '',
      title: '',
      subtitle: ''
    }
  ];
  subcatList: any;
  categoryName: any;
  isListEmpty: boolean = false;

  constructor(public navCtrl: NavController,
    public app: App,
    public storage: Storage,
    public util: UtilProvider,
    public user: User,
    public navParams: NavParams) {
    this.categoryType = navParams.data.categoryType;

  }

  ionViewDidLoad() {
    this.setupData();
    this.getSubcat(true);
  }

  setupData() {
    switch (this.categoryType) {
      case 'Music': this.setMusicData();
        break;
      case 'Fashion': this.setFashionData();
        break;
      case 'Shows': this.setShowsData();
        break;
      case 'Support': this.setSupportData();
        break;
      case 'Dance': this.setDanceData();
        break;
      case 'Art': this.setArtData();
        break;
    }
  }

  setMusicData() {
    this.categoryList = [
      {
        categoryImage: 'assets/imgs/music1.png',
        title: 'Dj',
        subtitle: 'Tags'
      },
      {
        categoryImage: 'assets/imgs/music2.png',
        title: 'Musician',
        subtitle: 'Tags'
      },
      {
        categoryImage: 'assets/imgs/music3.png',
        title: 'Singer',
        subtitle: 'Tags'
      }
    ];
  }

  setFashionData() {
    this.categoryList = [
      {
        categoryImage: 'assets/imgs/fashion1.png',
        title: 'Model',
        subtitle: 'Tags'
      },
      {
        categoryImage: 'assets/imgs/fashion2.png',
        title: 'Make Up Artist',
        subtitle: 'Tags'
      }
    ];
  }

  setShowsData() {
    this.categoryList = [
      {
        categoryImage: 'assets/imgs/shows1.png',
        title: 'Comedian',
        subtitle: 'Tags'
      },
      {
        categoryImage: 'assets/imgs/shows2.png',
        title: 'Magician',
        subtitle: 'Tags'
      },
      {
        categoryImage: 'assets/imgs/shows3.png',
        title: 'Host',
        subtitle: 'Tags'
      }
    ];
  }

  setSupportData() {
    this.categoryList = [
      {
        categoryImage: 'assets/imgs/support1.png',
        title: 'Lighting',
        subtitle: 'Tags'
      },
      {
        categoryImage: 'assets/imgs/support1.png',
        title: 'Sound Engineer',
        subtitle: 'Tags'
      }
    ];
  }

  setDanceData() {
    this.categoryList = [
      {
        categoryImage: 'assets/imgs/dance.png',
        title: 'Dancer',
        subtitle: 'Tags'
      }
    ];
  }
  setArtData() {
    this.categoryList = [
      {
        categoryImage: 'assets/imgs/art.png',
        title: 'Artist',
        subtitle: 'Tags'
      }
    ];
  }

  openDetailList(item: any) {
      // this.app.getRootNav().push('DjListPage', detail : item);
    this.navCtrl.push('DjListPage', { detail: item })
  }
  getSubcat(showLoader) {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      let data = {
        "category_id": this.categoryType.id
      }
      console.log('category_id',data)
      if (showLoader) {
        this.util.presentLoader();
      }
      this.user.subCatlist(data, user.Authorization).subscribe(res => {
        let resp: any = res;
        console.log(resp);
        this.subcatList = resp.data;
        (this.subcatList.length > 0) ? this.isListEmpty = false : this.isListEmpty = true;
        this.categoryName = localStorage.getItem("catname");
        if (resp.status) {
          this.util.dismissLoader();
        }
        if (showLoader) {
          setTimeout(() => {
            this.util.dismissLoader();
          }, 500);
        }
      }, error => {
        console.error(error);
      });
    })
  }
}
