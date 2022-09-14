import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

import { HospitalService } from './../../../services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public totalHospitals: number = 0;
  public loading: boolean = true;

  public imageSubs!: Subscription;

  constructor(private hospitalService: HospitalService, private modalImageService: ModalImageService,
    private searchesService: SearchesService) {

    this.imageSubs = this.modalImageService.newImage.subscribe((img: any) => this.loadHospitals());
  }

  ngOnInit(): void {
    this.loadHospitals();
  }

  ngOnDestroy() {
    this.imageSubs.unsubscribe();
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.getHospitals().subscribe(resp => {
      this.hospitals = resp;
      this.totalHospitals = this.hospitals.length;
      this.loading = false;
    });
  }

  search(term: string) {
    if (term.length === 0) {
      return this.loadHospitals();
    }

    this.searchesService.search('hospitals', term)
      .subscribe((resp: Hospital[]) => {
        this.hospitals = resp;
      });
  }

  async createHospital() {
    const { value: nameHospital } = await Swal.fire<string>({
      input: 'text',
      title: 'Crear nuevo hospital',
      inputPlaceholder: 'Introduzca el nombre del hospital',
      showCancelButton: true,
    });

    if (nameHospital) {
      this.hospitalService.createHospital(nameHospital).subscribe(resp => {
        this.loadHospitals();
        Swal.fire('Hospital creado', nameHospital, 'success');
      });
    }
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital).subscribe(resp => {
      Swal.fire('Hospital actualizado', hospital.name, 'success');
    });
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Borrar Hospital?',
      text: `Está a punto de borrar a ${hospital.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo'
    }).then((result: any) => {
      if (result.value) {
        this.hospitalService.deleteHospital(hospital)
          .subscribe(resp => {
            this.loadHospitals();
            Swal.fire(
              'Hospital borrado',
              `${hospital.name} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital.id!, hospital.image);
  }
}
