import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-accusation',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-accusation.component.html',
  styleUrl: './list-accusation.component.css',
})
export class ListAccusationComponent implements OnInit {
  accusations: any[] = [];
  isAccusationManaged = false;
  constructor(private api_service: ApiService) {}
  ngOnInit() {
    this.getAllAccusations();
  }
  getAllAccusations() {
    this.api_service
      .getAllAccusationsService()
      .subscribe((all_accusations: any[]) => {
        this.accusations = all_accusations;
      });
  }

  closeAccusationManagementModal() {
    this.isAccusationManaged = false;
  }
}
