import { Component, OnInit } from '@angular/core';
import { UserService } from "../service/user.service";
import { User } from "../shared/User";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TokenStorageService } from "../service/token-storage.service";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  //onlyOneUser: boolean = false;
  users;
  modifierForm: FormGroup;
  selectedUser = new User();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService
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
        username: [{ value: '', disabled: true }],
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
  supprimerBtn(user) {
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
        this.getAllUsers();
      },
      error => console.log(error)
    );
    this.modifierForm.reset();
  }

  supprimerUser() {
    this.userService.deleteUser(this.selectedUser.id).subscribe(
      data => {
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

  //La gestion de cas d'un admin || active admin
  enableSupprimer(user): boolean {
    if (this.onlyOneAdmin() && user.roles.includes('admin')) {
      return true;
    }
    else if (this.onlyOneAciveAdmin() && user.active && user.roles.includes('admin')) {
      return true;
    }
    return false;
  }
  onlyOneAdmin(): boolean {
    if (this.getAdmins().length == 1) {
      return true;
    }
    return false;
  }
  onlyOneAciveAdmin(): boolean {
    let nbrActives: number = 0;
    this.getAdmins().forEach(element => {
      if (element.active) {
        nbrActives++;
      }
    });
    if (nbrActives == 1) {
      return true;
    }
    return false;
  }
  getAdmins(): any[] {
    let admins: any[] = [];
    this.users.forEach(element => {
      if (element.roles.includes('admin')) {
        admins.push(element);
      }
    });
    return admins;
  }
  //////////////////////////////////////////////
}
