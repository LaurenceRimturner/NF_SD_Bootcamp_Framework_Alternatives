import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <p class="border-4 border-dashed border-ink px-4 py-12 text-center text-xl font-black tracking-wide uppercase">
      No books found. Change the search or filter, or add a book.
    </p>
  `,
})
export class EmptyState {}
