import { Component } from '@angular/core';
import { SideNavService } from 'src/app/shared/services/side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private sideNavService: SideNavService) {
  }

  clickMenu() {
    this.sideNavService.toggle()
  }

}
