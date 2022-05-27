import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
    username: new FormControl('')
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
      // this.router.navigate(['chat']);
      return data.data;
      // console.log("registerdata", this.registerData)
      // this.chat.SDK.login(this.registerData.username, this.registerData.password).then((data: any) => {
      //   console.log('login', data)
      //   this.chat.SDK.setUserProfile(`NAME`, `IMAGE`, `STATUS`, `MOBILE_NUMBER`, `EMAIL`).then((data: any) => {
      //     console.log("profile", data)
      //   this.chat.SDK.syncContacts(this.form.value.username).then((data: any) => {
      //     console.log("sync Contacts", data)
      //     const userJid = this.chat.SDK.getCurrentUserJid().userJid
      //     console.log("USERJID1231", userJid)
      //     console.log("profile", this.chat.SDK.getUserProfile(userJid))
      //   });
    }).then((data: any) => {
      this.username = data.username;
      this.password = data.password;
      this.chat.SDK.login(this.username, this.password).then((data: any) => {
        console.log("login", data);
        this.cookie.set("username", this.username, 240000000);
        this.cookie.set("password", this.password, 240000000);
        this.router.navigate(['chat']);
      })
      // console.log("for login", data)
    });
    // });
    // })
    // console.log(this.registerData)
    // this.chat.SDK.login(this.registerData.username, this.registerData.password).then((data: any) => {
    //   console.log('login', data)
    // });
  }

}
