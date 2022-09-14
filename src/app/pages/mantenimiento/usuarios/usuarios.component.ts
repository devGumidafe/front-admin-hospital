import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { SearchesService } from './../../../services/searches.service';
import { UserService } from 'src/app/services/user.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public loading: boolean = true;
  public currentUser: User;

  public imageSubs!: Subscription;

  constructor(private userService: UserService, private searchesService: SearchesService, private modalImageService: ModalImageService) {
    this.currentUser = this.userService.user;

    this.imageSubs = this.modalImageService.newImage.subscribe((img: any) => this.loadUsers());
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.imageSubs.unsubscribe();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers()
      .subscribe((resp: User[]) => {
        this.totalUsers = resp.length;
        this.users = resp;
        this.loading = false;
      });
  }

  search(term: string) {
    if (term.length === 0) {
      return this.loadUsers();
    }

    this.searchesService.search('users', term)
      .subscribe((resp: User[]) => {
        this.users = resp;
      });
  }

  changeRole(user: User) {
    this.userService.changeRole(user)
      .subscribe((resp: any) => {
        user.role = resp.user.role;
        Swal.fire('Usuario actualizado', user.name, 'success');
      });
  }

  deleteUser(user: User) {
    if (user.id === this.currentUser.id) {
      Swal.fire('Error', 'No puedes borrarte a ti mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo'
    }).then((result: any) => {
      if (result.value) {
        this.userService.deleteUser(user)
          .subscribe(resp => {
            this.loadUsers();
            Swal.fire(
              'Usuario borrado',
              `${user.name} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }

  openModal(user: User) {
    this.modalImageService.openModal('users', user.id!, user.image);
  }
}
