import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import {StarRatingModule} from "ionic3-star-rating";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    StarRatingModule,
    ComponentsModule,
  ],
})
export class SearchPageModule {}
