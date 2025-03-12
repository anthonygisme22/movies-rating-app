import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class UserRatingComponent implements OnInit {
  reviewForm: FormGroup;
  reviews: Review[] = [];

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      reviewer: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['']
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const newReview: Review = this.reviewForm.value;
      this.reviews.push(newReview);
      this.reviewForm.reset();
    }
  }
}
