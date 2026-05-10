import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RestaurantMenuPageComponent } from './pages/restaurant-menu-page/restaurant-menu-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: SignInPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'restaurant',
        component: HomePageComponent,
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'cart',
        component: CartPageComponent,
      },
      {
        path: 'thankyou',
        component: ThankYouPageComponent,
      },
      {
        path: 'restaurants/:resId',
        component: RestaurantMenuPageComponent,
      },
    ],
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
