import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public hospitalSelected?: Hospital;

  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalService) {
  }

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      name: ['Dr. Gumi', Validators.required],
      hospital: ['', Validators.required],
    });

    this.loadHospitals();

    this.doctorForm.get('hospital')?.valueChanges.subscribe(hospitalId => {
      this.hospitals.find(hospital => hospital.id === hospitalId);
      this.hospitalSelected = this.hospitals.find(hospital => hospital.id === Number(hospitalId));
    });
  }

  loadHospitals() {
    this.hospitalService.getHospitals().subscribe(resp => {
      this.hospitals = resp;

    });
  }

  saveDoctor() {
    console.log(this.doctorForm.value);
  }

}
