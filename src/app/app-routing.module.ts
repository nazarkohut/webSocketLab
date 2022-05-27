import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from "./components/registration/registration.component";
import {ChatsComponent} from "./components/chat/chats.component";

const routes: Routes = [
  {path: "register", component: RegistrationComponent},
  {path: "chat", component: ChatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
