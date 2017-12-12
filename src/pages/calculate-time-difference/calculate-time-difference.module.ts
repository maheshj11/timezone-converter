import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculateTimeDifferencePage } from './calculate-time-difference';

@NgModule({
  declarations: [
    CalculateTimeDifferencePage,
  ],
  imports: [
    IonicPageModule.forChild(CalculateTimeDifferencePage),
  ],
})
export class CalculateTimeDifferencePageModule {}
