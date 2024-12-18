import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipmentDetailPage } from './equipment-detail';

@NgModule({
  declarations: [
    EquipmentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EquipmentDetailPage),
  ],
})
export class EquipmentDetailPageModule {}
