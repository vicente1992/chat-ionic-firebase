import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ChatService } from '../servicios/chat.service';
import { ModalController, ActionSheetController } from '@ionic/angular'
import { ChatComponent } from '../componentes/chat/chat.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public chatsRoom: any = [];
  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private modal: ModalController,
    public actionSheetController: ActionSheetController
  ) { }
  ngOnInit() {
    this.getChat();
  }

  onLogout() {
    this.authService.logout();
  }
  getChat() {
    this.chatService.getChat().subscribe(chats => {
      this.chatsRoom = chats;
    })
  }
  openChat(chat) {
    this.modal.create({
      component: ChatComponent,
      componentProps: {
        chat: chat
      }
    }).then((modal) => modal.present());
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Logout',
        role: 'destructive',
        icon: 'log-out-outline',
        handler: () => {
          this.onLogout();
        }
      }]
    });
    await actionSheet.present();
  }

}
