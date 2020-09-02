import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent implements OnInit {
  showSuccess = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public submitForm(data): void {
    this.showSuccess = true;
    this.router.navigate(['success']);
  }
}
