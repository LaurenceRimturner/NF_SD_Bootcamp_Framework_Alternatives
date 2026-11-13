import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookStore } from './book-store';
import { Toast } from './toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
})
export class App {
  protected readonly store = inject(BookStore);
}
