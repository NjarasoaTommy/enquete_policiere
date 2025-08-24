import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-crime',
  imports: [CommonModule],
  templateUrl: './list-crime.component.html',
  styleUrl: './list-crime.component.css',
})
export class ListCrimeComponent implements OnInit {
  crimes: any[] = [];
  constructor(private api_service: ApiService) {}
  ngOnInit(): void {
    this.getAllCrimes();
  }
  getAllCrimes() {
    this.api_service.getAllCrimesService().subscribe((all_crimes: any[]) => {
      this.crimes = all_crimes;
    });
  }
}
