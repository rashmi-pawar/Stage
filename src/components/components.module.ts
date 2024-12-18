import { NgModule } from '@angular/core';
import { RoundSegmentComponent } from './round-segment/round-segment';
import {CommonModule} from "@angular/common";
@NgModule({
	declarations: [RoundSegmentComponent],
    imports: [
        CommonModule
    ],
	exports: [RoundSegmentComponent]
})
export class ComponentsModule {}
