import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fancy-button',
  templateUrl: './fancy-button.component.html',
  styleUrls: ['./fancy-button.component.scss'],
})
export class FancyButtonComponent implements OnInit {
  @Input() value: string = 'Button';

  constructor() {}

  ngOnInit(): void {}
}
