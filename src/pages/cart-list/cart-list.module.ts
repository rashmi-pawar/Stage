import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartListPage } from './cart-list';

@NgModule({
  declarations: [
    CartListPage,
  ],
  imports: [
    IonicPageModule.forChild(CartListPage),
  ],
})
export class CartListPageModule {}
