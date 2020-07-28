import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) { }

  login(email: string, password: string) {
    return new Promise((resolve, rejects) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then((user) => {
        resolve(user);
      }).catch((error) => {
        rejects(error);
      });
    })
  }

  register(email: string, password: string, name: string) {
    return new Promise((resolve, rejects) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then((res) => {
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          name: name,
          uid: uid
        });
        this.AFauth.auth.currentUser.updateProfile({
          displayName: name
        });
        resolve(res);
      }).catch((err) => {
        rejects(err);
      });

    })
  }
  logout() {
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
