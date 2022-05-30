import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatSupportService} from "../../services/chat-support.service";
import {CookieService} from "ngx-cookie-service";
import {ParticularChat} from "../chats/chats.component";
import {obs} from "../../app.component";
export interface ReceiveMessage{
  msgType: string, // String - value "receiveMessage"
  chatType: string, // String - Chat Type - "chat" - Single - "groupchat" - Group
  publisherJid: string, // String - Jid - One Who Sends the Message
  publisherId: string, // String - Id - One Who Sends the Message
  fromUserJid: string, // String - From User Jid -
                   // Will Be Same as PublisherJid in Case of Single Chat
                   // GroupJid in Case of Group Chat
  fromUserId: string, // String - From User Id
  toUserJid: string, // String - Jid - One Who Receives the Message
  toUserId: string, // String - Jid - One Who Receives the Message
  msgBody: {
    message: string, // String - Message Body
    message_type: string, // String - Message Type text, image, video, audio & file
    media: { // For Media Message Only
      caption: string, // String - Media Caption
      duration: string, // String - Duration - For Audio/Videos
      fileName: string, // String - File Name
      file_size: string, // Number - File Size
      file_url: string, // String - File Url
      is_downloaded: number, // Number - Downloaded Status
      is_uploading: number, // Number - Uploading Status
      local_path: string, // String - Local Path
      thumb_image: string, // Base64 - Thumb Image
    }
  },
  msgId: "", // String - Message Id
  msgStatus: number, // Number - Message Status
  timestamp: number, // Number - TimeStamp - 16 Character length

}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() showMePartially: boolean = false;
  @Input() data: { nickName: string, Jid: string } = {} as { nickName: string, Jid: string };
  form: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.nullValidator])
  });
  userJID: string = '';
  chatMessages: Array<string> = [];

  constructor(private chat: ChatSupportService, private cookie: CookieService) {
  }

  ngOnInit(): void {
    obs.subscribe((data: any) =>{
        if (data.hasOwnProperty('msgBody')){
          this.chatMessages.unshift(data?.msgBody?.message)
        }
      }
    )
  }

  onSubmit() {
    const username = this.cookie.get('username')
    const password = this.cookie.get('password')
    this.chat.SDK.login(username, password).then((_: any) => {
      this.chat.SDK.sendTextMessage(this.data.Jid, this.form.value.message).then((data: any) => {
        console.log("Message to new user", data);
        if(data.statusCode === 200){
          this.chatMessages.unshift(this.form.value.message)
          // this.ngOnInit()
        }
      })
    })
    // chatType: "chat"
    // fromUserId: "ki55hmm49d"
    // fromUserJid: "ki55hmm49d@xmpp-preprod-sandbox.mirrorfly.com"
    // msgBody: {message: 'r', message_type: 'text', nickName: '57', utcTimestamp: 1653931508468}
    // msgId: "f06469cb-0997-4672-9b43-e9126c5714a2"
    // msgStatus: 1
    // msgType: "receiveMessage"
    // publisherId: "ki55hmm49d"
    // publisherJid: "ki55hmm49d@xmpp-preprod-sandbox.mirrorfly.com"
    // timestamp: 1653942311597372
    // toUserId: "r814qnf748"
    // toUserJid: "r814qnf748@xmpp-preprod-sandbox.mirrorfly.com"
  }

  ngOnChanges() {
    // messageListener.call().subscribe()
    // messageListener.OnCha
    // messageListener.subscribe();
    const username = this.cookie.get('username')
    const password = this.cookie.get('password')
    this.chat.SDK.login(username, password).then((data: any) => {
      console.log("JIDJIDJIDJIDJDIJDIJIDDI", this.data.Jid);
      let chatMessages: Array<string> = [];
      this.chat.SDK.getChatMessages(this.data.Jid).then((messagesResp: any) => {
        const messages = messagesResp.data;
        messages.forEach((message: ParticularChat) => {
          console.log("message", message.msgBody.message)
          chatMessages.push(message.msgBody.message);
        })
        this.chatMessages = chatMessages;
      })
      console.log("this chat MESSAGES", this.chatMessages);
    })
  }
}
