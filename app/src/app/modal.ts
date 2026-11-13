import { afterNextRender, DestroyRef, Directive, ElementRef, inject, output } from '@angular/core';

/**
 * Opens a `<dialog>` as a modal when it is rendered, reports Escape as
 * `dismissed` and returns the focus to the element that had it before.
 */
@Directive({
  selector: 'dialog[appModal]',
  host: { '(cancel)': 'dismissed.emit()' },
})
export class Modal {
  readonly dismissed = output<void>();

  constructor() {
    const dialog = inject<ElementRef<HTMLDialogElement>>(ElementRef).nativeElement;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    afterNextRender(() => dialog.showModal());
    inject(DestroyRef).onDestroy(() => {
      dialog.close();
      opener?.focus();
    });
  }
}
