import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoredCardPage } from './stored-card';

@NgModule({
  declarations: [
    StoredCardPage,
  ],
  imports: [
    IonicPageModule.forChild(StoredCardPage),
  ],
})
export class StoredCardPageModule {}
