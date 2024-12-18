import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import {NgCircleProgressModule} from "ng-circle-progress";
import {StarRatingModule} from "ionic3-star-rating";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    NgCircleProgressModule.forRoot({
      "space": -5,
      "animateTitle": false,
      "animationDuration": 300,
      "showUnits": true,
      "showBackground": false,
      "clockwise": true,
    }),
    StarRatingModule,
    ComponentsModule
  ],
})
export class ProfilePageModule {}
