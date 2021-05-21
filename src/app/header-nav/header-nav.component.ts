import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  public username: any = sessionStorage.getItem('username');
  public role: any = sessionStorage.getItem('role');
  public href: any = '';

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.href);
  }

  signOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  showHideSideNav() {
    $('body').toggleClass('w3-sidebar');
    if ($('body').hasClass('w3-sidebar')) {
      $('w3-sidebar').css('display', 'none !important');
      $('w3-main').css('margin-left', '0 !important');
    } else {
      $('w3-sidebar').css('display', 'block !important');
      $('w3-main').css('margin-left', '250px !important');
    }
  }

}
