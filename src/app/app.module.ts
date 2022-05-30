import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatsComponent } from './components/chats/chats.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegistrationComponent } from './components/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import {CookieService} from "ngx-cookie-service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ChatComponent} from "./components/chat/chat.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {JwtInterceptor} from "./services/interceptors/jwt-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthGuard} from "./services/guards/auth.guard";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  declarations: [
    AppComponent,
    ChatsComponent,
    RegistrationComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [CookieService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
