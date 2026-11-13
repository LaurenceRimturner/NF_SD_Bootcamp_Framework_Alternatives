import { Component, ElementRef, afterNextRender, input, viewChild } from '@angular/core';

/** Page header with the heading, an optional line below it and a slot for actions. */
@Component({
  selector: 'app-header',
  template: `
    <header class="border-b-8 border-ink bg-accent">
      <div class="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 p-4 sm:p-6">
        <div class="min-w-0">
          <h1
            #heading
            tabindex="-1"
            class="text-4xl leading-none font-black tracking-tighter wrap-break-word uppercase focus:outline-none sm:text-6xl"
          >
            {{ heading_() }}
          </h1>
          @if (subtitle()) {
            <p class="mt-2 text-sm font-black tracking-wide uppercase">{{ subtitle() }}</p>
          }
        </div>
        <ng-content />
      </div>
    </header>
  `,
})
export class AppHeader {
  readonly heading_ = input.required<string>({ alias: 'heading' });
  readonly subtitle = input('');
  private readonly headingElement = viewChild.required<ElementRef<HTMLElement>>('heading');

  constructor() {
    // After a page change the focus moves to the new page heading.
    afterNextRender(() => this.headingElement().nativeElement.focus());
  }
}
