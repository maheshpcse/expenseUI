import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  pageType: any = null;
  public role: any = sessionStorage.getItem('role');
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.pageType = this.route.snapshot.routeConfig.path;
    console.log('current page type issss ==>', this.pageType); 
  }

}
