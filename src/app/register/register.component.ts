import { Component, OnInit } from '@angular/core';
import { User } from "../shared/User";
import { UserService } from "../service/user.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TokenStorageService } from "../service/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.formBuilder.group(
    {
      username: [''],
      email: [''],
      password: [''],
      verifiedPassword: ['']
    }
  );

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenStorageService:TokenStorageService
  ) { }

  ngOnInit(): void {
    if (!!this.tokenStorageService.getToken()) {
      this.router.navigate(['dashboard']);
    }
  }

  sauvegarder(){
    let user = new User();
    user.username = this.getUsernameCtrl().value;
    user.email = this.getEmailCtrl().value;
    user.password = this.getPasswordCtrl().value;
    this.userService.addUser(user).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  getUsernameCtrl(){
    return this.registerForm.get('username');
  }
  getEmailCtrl(){
    return this.registerForm.get('email');
  }
  getPasswordCtrl(){
    return this.registerForm.get('password');
  }
  getVerifiedPasswordCtrl(){
    return this.registerForm.get('verifiedPassword');
  }
}
