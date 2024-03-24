import { MeService } from './../../services/me.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UserModalComponent } from '../user-modal/user-modal.component'; // Importe o componente do modal


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  dialogRef: MatDialogRef<UserModalComponent> | null = null;
  userData: any;

  constructor(private dialog: MatDialog, private apiService: MeService) {}

  ngOnInit(): void {
    this.apiService.getUserData().subscribe((userData: any) => {
      this.userData = userData;
    });
  }

  openUserModal() {
    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.close();
      this.dialogRef = null;
    } else {
      this.dialogRef = this.dialog.open(UserModalComponent, {
        width: '400px',
        disableClose: true,
        data: this.userData
      });

      this.dialogRef.afterClosed().subscribe(() => {
        console.log('O modal foi fechado');
        this.dialogRef = null;
      });
    }
  }
}
