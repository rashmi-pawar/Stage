import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllEventBookedPage } from './all-event-booked';

@NgModule({
  declarations: [
    AllEventBookedPage,
  ],
  imports: [
    IonicPageModule.forChild(AllEventBookedPage),
  ],
})
export class AllEventBookedPageModule {}
