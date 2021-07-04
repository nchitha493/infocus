import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';  
import { UserService } from './services/user.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterComponent } from './toaster/toaster.component';
import { ToasterContainerComponent } from './toaster/toaster-container.component';
import { ToasterService } from './toaster.service';
import { AuthGuard } from './guard/auth.guard';
import {JwtInterceptor} from './jwtinterceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ToasterComponent,
    ToasterContainerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path:'',
        component:LoginComponent, pathMatch: "full"
      },{
        path:'register',
        component:RegisterComponent, pathMatch: "full"
      },
      {
        path:'home',
        component:HomeComponent, pathMatch: "full",
        canActivate: [AuthGuard]
      }])
 
  ],
  providers: [UserService,ToasterService,AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
