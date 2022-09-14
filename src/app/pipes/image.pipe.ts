import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: any, type: 'users' | 'doctors' | 'hospitals'): string {
    return img ? img : '../assets/images/no-image.jpg';
  }

}
