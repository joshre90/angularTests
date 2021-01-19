import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAdminPageRoutingModule } from './tab-admin-routing.module';

import { TabAdminPage } from './tab-admin.page';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

//Calendar Imports
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalModalPageModule } from '../pages/cal-modal/cal-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAdminPageRoutingModule,
    ExploreContainerComponentModule,
    NgCalendarModule,
    CalModalPageModule,
  ],
  declarations: [TabAdminPage]
})
export class TabAdminPageModule {}
