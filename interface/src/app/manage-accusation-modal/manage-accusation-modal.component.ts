import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-accusation-modal',
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-accusation-modal.component.html',
  styleUrl: './manage-accusation-modal.component.css',
})
export class ManageAccusationModalComponent implements OnInit {
  constructor(private api_service: ApiService, private route: ActivatedRoute) {}
  facts: any[] = [];
  resultat = '';
  nom = '';
  crime = '';
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.getAllFacts(params.nom, params.crime);
      this.nom = params.nom;
      this.crime = params.crime;
    });
  }
  getAllFacts(nom: string, crime: string) {
    this.api_service
      .getAllFactsService(nom, crime)
      .subscribe((all_facts: any) => {
        this.facts = all_facts.facts;
      });
    this.api_service.getResultService(nom, crime).subscribe((res: any) => {
      this.resultat = res.result;
    });
  }
}
