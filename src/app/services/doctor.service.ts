import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  getDoctors() {
    return this.httpClient.get<Doctor[]>(`${base_url}/doctors`);
  }

  createDoctor(doctor: Doctor) {
    return this.httpClient.post(`${base_url}/doctors`, doctor);
  }

  updateDoctor(doctor: Doctor) {
    return this.httpClient.put(`${base_url}/doctors/${doctor.id}`, doctor);
  }

  deleteDoctor(doctor: Doctor) {
    return this.httpClient.delete(`${base_url}/doctors/${doctor.id}`);
  }

}
