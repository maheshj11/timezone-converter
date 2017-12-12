import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompareTimePage } from './compare-time';

@NgModule({
  declarations: [
    CompareTimePage,
  ],
  imports: [
    IonicPageModule.forChild(CompareTimePage),
  ],
})
export class CompareTimePageModule {}
