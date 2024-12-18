import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipmentListPage } from './equipment-list';

@NgModule({
  declarations: [
    EquipmentListPage,
  ],
  imports: [
    IonicPageModule.forChild(EquipmentListPage),
  ],
})
export class EquipmentListPageModule {}
