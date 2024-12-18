import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class FirebaseProvider {

  chats: Observable<any[]>;
  users: Observable<any[]>;
  chatRef :any;
  userRef :any;
  constructor(public http: HttpClient,public db : AngularFireDatabase) {
  }

  addUser(user,myId) {
    let users : any = this.db.list('/all-users/'+myId).valueChanges();
    let disposeMe = users.subscribe(item=>{
      let userArr : any = item;
      let isUserAvailable : boolean = false;
      userArr.filter(item=>{
        if (item.id === user.id){
          //user is already in the list
          isUserAvailable = true;
          return;
        }
      })
      disposeMe.unsubscribe();
      if (!isUserAvailable){
        this.userRef = this.db.database.ref('/all-users/'+myId);
        this.userRef.push(user).then(() =>{})
      }
    });
  }
  getAllUsers(myId){
    this.users = this.db.list('/all-users/'+myId).valueChanges();
    return this.users;
  }

  getFirstChat(roomId){
    this.chats = this.db.list('/all-chats/'+roomId,
      ref => ref.limitToLast(1)).valueChanges();
    return this.chats;
  }
  addMessage(message,ref) {
    return new Promise((resolve, reject) => {
      this.chatRef = this.db.database.ref('/all-chats/'+ref);
      this.chatRef.push(message).then(() =>{
        resolve(true);
      }).catch(()=>{
        reject(false);
      });
    });
  }
  getAllUserChats(roomId){
    this.chats = this.db.list('/all-chats/'+roomId).valueChanges();
    return this.chats;
  }

}
