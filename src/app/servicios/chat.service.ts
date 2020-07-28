import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Chat } from '../models/chat';
import { Message } from '../models/message';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore) { }

  getChat() {
    return this.db.collection('chatsRoom').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Chat;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  chatRoom(chatId: string) {
    return this.db.collection('chatsRoom').doc(chatId).valueChanges();
  }
  sendToMsgFirebase(message: Message, chatId: string) {
    return this.db.collection('chatsRoom').doc(chatId).update({
      messages: firestore.FieldValue.arrayUnion(message),
    })
  }
}
