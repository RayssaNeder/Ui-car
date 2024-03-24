import { MeService } from './../../services/me.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, Input, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent implements OnInit {
  userData: any;

  constructor(private apiService: MeService) { }

  ngOnInit(): void {
    this.apiService.getUserData().subscribe((data: any) => {
      this.userData = data;
    });
  }
}
