import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(this.form.get('username')?.value!, this.form.get('password')?.value!)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/students'])
      })
  }

  ngOnInit(): void {
  }

}
