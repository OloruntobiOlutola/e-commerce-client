import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@shop/users';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as CountryList from 'i18n-iso-countries'

declare const require: any;

@Component({
  selector: 'shop-users',
templateUrl: './users.component.html',
styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  form!: FormGroup;
  isSubmitted  = false;
  editMode = false;
  currentUserId  = "";
  countries!: any[];

  constructor (
    private formBuilder : FormBuilder,
    private usersService : UsersService,
    private messageService: MessageService,
    private location : Location,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', !this.editMode ? Validators.required : null],
      street : [''],
      apartment : [''],
      city : [''],
      zip : [''],
      country : [''],
      phone : ['', Validators.required],
      isAdmin : [false],
    });

    this._checkEditMode();
    this._getCountries();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const user : User = {
      name: this.userForm['name'].value,
      email : this.userForm['email'].value,
      password : this.userForm['password'].value,
      street : this.userForm['street'].value,
      apartment : this.userForm['apartment'].value,
      city : this.userForm['city'].value,
      zip : this.userForm['zip'].value,
      country : this.userForm['country'].value,
      phone : this.userForm['phone'].value,
      isAdmin : this.userForm['isAdmin'].value,
      id: this.currentUserId,
    };
    if(this.editMode) {
      this._updateuser(this.currentUserId, user)
    } else {
      this._adduser(user);
    }
  }

   onCancel(){
    this.location.back();
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentUserId = params['id'];
        this.usersService.getUser(params['id']).subscribe(users => {
          this.userForm['name'].setValue(users.name);
          this.userForm['email'].setValue(users.email);
          this.userForm['password'].setValue(users.password);
          this.userForm['zip'].setValue(users.zip);
          this.userForm['phone'].setValue(users.phone);
          this.userForm['apartment'].setValue(users.apartment);
          this.userForm['country'].setValue(users.country);
          this.userForm['street'].setValue(users.street);
          this.userForm['isAdmin'].setValue(users.isAdmin);
          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        })
      }
    })
  }

  private _adduser(user : User){
    this.usersService.createUser(user).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is created Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not created' });
    });
  }

  private _updateuser(userId: string, user : User){
    this.usersService.updateUser(userId, user).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is updated Successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not updated' });
    });
  }

  get userForm() {
    return this.form.controls;
  }

  private _getCountries() {
    CountryList.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(CountryList.getNames("en", {select: "official"})).map(country => {
      return {
        id : country[0],
        name : country[1]
      }
    });
  }
}
