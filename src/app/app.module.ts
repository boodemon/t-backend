import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { OrdersComponent } from './orders/orders.component';
import { ReportComponent } from './report/report.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckComponent } from './auth/check/check.component';

// Service
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './Auth/logout/logout.component';

// Child module //
import { AppUserModule } from './users/app-user.module';
import { AppMemberModule } from './member/app-member.module';
import { AppFoodModule } from './foods/app-food.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    FullLayoutComponent,
    SimpleLayoutComponent,
    ForgotComponent,
    OrdersComponent,
    ReportComponent,
    OrderDetailComponent,
    PaymentComponent,
    CheckComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    AppUserModule,
    AppMemberModule,
    AppFoodModule
  ],
  providers: [
    {
        provide: LocationStrategy,
        useClass: HashLocationStrategy,    
    },
    UsersService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
