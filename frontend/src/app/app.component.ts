import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(public authService: AuthService) { }

}

// ngOnInit check for jwt token in localstorage if it is not expired if there is token -> login user