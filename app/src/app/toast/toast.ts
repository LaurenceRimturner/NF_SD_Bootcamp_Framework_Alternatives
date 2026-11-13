import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast',
  host: {
    role: 'status',
    class: 'pointer-events-none fixed inset-x-4 bottom-4 flex justify-center',
  },
  template: `
    @if (message()) {
      <p class="border-4 border-ink bg-accent px-5 py-3 font-black tracking-wide uppercase shadow-hard">
        {{ message() }}
      </p>
    }
  `,
})
export class Toast {
  readonly message = input.required<string>();
}
