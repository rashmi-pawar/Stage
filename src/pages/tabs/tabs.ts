import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {Tabs} from "ionic-angular/index";


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('tabs') tabRef: Tabs;

  tab1Root: any = 'HomePage';
  tab2Root: any = 'InboxPage';
  tab3Root: any = '';
  tab4Root: any = 'SearchPage';
  tab5Root: any = 'ProfilePage';

  tab1Title = "Home";
  tab2Title = "Inbox";
  tab3Title = "Post";
  tab4Title = "Search";
  tab5Title = "Profile";
  selectIndex: any = 0;

  constructor(public navCtrl: NavController,public event:Events) {
    event.subscribe('changeTab',value=>{
      this.tabRef.select(value);
    })
  }

  centerTab() {
    this.tabRef.select(2);
    this.navCtrl.push('AddPostPage');
  }
}
