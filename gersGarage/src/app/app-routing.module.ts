import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { AuthService } from '../app/_services/auth.service';


/* import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.Page';
import { ProfilePage } from './pages/profile/profile.Page';
import { BoardUserPage } from './pages/board-user/board-user.Page';
import { BoardModeratorPage } from './pages/board-moderator/board-moderator.Page';
import { BoardAdminPage } from './pages/board-admin/board-admin.Page';


const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'profile', component: ProfilePage },
  { path: 'user', component: BoardUserPage },
  { path: 'mod', component: BoardModeratorPage },
  { path: 'admin', component: BoardAdminPage },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
]; */

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    //canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'board-admin',
    loadChildren: () => import('./pages/board-admin/board-admin.module').then( m => m.BoardAdminPageModule)
  },
  {
    path: 'board-moderator',
    loadChildren: () => import('./pages/board-moderator/board-moderator.module').then( m => m.BoardModeratorPageModule)
  },
  {
    path: 'board-user',
    loadChildren: () => import('./pages/board-user/board-user.module').then( m => m.BoardUserPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
