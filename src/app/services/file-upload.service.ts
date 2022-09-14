import { ImageURL } from './../interfaces/image-url.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private cloudName = 'gumi-cloud';
  private cloudUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

  constructor(private httpClient: HttpClient) {
  }

  uploadUrl(imageURL: ImageURL, type: 'users' | 'doctors' | 'hospitals', id: number) {
    return this.httpClient.put(`${base_url}/${type}/${id}/image`, imageURL);
  }

  uploadCloudImage(image: File) {
    const formData = new FormData();
    formData.append('upload_preset', 'angular');
    formData.append('file', image);

    return this.httpClient.post(this.cloudUrl, formData)
  }

}
