import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllBookingPage } from './all-booking';

@NgModule({
  declarations: [
    AllBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(AllBookingPage),
  ],
})
export class AllBookingPageModule {}
