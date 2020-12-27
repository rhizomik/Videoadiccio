import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  isTitle: boolean;

  @Input()
  message: string;

  @Input()
  user: string;

  @Input()
  game: string;

  constructor() { }

  ngOnInit(): void {
  }

}
