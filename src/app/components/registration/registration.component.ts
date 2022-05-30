import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatSupportService} from "../../services/chat-support.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

export interface UsernamePassword {
  username: string,
  password: string,
}

export interface Registration {
  data: {
    token: string,
    username: string,
    password: string,
    isExisting: boolean,
    isProfileUpdated: boolean,
  }
  message: string
  statusCode: number
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required])
  });
  username: string = "";
  password: string = "";
  registerData: UsernamePassword = {} as UsernamePassword;

  constructor(private router: Router, private cookie: CookieService, private chat: ChatSupportService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // `AUTO_LOGIN`
    const username = this.form.value.username;
    this.chat.SDK.register(`${username}`).then((data: any) => {
      console.log(data)
      this.registerData = data.data;
      return data.data;
    }).then((data: any) => {
      this.cookie.set('token', data.token)
      this.username = data.username;
      this.password = data.password;
      this.chat.SDK.login(this.username, this.password).then((data: any) => {
        console.log("login", data);
        this.chat.SDK.setUserProfile(this.form.value.username, `IMAGE`, `STATUS`, `MOBILE_NUMBER`, `EMAIL`).then((data: any) => {
          console.log("Setting profile", data)
        });
        this.cookie.set("username", this.username, 240000000);
        this.cookie.set("password", this.password, 240000000);
        this.router.navigate(['chat']).then((data: any) => {
          console.log(data);
        });
      });

    });
  }

}
