import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {

  public formSubmit = false;

  public registerForm = this.formBuilder.group({
    name: ['test', [Validators.required, Validators.minLength(2)]],
    lastName: ['test', [Validators.required, Validators.minLength(2)]],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['123456', [Validators.required, Validators.minLength(6)]],
    terms: [true, [Validators.requiredTrue]]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser() {
    this.formSubmit = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value)
      .subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registro',
            text: 'Usuario creado correctamente',
            showCloseButton: true,
            confirmButtonText: 'Ok',
          }).then((result) => {
            this.router.navigateByUrl('/');
          })
        },
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
  }

  fieldHasError(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmit) {
      return true;
    }
    return false;
  }

  passwordValidator(): boolean {
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value
      && this.formSubmit) {
      return true;
    }
    return false;
  }
}
