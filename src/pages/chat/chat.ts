import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {UtilProvider} from "../../providers/util/util";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import { PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  chatRef:any={}
  chats: any[] = [];
  isListEmpty: boolean = false;
  msg: any = '';
  otherUser:any={};
  me:any={};
  constructor(public navCtrl: NavController,public popoverCtrl: PopoverController,
              public firedb:FirebaseProvider,
              public util:UtilProvider,
              public storage:Storage,
              public navParams: NavParams) {
    this.chatRef = navParams.data.chatRef;
    this.otherUser = navParams.data.otherUser;
    this.me = navParams.data.me;
    console.log(this.otherUser);
    // console.log(this.me);
    // console.log(this.chatRef);
  }

  ionViewDidLoad() {
    this.getAllChats();
  }

  getAllChats() {
    this.util.presentLoader();
    this.firedb.getAllUserChats(this.chatRef).subscribe(data=>{
      if (data && data.length){
        this.chats = data;
      }
      this.chats.length && this.chats.length>0?this.isListEmpty=false:this.isListEmpty=true;
      // console.log('all chat is >>>',this.chats);
      setTimeout(()=>{
        this.scrollBottom();
        this.util.dismissLoader();
      },500);
    });
  }

  sendMsg() {
    if (this.msg.trim() ===''){
      return;
    }
    let message = {
      message:this.msg.trim(),
      date:new Date().getTime(),
      isRead:false,
      type:'text',
      fileData:'',
      senderUserId:this.me.id
    }
    this.firedb.addMessage(message,this.chatRef).then(res=>{
      this.msg = '';
      this.scrollBottom();
      let user = {
        date_of_join:new Date().getTime(),
        id:this.me.id,
        image:this.me.image,
        name:this.me.first_name!==''?this.me.first_name+' '+this.me.last_name:this.me.username,
        roomId:this.chatRef
      }
      this.firedb.addUser(user,this.otherUser.id);
    }).catch(err=>{})
  }

  scrollBottom(){
    if (this.content){
      setTimeout(()=>{
        this.content.scrollToBottom();
      },300)
    }
  }

  notification() {
    this.navCtrl.push('NotificationPage');
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('HirePopoverPage',{detail:this.otherUser});
    popover.present({
      ev: myEvent
    });
  }
}
