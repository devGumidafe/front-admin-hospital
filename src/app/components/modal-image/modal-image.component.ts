import { Component, OnInit } from '@angular/core';
import { ImageURL } from 'src/app/interfaces/image-url.interface';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import { FileUploadService } from './../../services/file-upload.service';
import { ModalImageService } from './../../services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  public selectedImage!: File;
  public user!: User;
  public imageTemp: any;

  constructor(public modalImageService: ModalImageService, private fileUploadService: FileUploadService, private userService: UserService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalImageService.closeModal();
    this.imageTemp = null;
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
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    if (this.selectedImage) {
      this.fileUploadService.uploadCloudImage(this.selectedImage!)
        .subscribe((response: any) => {
          const { secure_url } = response;
          const imageURL: ImageURL = { url: secure_url };

          this.fileUploadService.uploadUrl(imageURL, type, id)
            .subscribe((response: any) => {
              if (type === 'users') {
                this.userService.user.image = response.user.image;
                localStorage.setItem('user', JSON.stringify(this.userService.user));
              }

              this.modalImageService.newImage.emit(response);
              Swal.fire('Imagen actualizada', '', 'success');
              this.closeModal();
            });
        }, (err: any) => {
          Swal.fire('Error', err.error.message, 'error');
        });
    }
  }
}
