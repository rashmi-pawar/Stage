import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-all-categories',
  templateUrl: 'all-categories.html',
})
export class AllCategoriesPage {
  categoryList: any = [
    {
      categoryImage: 'assets/imgs/music.png',
      name: 'Music',
      tag: 'Tags'
    },
    {
      categoryImage: 'assets/imgs/fashion.png',
      name: 'Fashion',
      tag: 'Tags'
    },
    {
      categoryImage: 'assets/imgs/show.png',
      name: 'Shows',
      tag: 'Tags'
    },
    {
      categoryImage: 'assets/imgs/support1.png',
      name: 'Support',
      tag: 'Tags'
    },
    {
      categoryImage: 'assets/imgs/dance.png',
      name: 'Dance',
      tag: 'Tags'
    },
    {
      categoryImage: 'assets/imgs/art.png',
      name: 'Art',
      tag: 'Tags'
    }
  ];
  catdata: any;
  catdatago: any = [];
  catdatago1: any = [];
  catdatago2: any = [];
  new_test: any=[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage, ) {
    this.catdata = navParams.data.detail;
  }

  ionViewDidLoad() {
    this.getMyProfileData();
  }

  ionViewWillEnter() {
    this.getMyProfileData();
  }
  getMyProfileData() {
    this.storage.get('recentlyCat').then(recentlyCat => {
      this.catdatago = JSON.parse(recentlyCat);
      if(this.catdatago){
      this.new_test = [{ 'categoryImage': '', 'name': '', 'tag': '' }];
      this.new_test[0].name = this.catdatago[0].name;
      for (var i = 0; i <= this.catdatago.length - 1; i++) {
        var duplicate = false;
        for (var j = this.new_test.length - 1; j >= 0; j--) {
          if (this.catdatago[i].name == this.new_test[j].name) duplicate = true;
        }
        if (!duplicate) this.new_test.push(this.catdatago[i]);

      }
    }else{
      this.new_test=[];
    }
    })
  }
  openCategory(type: any) {
    this.navCtrl.push('CategoryListPage', { categoryType: type })
    localStorage.setItem("catname", type.title);
    this.catdatago2.push({
      categoryImage: type.image,
      tag: 'Tags',
      name: type.title
    });
    this.storage.set('recentlyCat', JSON.stringify(this.catdatago2));
    this.storage.get('recentlyCat').then(recentlyCat => {
      this.catdatago = JSON.parse(recentlyCat);
    })
  }
}
