import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HireFreelancerPage } from './hire-freelancer';
import {ComponentsModule} from "../../components/components.module";
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    HireFreelancerPage,
  ],
    imports: [
        IonicPageModule.forChild(HireFreelancerPage),
        ComponentsModule,
        StarRatingModule,
    ],
})
export class HireFreelancerPageModule {}
