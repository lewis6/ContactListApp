import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit() {
    if (this.username.trim()) {
      this.auth.login(this.username);
      this.router.navigate(['/contacts']);
    }
  }
}
