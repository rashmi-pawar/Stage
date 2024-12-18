import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DjListPage } from './dj-list';
import { StarRatingModule } from "ionic3-star-rating";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    DjListPage,
  ],
  imports: [
    IonicPageModule.forChild(DjListPage),
    StarRatingModule,
    ComponentsModule
  ],
})
export class DjListPageModule { }
