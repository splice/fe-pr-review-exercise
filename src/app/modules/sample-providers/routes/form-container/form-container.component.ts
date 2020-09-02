import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent implements OnInit {
  showSuccess = false;
  constructor() {}

  ngOnInit(): void {}

  public submitForm(data): void {
    console.log('form data', data);
    this.showSuccess = true;
  }
}
