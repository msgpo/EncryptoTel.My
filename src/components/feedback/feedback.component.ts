import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BugsServices} from '../../services/bugs.services';
import {FadeAnimation} from '../../shared/functions';

@Component({
  selector: 'feedback-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')]
})

export class FeedbackComponent {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _service: BugsServices) {

  }

  feedback: FormGroup = new FormGroup({
    'summary': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    'description': new FormControl(null, [Validators.required, Validators.minLength(10)])
  });
  loading = false;

  create() {
    this.feedback.controls.summary.markAsTouched();
    this.feedback.controls.description.markAsTouched();
    if (this.feedback.valid) {
      this.loading = true;
      const feedback = {
        summary: this.feedback.value.summary,
        description: this.feedback.value.description,
        kind: 2
      };
      this._service.create(feedback).then(() => {
        this.loading = false;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute})
      }).catch(err => {
        console.error(err);
      })
    }
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }
}
