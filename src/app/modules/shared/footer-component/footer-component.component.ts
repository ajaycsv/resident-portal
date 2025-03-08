import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.scss']
})
export class FooterComponentComponent implements OnInit {
  windowheight: any;
  footerheight: any;
  @Input() bodyHeight
  constructor() { }

  ngOnInit() {
    this.windowheight = window.innerHeight;
    this.footerheight = document.getElementById('footerHeight').clientHeight
  }

}
