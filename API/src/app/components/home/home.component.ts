import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DetailservicesService } from 'src/app/services/detailservices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent   {
  person:any[] = [];
  id:string;

  constructor(private service:DetailservicesService,
    private route: ActivatedRoute
    ){
    this.service.getAllPerson()
    .subscribe((data: any) => {
      this.person = data.results;
    });
  }
}
