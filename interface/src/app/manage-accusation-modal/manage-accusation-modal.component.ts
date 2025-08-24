import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-accusation-modal',
  imports: [],
  templateUrl: './manage-accusation-modal.component.html',
  styleUrl: './manage-accusation-modal.component.css',
})
export class ManageAccusationModalComponent {
  constructor(public dialogRef: MatDialogRef<ManageAccusationModalComponent>) {}
  close() {
    this.dialogRef.close();
  }
}
