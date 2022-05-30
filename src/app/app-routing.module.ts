import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from "./components/registration/registration.component";
import {ChatsComponent} from "./components/chats/chats.component";
import {AuthGuard} from "./services/guards/auth.guard";

const routes: Routes = [
  {path: "register", component: RegistrationComponent},
  {path: "chat", component: ChatsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
