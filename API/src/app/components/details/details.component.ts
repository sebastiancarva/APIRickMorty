import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router  } from '@angular/router';
import { DetailservicesService } from 'src/app/services/detailservices.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  character: any;

  constructor(private http:DetailservicesService,private route: ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    const characterIdString  = this.route.snapshot.paramMap.get('id');
    console.log(characterIdString);

    if (characterIdString) {
      const characterId = +characterIdString;
      this.http.getCharacterDetails(characterId).subscribe((data: any) => {
        this.character = data;
      });
    }
  }
  regrets(){
    this.router.navigate([''])
  }
}
