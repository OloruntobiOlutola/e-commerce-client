import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@shop/users';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'shop-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users : User[] = [];

  constructor(
    private usersService : UsersService, 
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private router : Router){}
  
  ngOnInit(): void {
    this._getusers()
  }

  private _getusers() {
    this.usersService.getUsers().subscribe((users: User[])  => {
      this.users = users;
    })
  }

  deleteUser(userId : string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this User',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(() =>{
          () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User cannot be deleted' });
        });
        
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted Successfully' });
          this._getusers();
        }
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
            }
          }
      }); 
  }

  updateUser(userId : string) {
   this.router.navigateByUrl(`users/form/${userId}`)
  }
}
