import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit, AfterViewInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public doctorSelected!: Doctor;
  public hospitalSelected?: Hospital;

  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalService, private doctorService: DoctorService, private userService: UserService,
    private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.loadHospitals();

    this.doctorForm.get('hospital')?.valueChanges.subscribe(hospitalId => {
      this.hospitals.find(hospital => hospital.id === hospitalId);
      this.hospitalSelected = this.hospitals.find(hospital => hospital.id === Number(hospitalId));
    });
  }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id !== 'new') {
        this.getHospitalByDoctor(id);
        this.getDoctorById(id);
      }
    });
  }

  loadHospitals() {
    this.hospitalService.getHospitals().subscribe(resp => {
      this.hospitals = resp;
    });
  }

  getDoctorById(id: any) {
    this.doctorService.getDoctorById(id)
      .pipe(
        delay(100)
      )
      .subscribe((resp: Doctor): Doctor | any => {
        if (!resp) {
          return this.router.navigateByUrl(`/dashboard/doctors`);
        }
        this.doctorSelected = resp;

        this.doctorForm.setValue({
          name: this.doctorSelected.name,
          hospital: this.hospitalSelected?.id
        });
      });
  }

  getHospitalByDoctor(doctorId: number) {
    this.hospitalService.getHospitalByDoctor(doctorId).subscribe(resp => {
      this.hospitalSelected = resp;
    });
  }

  saveDoctor() {
    if (this.doctorSelected) {
      this.updateDoctor();
    } else {
      this.newDoctor();
    }
  }

  newDoctor() {
    const newDoctor = new Doctor();
    newDoctor.name = this.doctorForm.get('name')?.value;
    newDoctor.hospital = this.hospitalSelected;
    newDoctor.user = {
      id: this.userService.user.id,
      name: this.userService.user.name,
      image: this.userService.user.image,
    }

    this.doctorService.createDoctor(newDoctor).subscribe((resp: any) => {
      Swal.fire('Médico ', `${newDoctor.name} creado con éxito`, 'success');
      this.router.navigateByUrl(`/dashboard/doctors/${resp.doctor.id}`);
    });
  }

  updateDoctor() {
    this.doctorSelected.name = this.doctorForm.get('name')?.value;
    this.doctorSelected.hospital = this.hospitalSelected;
    this.doctorService.updateDoctor(this.doctorSelected).subscribe(resp => {
      Swal.fire('Médico', `${this.doctorSelected.name} actualizado con éxito`, 'success');
    });
  }
}
