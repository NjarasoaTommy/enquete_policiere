import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-proof',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-proof.component.html',
  styleUrl: './add-proof.component.css',
})
export class AddProofComponent implements OnInit {
  constructor(private api_service: ApiService, private route: ActivatedRoute) {}
  facts: any[] = [];
  remain_proofs: any[] = [];
  all_proofs: string[] = [
    'has_motive',
    'was_near_crime_scene',
    'has_fingerprint_on_weapon',
    'has_bank_transaction',
    'owns_fake_identity',
    'eyewitness_identification',
  ];
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
        this.updateRemainProofs();
      });
  }
  updateRemainProofs() {
    this.remain_proofs = this.all_proofs.filter(
      (proof) => !this.facts.includes(proof)
    );
  }
}
