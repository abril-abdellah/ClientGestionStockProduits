import { Component, OnInit } from '@angular/core';
import { UserService } from "../service/user.service";
import { User } from "../shared/User";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users;
  modifierForm: FormGroup;
  selectedUser = new User();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.createModifierForm();
  }


  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      data => this.users = data,
      error => console.log(error)
    );
  }
  createModifierForm() {
    this.modifierForm = this.formBuilder.group(
      {
        username: [{value: '', disabled: true}],
        email: [''],
        status: [''],
        role: ['']
      }
    );
  }
  //Manipuler l'utilisateur selectionné
  modifierBtn(user) {
    this.modifierForm.reset();
    this.selectedUser = user;
    this.modifierForm.get('username').setValue(user.username);
    this.modifierForm.get('email').setValue(user.email);
    if (user.active) {
      this.modifierForm.get('status').setValue('active');
    }
    else
      this.modifierForm.get('status').setValue('inactive');
    if (user.roles.includes('admin')) {
      this.modifierForm.get('role').setValue('admin');
    }
    else
      this.modifierForm.get('role').setValue('user');
  }
  supprimerBtn(user){
    this.selectedUser = user;
  }
  //Envoyer des Requests Http
  modiferUser() {
    let user = new User();
    user.username = this.selectedUser.username;
    user.email = this.selectedUser.email;
    if (this.modifierForm.get('status').value == 'active')
      user.active = true;
    else user.active = false;
    if (this.modifierForm.get('role').value == 'admin')
      user.roles = ['admin', 'user'];
    this.userService.updateUser(user).subscribe(
      data => {
        console.log(data);
        this.getAllUsers();
      },
      error => console.log(error)
    );
    this.modifierForm.reset();
  }

  supprimerUser() {
    this.userService.deleteUser(this.selectedUser.id).subscribe(
      data => {
        console.log(data);
        this.getAllUsers();
      },
      error => console.log(error)
    );
  }
  getCurrentUserRole(user) {
    if (user.roles.includes('admin'))
      return 'Administrateur';
    else return 'Utilisateur';
  }

}
