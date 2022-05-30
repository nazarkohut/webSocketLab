import {Component, Input, OnInit} from '@angular/core';
import {ChatSupportService} from "../../services/chat-support.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, RouterLinkActive} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {domain} from "../../../config";

export interface UserProfile {
  email: string
  fromUser: string
  image: string
  mobileNumber: string
  nickName: string
  status: string
  userId: string
}

export interface ParticularChat {
  archiveStatus: number
  chatType: string
  createdAt: Date,
  deleteStatus: number
  fromUserId: string
  msgBody: msgBody,
  msgId: string
  msgStatus: number
  msgType: string
  muteStatus: number
  publisherId: string
  timestamp: number
  toUserId: string
  unreadCount: number
  updatedAt: Date,
  userId: string
}

export interface msgBody {
  message: string,
  message_type: string
  nickName: string
  utcTimestamp: number
}


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  addForm: FormGroup = new FormGroup({
      Jid: new FormControl('', [Validators.required])
    }
  );
  chatsData: Array<{ nickName: string, Jid: string }> = [];
  userJID: string = '';
  showVar: boolean = false;
  chatData: { nickName: string, Jid: string } = {} as { nickName: string, Jid: string };

  onSubmit() {
    const username = this.cookie.get('username')
    const password = this.cookie.get('password')
    this.chat.SDK.login(username, password).then((_: any)=>{
      console.log("Add value JID", this.addForm.value.Jid)
      this.chat.SDK.sendTextMessage(this.addForm.value.Jid, "Hi").then((data: any) => {
        console.log("Message to new user", data);
      })
    })
  }

  constructor(private cookie: CookieService, private chat: ChatSupportService, private router: Router) {
  }

  ngOnInit(): void {
    const username = this.cookie.get('username')
    const password = this.cookie.get('password')
    this.chat.SDK.login(username, password).then((data: any) => {
      const userJID = this.chat.SDK.getCurrentUserJid().userJid.split('/')[0];
      console.log("jid", userJID);
      this.userJID = userJID;
      console.log("current JID", this.chat.SDK.getCurrentUserJid().userJid);
      this.chat.SDK.getUserProfile(this.userJID).then((data: any) => {
        console.log("User Profile", data);
      });
      this.chat.SDK.getRecentChats(userJID).then((data: { statusCode: number, message: string, data: Array<ParticularChat> }) => {
        console.log("data", data);
        let chatsData: Array<{ nickName: string, Jid: string }> = [];
        // let chatsNickNames: Array<string> = [];

        data.data.forEach(chat => {
          // console.log("chat", chat);
          let currentChatData = {nickName: '', Jid: chat.fromUserId + domain}
          this.chat.SDK.getUserProfile(currentChatData.Jid).then((data: { data: UserProfile }) => {
            // const currNickName = data.data.nickName;
            currentChatData.nickName = data.data.nickName;
            // chatsNickNames.push(currNickName)
          })
          chatsData.push(currentChatData);
        });
        this.chatsData = chatsData;
        console.log(this.chatsData)
      });
    })

  }

  redirect(link: string
  ) {
    this.router.navigate([link])
  }

  toggleChild(data: any) {
    this.chatData = data;
    if (!this.showVar) {
      this.showVar = !this.showVar;
    }
  }
}
