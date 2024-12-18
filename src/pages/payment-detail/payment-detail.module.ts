import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentDetailPage } from './payment-detail';

@NgModule({
  declarations: [
    PaymentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentDetailPage),
  ],
})
export class PaymentDetailPageModule {}
