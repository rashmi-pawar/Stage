import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FreelancerDetailPage } from './freelancer-detail';

@NgModule({
  declarations: [
    FreelancerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FreelancerDetailPage),
  ],
})
export class FreelancerDetailPageModule {}
