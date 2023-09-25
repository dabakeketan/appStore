import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    const elSidebar: any = document.getElementById('sidebar');
    const elMain: any = document.getElementById('main');
    const action = elSidebar.classList.contains('active') ? 'removeClass' : 'addClass';
    this.renderer[action](elSidebar, 'active');
    this.renderer[action](elMain, 'isSidebar');
  }

  goToHome() {
    this.router.navigateByUrl('store/home');
  }
}
