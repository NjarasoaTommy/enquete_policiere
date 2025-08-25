import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-accusation',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-accusation.component.html',
  styleUrl: './add-accusation.component.css',
})
export class AddAccusationComponent implements OnInit {
  crimes: any = [];
  model = {
    nom: '',
    crime: '',
  };
  constructor(private api_service: ApiService) {}
  ngOnInit() {
    this.getAllCrimes();
  }
  getAllCrimes() {
    this.api_service.getAllCrimesService().subscribe((all_crimes: any[]) => {
      this.crimes = all_crimes;
    });
  }
  onSubmit(form: any) {
    console.log('Formulaire soumis : ', this.model);
  }
}
