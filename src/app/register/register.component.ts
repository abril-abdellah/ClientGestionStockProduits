import { Component, OnInit } from '@angular/core';
import { User } from "../shared/User";
import { UserService } from "../service/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TokenStorageService } from "../service/token-storage.service";
import { Router } from "@angular/router";
import { passwordMatch } from "./passwordMatch";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerStatus;
  msgPopup = 'Erreur au niveau du serveur :(';
  ok: boolean;

  registerForm: FormGroup = this.formBuilder.group(
    {
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      verifiedPassword: ['', [Validators.required]]
    },
    { validator: passwordMatch }
  );

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (!!this.tokenStorageService.getToken()) {
      this.router.navigate(['dashboard']);
    }
  }

  sauvegarder() {
    let user = new User();
    user.username = this.getUsernameCtrl().value;
    user.email = this.getEmailCtrl().value;
    user.password = this.getPasswordCtrl().value;
    this.userService.addUser(user).subscribe(
      data => {
        this.registerStatus = data.status;
        if (this.registerStatus > 199 && this.registerStatus < 299) {
          this.ok = true;
          this.msgPopup = "Vos données sont bien enregistrées et votre compte est actuellement désactivé. Contactez l'administration pour l'activer";
        }
      },
      error => {
        this.msgPopup = 'Erreur au niveau du serveur :(';
        console.log(error)
      }
    );

  }

  getUsernameCtrl() {
    return this.registerForm.get('username');
  }
  getEmailCtrl() {
    return this.registerForm.get('email');
  }
  getPasswordCtrl() {
    return this.registerForm.get('password');
  }
  getVerifiedPasswordCtrl() {
    return this.registerForm.get('verifiedPassword');
  }

  annuler() {
    this.router.navigate(['login']);
  }
  //Verifier que les mot de passe sont les mêmes
  verifierPasswords() {
    if (this.getPasswordCtrl().value == this.getVerifiedPasswordCtrl().value) {
      return true;
    }
    return false;
  }
  done() {
    if (this.ok) {
      this.router.navigate(['login']);
    }
  }
}
