import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <p class="empty">No books match your search. Try another title or filter, or add a new book.</p>
  `,
  styles: `
    .empty {
      margin: var(--space-5) 0;
      padding: var(--space-5) var(--space-3);
      text-align: center;
      color: var(--color-muted);
      border: 1px dashed var(--color-border);
      border-radius: var(--radius);
    }
  `,
})
export class EmptyState {}
