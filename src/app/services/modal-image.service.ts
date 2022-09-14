import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hiddenModal: boolean = true;

  public type!: 'users' | 'doctors' | 'hospitals';
  public id!: number;
  public img!: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hiddenModal() {
    return this._hiddenModal;
  }

  openModal(type: 'users' | 'doctors' | 'hospitals', id: number, img: string = 'no-image') {
    this._hiddenModal = false;
    this.type = type;
    this.id = id;
    this.img = img;
  }

  closeModal() {
    this._hiddenModal = true;
  }

}
