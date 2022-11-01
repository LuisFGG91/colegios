import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: ()=> import( './pages/login/login.module').then(l => l.LoginPageModule) },
  { path: 'register', loadChildren:()=> import( './pages/register/register.module').then(r => r.RegisterPageModule) },
  { path: 'home-results', loadChildren:()=> import( './pages/home-results/home-results.module').then(h => h.HomeResultsPageModule) },
  { path: 'about', loadChildren:()=> import( './pages/about/about.module').then(a => a.AboutPageModule) },
  { path: 'settings', loadChildren:()=> import( './pages/settings/settings.module').then(s => s.SettingsPageModule) },
  { path: 'edit-profile', loadChildren:()=> import( './pages/edit-profile/edit-profile.module').then(e => e.EditProfilePageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
