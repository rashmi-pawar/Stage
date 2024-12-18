import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectInnerPage } from './project-inner';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    ProjectInnerPage,
  ],
    imports: [
        IonicPageModule.forChild(ProjectInnerPage),
        StarRatingModule,
    ],
})
export class ProjectInnerPageModule {}
