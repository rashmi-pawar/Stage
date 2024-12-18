import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCompletePage } from './event-complete';

@NgModule({
  declarations: [
    EventCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(EventCompletePage),
  ],
})
export class EventCompletePageModule {}
