import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorldClockPage } from './world-clock';

@NgModule({
  declarations: [
    WorldClockPage,
  ],
  imports: [
    IonicPageModule.forChild(WorldClockPage),
  ],
})
export class WorldClockPageModule {}
