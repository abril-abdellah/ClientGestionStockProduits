import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { AuthService } from "../service/auth.service";
import { TokenStorageService } from "../service/token-storage.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };
  loginForm = this.formBuilder.group(
    {
      username: [''],
      password: ['']
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!!this.tokenStorageService.getToken()) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit() {
    this.credentials.username = this.loginForm.get('username').value;
    this.credentials.password = this.loginForm.get('password').value;
    this.authService.login(this.credentials).subscribe(
      (data: any) => {
        console.log(data);
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);
        window.location.reload();
      },
      error => console.log(error)
    );
  }
}
