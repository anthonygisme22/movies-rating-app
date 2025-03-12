import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from './shared/footer/footer.component';
import {
  trigger,
  transition,
  style,
  animate,
  query
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Set the starting style for the entering and leaving elements.
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            opacity: 0
          })
        ], { optional: true }),
        // Animate the entering element to full opacity.
        query(':enter', [
          animate('600ms ease', style({ opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {
  title = 'My Movies App';

  // This function can be used to set a route-specific animation state (if needed)
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
