import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ManageAccusationModalComponent } from '../manage-accusation-modal/manage-accusation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-accusation',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './list-accusation.component.html',
  styleUrl: './list-accusation.component.css',
})
export class ListAccusationComponent implements OnInit {
  accusations: any[] = [];
  isAccusationManaged = false;
  constructor(private api_service: ApiService, private dialog: MatDialog) {}
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
  manageAccusation() {
    const dialogRef = this.dialog.open(ManageAccusationModalComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('VITA :', result);
      }
    });
  }
  closeAccusationManagementModal() {
    this.isAccusationManaged = false;
  }
}
