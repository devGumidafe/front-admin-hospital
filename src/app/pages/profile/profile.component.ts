import Swal from 'sweetalert2';
import { FileUploadService } from './../../services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageURL } from 'src/app/interfaces/image-url.interface';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public selectedImage!: File;
  public user!: User;
  public imageTemp: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(3)]],
      lastName: [this.user.lastName, [Validators.required, Validators.minLength(3)]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateUser() {
    this.userService.updateUser(this.profileForm.value)
      .subscribe((response: any) => {

        const { name, lastName, email } = response.user;
        this.userService.user.name = name;
        this.userService.user.lastName = lastName;
        this.userService.user.email = email;

        localStorage.setItem('user', JSON.stringify(this.userService.user));

        Swal.fire('User updated', `${name} ${lastName}`, 'success');
      }, (err: any) => {
        Swal.fire('Error', err.error.message, 'error');
      });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.imagePreview();
  }

  imagePreview() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);

      reader.onloadend = () => {
        this.imageTemp = reader.result;
      }
    } else {
      this.imageTemp = null;
    }
  }

  onUploadImage() {
    if (this.selectedImage) {
      this.fileUploadService.uploadCloudImage(this.selectedImage!)
        .subscribe((response: any) => {
          const { secure_url } = response;
          const imageURL: ImageURL = { url: secure_url };

          this.fileUploadService.uploadUrl(imageURL, 'users', this.userService.user.id!)
            .subscribe((response: any) => {
              this.userService.user.image = response.user.image;
              localStorage.setItem('user', JSON.stringify(this.userService.user));

              Swal.fire('Image uploaded', '', 'success');
            });
        }, (err: any) => {
          Swal.fire('Error', err.error.message, 'error');
        });
    }
  }
}
