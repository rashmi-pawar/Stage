import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpaceListPage } from './space-list';

@NgModule({
  declarations: [
    SpaceListPage,
  ],
  imports: [
    IonicPageModule.forChild(SpaceListPage),
  ],
})
export class SpaceListPageModule {}
