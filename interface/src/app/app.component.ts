import { Component } from '@angular/core';
import { ListCrimeComponent } from './list-crime/list-crime.component';

@Component({
  selector: 'app-root',
  imports: [ListCrimeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Enquête';
}
