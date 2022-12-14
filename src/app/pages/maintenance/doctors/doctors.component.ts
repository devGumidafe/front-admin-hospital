import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { User } from 'src/app/models/user.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public doctors: Doctor[] = [];
  public totalDoctors: number = 0;
  public loading: boolean = true;
  public currentUser: User;

  public imageSubs!: Subscription;

  constructor(private modalImageService: ModalImageService,
    private doctorService: DoctorService, private searchesService: SearchesService, private userService: UserService) {
    this.currentUser = this.userService.user;
    this.imageSubs = this.modalImageService.newImage.subscribe((img: any) => this.loadDoctors());
  }

  ngOnInit(): void {
    this.loadDoctors();
  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.getDoctors().subscribe(resp => {
      this.doctors = resp;
      this.totalDoctors = this.doctors.length;
      this.loading = false;
    });
  }

  search(term: string) {
    if (term.length === 0) {
      return this.loadDoctors();
    }

    this.searchesService.search('doctors', term)
      .subscribe((resp: Doctor[]) => {
        this.doctors = resp;
      });
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Está a punto de borrar a ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo'
    }).then((result: any) => {
      if (result.value) {
        this.doctorService.deleteDoctor(doctor)
          .subscribe(resp => {
            this.loadDoctors();
            Swal.fire(
              'Médico borrado',
              `${doctor.name} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }

  openModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor.id!, doctor.image);
  }

}
