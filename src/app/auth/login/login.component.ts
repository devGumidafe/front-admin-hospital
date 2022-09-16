import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmit = false;

  public loginForm = this.formBuilder.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [localStorage.getItem('remember') || 'false']
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  login() {
    this.formSubmit = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value)
      .subscribe(
        (response: any) => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);
            localStorage.setItem('remember', 'true');
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
          }

          this.router.navigateByUrl('/');
        },
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        });
  }

  fieldHasError(field: string): boolean {
    if (this.loginForm.get(field)?.invalid && this.formSubmit) {
      return true;
    }
    return false;
  }
}

