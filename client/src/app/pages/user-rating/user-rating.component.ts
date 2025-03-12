import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserRatingComponent implements OnInit {
  @Input() movieId!: number;  // We assume movieId will always be provided
  reviewForm: FormGroup;
  reviews: Review[] = [];

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      reviewer: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['']
    });
  }

  ngOnInit(): void {
    if (this.movieId) {
      this.loadReviews();
    }
  }

  loadReviews(): void {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      const reviewsObj: { [key: number]: Review[] } = JSON.parse(storedReviews);
      this.reviews = reviewsObj[this.movieId] || [];
    } else {
      this.reviews = [];
    }
  }

  saveReviews(): void {
    const storedReviews = localStorage.getItem('reviews');
    let reviewsObj: { [key: number]: Review[] } = {};
    if (storedReviews) {
      reviewsObj = JSON.parse(storedReviews);
    }
    reviewsObj[this.movieId] = this.reviews;
    localStorage.setItem('reviews', JSON.stringify(reviewsObj));
  }

  public onSubmit(): void {
    if (this.reviewForm.valid && this.movieId !== undefined && this.movieId !== null) {
      const newReview: Review = this.reviewForm.value;
      this.reviews.push(newReview);
      this.saveReviews();
      this.reviewForm.reset();
    }
  }
}
