import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',redirectTo: 'loader',pathMatch: 'full'},
  {path: 'loader',loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)},
  {path: 'login',loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  {path: 'register',loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)},
  {path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {path: 'my-bookings',loadChildren: () => import('./pages/my-bookings/my-bookings.module').then( m => m.MyBookingsPageModule)},
  {path: 'choose-ticket',loadChildren: () => import('./pages/choose-ticket/choose-ticket.module').then( m => m.ChooseTicketPageModule)},
  {path: 'booking',loadChildren: () => import('./pages/booking/booking.module').then( m => m.BookingPageModule)},
  {
    path: 'timetable',
    loadChildren: () => import('./pages/timetable/timetable.module').then( m => m.TimetablePageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}