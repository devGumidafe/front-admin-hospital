import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getHospitals() {
    return this.httpClient.get<Hospital[]>(`${base_url}/hospitals`);
  }

  createHospital(newName: string) {
    return this.httpClient.post(`${base_url}/hospitals`, newName);
  }

  updateHospital(formData: Hospital) {
    return this.httpClient.put(`${base_url}/hospitals/${formData.id}`, formData);
  }

  deleteHospital(hospital: Hospital) {
    return this.httpClient.delete(`${base_url}/hospitals/${hospital.id}`);
  }

  getHospitalByDoctor(doctorId: number) {
    return this.httpClient.get<Hospital>(`${base_url}/hospitals/doctor/${doctorId}`);
  }
}
