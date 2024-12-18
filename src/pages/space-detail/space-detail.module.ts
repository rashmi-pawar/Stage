import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpaceDetailPage } from './space-detail';

@NgModule({
  declarations: [
    SpaceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SpaceDetailPage),
  ],
})
export class SpaceDetailPageModule {}
