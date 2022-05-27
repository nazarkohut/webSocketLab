import {Component, Input, OnInit} from '@angular/core';
import {ChatSupportService} from "../../services/chat-support.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Registration} from "../registration/registration.component";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-chat',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({
    jid: new FormControl('')
  });
  userJID: string = '';

  onSubmit() {
    console.log("from form", this.form.value.jid)
    this.chat.SDK.sendTextMessage(this.form.value.jid, `${'I am writing to you to let you kno'}`, '1').then((data: object) => {
      console.log(data);
    });
    this.chat.SDK.createGroup(`GROUP_NAME`, [this.form.value.jid, this.userJID]);
  }
  constructor(private cookie: CookieService,private chat: ChatSupportService) {
  }

  ngOnInit(): void {
    const userJID = this.chat.SDK.getCurrentUserJid().userJid.split('/')[0];
    console.log("jid", userJID);
    this.userJID = userJID;
    const username = this.cookie.get("username");
    const password = this.cookie.get("password");
    if (!(username || password)){
      throw Error("Unable to authenticate")
    }
    // const data = {username: this.cookie.get("username"), password: this.cookie.get("username")}
    this.chat.SDK.login(username, password).then((data: any) => {
      console.log("login", data)
    })

    // this.chat.SDK.getFriendsList().then((data: any) => {
    //   console.log("friends", data)
    // });
    // console.log("profile", this.chat.SDK.getUserProfile(this.userJID));
    // this.chat.SDK.getUserProfile(this.userJID).then((data: object) => {
    //   console.log("Jid", data);
    // })

    // this.chat.SDK.getChatMessages(userJID);
      //.then((data: object) => {
    //   console.log(data);
    // });

    this.chat.SDK.sendTextMessage(userJID, `${'I am writing to you to let you kno'}`).then((data: object) => {
      console.log(data);
    //
    // this.chat.SDK.getRecentChats()
    // this.chat.SDK.getRecentChats().then((data: object) => {
    //
    //   console.log("chat", data)
    //
    });
    // console.log("jid", this.chat.SDK.getgid())
    // this.chat.SDK.createGroup(`GROUP_NAME`, [``], `GROUP_IMAGE`).then((data: object) => {
    //   console.log(data)
    // })
    //
    this.chat.SDK.getRecentChats().then((data: object) => {
      console.log("chat", data);
    });
  }
}
