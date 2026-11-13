import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast',
  host: { role: 'status' },
  template: `
    @if (message()) {
      <p class="toast">{{ message() }}</p>
    }
  `,
  styles: `
    :host {
      position: fixed;
      left: var(--space-3);
      right: var(--space-3);
      bottom: var(--space-3);
      display: flex;
      justify-content: center;
      pointer-events: none;
    }

    .toast {
      margin: 0;
      padding: var(--space-2) var(--space-4);
      background: var(--color-toast-bg);
      color: var(--color-toast-text);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }
  `,
})
export class Toast {
  readonly message = input.required<string>();
}
