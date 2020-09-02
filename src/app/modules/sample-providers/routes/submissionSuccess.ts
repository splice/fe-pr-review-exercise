import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'submission-success',
  templateUrl: './submissionSuccess.html',
  styleUrls: ['./submissionSuccess.scss'],
})
export class SubmissionSuccessComponent {
  constructor(public router: Router) {}

  navigate() {
    this.router.navigate(['./']);
  }
}
