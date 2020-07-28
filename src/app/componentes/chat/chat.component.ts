import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Message } from 'src/app/models/message';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatService } from 'src/app/servicios/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public chat: any;
  // public message: Message;
  public room: any;
  public msg: string;
  constructor(
    private navparams: NavParams,
    private modal: ModalController,
    private chatService: ChatService,
    private AFauth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.chat = this.navparams.get('chat');
    this.chatService.chatRoom(this.chat.id).subscribe(room => {
      this.room = room;
    });
  }
  closeChat() {
    this.modal.dismiss();
  }

  sendMessage() {
    const mensaje: Message = {
      content: this.msg,
      type: 'text',
      name: this.AFauth.auth.currentUser.displayName,
      date: new Date

    }
    this.chatService.sendToMsgFirebase(mensaje, this.chat.id);
    this.msg = '';

  }
}
