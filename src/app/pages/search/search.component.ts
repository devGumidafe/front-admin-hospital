import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchesService } from '../../services/searches.service';
import { User } from '../../models/user.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute, private searches: SearchesService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ value }) => {
      this.onGlobalSearch(value);
    });
  }

  onGlobalSearch(term: string) {
    this.searches.globalSearch(term).subscribe((resp: any) => {
      this.users = resp.users;
      this.doctors = resp.doctors;
      this.hospitals = resp.hospitals;
    });
  }

  openDoctor(doctor: Doctor) {
    this.router.navigateByUrl(`/dashboard/medicos/${doctor.id}`);
  }

}
