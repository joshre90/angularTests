import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAdminPage } from './tab-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TabAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAdminPageRoutingModule {}
