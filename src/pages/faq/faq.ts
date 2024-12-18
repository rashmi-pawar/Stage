import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  isListEmpty: boolean = false;
  faqList = [
    {
      question:'What is Lorem ipsum?',
      answer:'Lorem ipsum is simply dummy text printing lorem ispum been the industry\'s standard dummy text ever since the 1500s, when an unknown\n' +
        '      ispum been the industry\'s standard dummy text ever since the 1500s, when an unknown ispum been the industry\'s standard dummy text ever since the 1500s, when an unknown',
      isOpen:true
    },
    {
      question:'Simply dummy',
      answer: 'Simply dummy text printing lorem ispum been the industry\'s standard dummy text ever since the 1500s',
      isOpen:false
    },
    {
      question:'Established fact',
      answer: '',
      isOpen:false
    },
    {
      question:'Page when looking',
      answer: '',
      isOpen:false
    },
    {
      question:'Like readable English',
      answer: '',
      isOpen:false
    },
    {
      question:'There are many variations',
      answer: '',
      isOpen:false
    },
    {
      question:'Contrary to popular',
      answer: '',
      isOpen:false
    },
    {
      question:'Randomised words',
      answer: '',
      isOpen:false
    },
    {
      question:'All the Lorem Ipsum',
      answer: '',
      isOpen:false
    }
  ]
  feqlist: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public user:User,
    public util:UtilProvider,
    public storage:Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('userData').then(userData => {
      let user: any = JSON.parse(userData);
      this.util.presentLoader();
      this.user.faqlist(user.Authorization).subscribe(res => {
        let resp: any = res;
        this.feqlist = resp.data;
        this.feqlist.length > 0 ? this.isListEmpty = false: this.isListEmpty = true;
        if (resp.status) {
          this.util.dismissLoader();
        }
        setTimeout(() => {
          this.util.dismissLoader();
        }, 500);
      }, error => {
        console.error(error);
      });
    })
  }

}
