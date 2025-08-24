import { Component } from '@angular/core';
import { ListAccusationComponent } from './list-accusation/list-accusation.component';

@Component({
  selector: 'app-root',
  imports: [ListAccusationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Enquête';
}
