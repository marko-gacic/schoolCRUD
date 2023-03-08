// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfessorsModule } from './modules/professors/professors.module';
import { StudentsModule } from './modules/students/students.module';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
// Services
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found.component';
import { LoginComponent } from './core/login/login.component';
import { AuthInterceptorProvider } from './core/auth/auth.interceptor';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './core/layout/layout.component';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: false,
  animation: {
    enterDuration: 200,
    exitDuration: 0
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    PageNotFoundComponent,
    LoginComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ProfessorsModule,
    StudentsModule,
    SharedModule
  ],
  providers: [HttpClientModule, AuthInterceptorProvider, { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig }],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }

