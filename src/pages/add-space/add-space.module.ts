import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSpacePage } from './add-space';

@NgModule({
  declarations: [
    AddSpacePage,
  ],
  imports: [
    IonicPageModule.forChild(AddSpacePage),
  ],
})
export class AddSpacePageModule {}
