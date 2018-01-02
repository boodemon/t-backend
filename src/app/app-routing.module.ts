import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { ReportComponent } from './report/report.component';
import { MemberComponent } from './member/member.component';
import { CheckComponent } from './auth/check/check.component';
import { LogoutComponent } from './Auth/logout/logout.component';


const routes: Routes = [
  {
    path:'',
    component:CheckComponent
    /*
    redirectTo:'login',
    pathMatch:'full'
    */
  },

  {
    path: 'login',
    component: LoginComponent,
    data:{
      title:'Administrator Login'
    }
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    data:{
      title:'Administrator Forgot password'
    }
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'orders',
        component:OrdersComponent,
        data : {
          title: 'Order from mobile'
        }
      },
      {
        path: 'order-detail/:id',
        component:OrderDetailComponent
      },
      {
        path: 'foods',
        loadChildren:'./foods/app-food.module#AppFoodModule',
      },
      {
        path: 'payment',
        component:PaymentComponent
      },
      {
        path: 'report',
        component:ReportComponent
      },
      {
        path: 'member',
        loadChildren:'./member/app-member.module#AppMemberModule'
      },
      {
        path:'users',
        loadChildren:'./users/app-user.module#AppUserModule',
      },
      {
        path: 'logout',
        component:LogoutComponent
      },
    ]
  },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
