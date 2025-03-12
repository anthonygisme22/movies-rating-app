import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

export interface TrailerDialogData {
  trailerUrl: string;
}

@Component({
  selector: 'app-trailer-dialog',
  templateUrl: './trailer-dialog.component.html',
  styleUrls: ['./trailer-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, SafeUrlPipe]
})
export class TrailerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: TrailerDialogData) { }
}
