import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-add-project',
  templateUrl: 'add-project.html',
})
export class AddProjectPage {

  startDate: String = new Date().toISOString();
  project:any = {
    title:'',
    description:'',
    email:'',
    price:'',
    category_id:'',
    subcategory_id:'',
    project_from:'',
    project_to:'',
    attachment:'',
    project_status:'1'
  }
  //Note:-project_status >>> 1=Inprogress,2=Completed"
  userData: any = {};
  attachmentToShow: any = '';
  allCategories: any = [];
  allSubCategories: any = [];
  constructor(public navCtrl: NavController,
              public user:User,
              public util:UtilProvider,
              public storage:Storage,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getUserData();
  }

  validate() {
    if (this.project.title.trim() === ''){
      this.util.presentToast('Please enter title');
      return false;
    }
    if (this.project.category_id === ''){
      this.util.presentToast('Please select Category');
      return false;
    }
    if (this.project.subcategory_id === ''){
      this.util.presentToast('Please select Subcategory');
      return false;
    }
    if (this.project.project_from.trim() === ''){
      this.util.presentToast('Please enter project from date');
      return false;
    }
    if (this.project.project_to.trim() === ''){
      this.util.presentToast('Please enter project to date');
      return false;
    }
    if (this.project.project_from.trim() > this.project.project_to.trim()){
      this.util.presentToast('Wrong from and to date');
      return false;
    }
    return true;
  }

  private getUserData() {
    this.storage.get('userData').then(userData=> {
      this.userData = JSON.parse(userData);
      this.getAllCategories();
    })
  }
  getAttachmentEvent(event) {
    this.project.attachment = event.target.files[0];
    let reader = new FileReader();
    let that = this;
    reader.onload = function(){
      that.attachmentToShow = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  saveProject() {

    console.log('this.project.attachment',this.project.attachment)
    if (this.validate()){
      let formData = new FormData();
      formData.append('title',this.project.title);
      formData.append('description',this.project.description);
      formData.append('email',this.project.email);
      formData.append('price',this.project.price);
      formData.append('category_id',this.project.category_id);
      formData.append('subcategory_id',this.project.subcategory_id);
      formData.append('project_from',this.project.project_from);
      formData.append('project_to',this.project.project_to);
      formData.append('attachment',this.project.attachment);
      formData.append('project_status',this.project.project_status);

      this.util.presentLoader();
      this.user.addProjectData(formData,this.userData.Authorization).subscribe(res=>{
        let resp : any =res;
        if (resp.status){
          this.util.presentAlert('',resp.message);
          this.project = {
            title:'',
            description:'',
            email:'',
            price:'',
            category_id:'',
            subcategory_id:'',
            project_from:'',
            project_to:'',
            attachment:'',
            project_status:'1'
          }
          this.attachmentToShow='';
          this.navCtrl.popToRoot();
        }else {
          this.util.presentToast(resp.message);
        }
        setTimeout(()=>{
          this.util.dismissLoader();
        },500);
      },error => {
        console.error(error);
        this.util.dismissLoader();
      });
    }
  }

  getAllCategories() {
    this.user.getCategoryList(this.userData.Authorization).subscribe(res=>{
      let resp : any = res;
      if (resp.status){
        this.allCategories = resp.data
      }
    },error => {
      console.error(error);
    });
  }

  selectCategory(category) {
    this.getSubCategoryList(category.id);
  }

  getSubCategoryList(id) {
    let data = {category_id:id}
    this.user.subCatlist(data,this.userData.Authorization).subscribe(res=>{
      let resp : any = res;
      this.allSubCategories = resp.data
    },error => {
      console.error(error);
    });
  }
}
