import {Component} from '@angular/core';
import {ChatSupportService} from "./services/chat-support.service";
import {LICENCE_KEY} from "../config";
export declare var SDK: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'websocketsLab';
  constructor(private chat: ChatSupportService) {
  }

  ngOnInit(): void {
    // console.log(SDK)
    // declare var SDK: any;
    const connectionListener = () => {
    };
    const presenceListener = () => {
    };
    const friendsListListener = (response: any) => {
      console.log("Friends List", response);
    };
    const userProfileListener = (response:any) => {
      console.log("User Profile Details Listener", response);
    };
    const messageListener = (response: any) => {
      console.log("Message Listener", response);
    };
    const replyMessageListener = () => {
    };
    const favouriteMessageListener = () => {
    };
    const groupProfileListener = () => {
    };
    const groupMsgInfoListener = () => {
    };
    const mediaUploadListener = () => {
    };
    const blockUserListener = () => {
    };
    const singleMessageDataListener = () => {
    };
    const muteChatListener = () => {
    };
    const archiveChatListener = () => {
    };
    const adminBlockListener = () => {
    };

    const initializeObj = {
      xmppSocketHost: "xmpp-preprod-sandbox.mirrorfly.com",
      xmppSocketPort: 5280,
      ssl: true,
      encryptKey: "ddc0f15cc2c90fca",
      apiBaseUrl: "https://api-preprod-sandbox.mirrorfly.com/api/v1",
      licenseKey: LICENCE_KEY,
      isSandbox: `SANDBOX_MODE`,
      signalServer: "https://signal-domain.com/",
      janusUrl: "wss://domain.com",
      callbackListeners: {
        connectionListener,
        presenceListener,
        friendsListListener,
        userProfileListener,
        messageListener,
        replyMessageListener,
        favouriteMessageListener,
        groupProfileListener,
        groupMsgInfoListener,
        mediaUploadListener,
        blockUserListener,
        singleMessageDataListener,
        muteChatListener,
        archiveChatListener,
        adminBlockListener
      },
    };
    SDK.initializeSDK(initializeObj)
    this.chat.SDK = SDK;

  }
}
