import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-toolbar',
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './contact-toolbar.html',
  styleUrl: './contact-toolbar.css'
})
export class ContactToolbar implements OnInit {
  userName: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
    
  }

  ngOnInit() {
    this.userName = this.auth.getUsername();
  }

  logOut() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
