import { Component } from '@angular/core';
import { faCircle,faSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProEventos-App';
  faCircle=faCircle;
  faSquare=faSquare;
}
