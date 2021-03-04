import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {BookingListComponent} from './bookings/booking-list/booking-list.component';
import {BookingComponent} from './bookings/booking/booking.component';
import {BookingFormComponent} from './bookings/booking-form/booking-form.component';
import {UsersComponent} from './users/users.component';
import {UserPageComponent} from './user-page/user-page.component';
import {FlightsComponent} from './flights/flights.component';
import {LoginPageComponent} from './auth/login-page/login-page.component';
import {SignupPageComponent} from './auth/signup-page/signup-page.component';
import {HomeUserComponent} from './layout/home-user/home-user.component';
import {LoginActivateService} from './shared/services/login-activate.service';
import {NotFoundComponent} from './layout/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeUserComponent, canActivate: [LoginActivateService]},
  {path: 'home', component: HomeComponent, canActivate: [LoginActivateService]},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent, canActivate: [LoginActivateService]},
  {path: 'bookings', component: BookingListComponent, canActivate: [LoginActivateService]},
  {path: 'bookings/add', component: BookingFormComponent, canActivate: [LoginActivateService]},
  {path: 'bookings/:id', component: BookingComponent, canActivate: [LoginActivateService]},
  {path: 'users', component: UsersComponent, canActivate: [LoginActivateService]},
  {path: 'users/:id', component: UserPageComponent, canActivate: [LoginActivateService]},
  {path: 'flights', component: FlightsComponent, canActivate: [LoginActivateService]},
  {path: '**', component: NotFoundComponent, canActivate: [LoginActivateService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
