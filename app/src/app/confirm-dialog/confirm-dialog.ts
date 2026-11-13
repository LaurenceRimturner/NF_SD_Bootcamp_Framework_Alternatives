import { Component, input, output } from '@angular/core';
import { Modal } from '../modal';

@Component({
  selector: 'app-confirm-dialog',
  imports: [Modal],
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {
  readonly title = input.required<string>();
  readonly confirm = output<void>();
  readonly cancel = output<void>();
}
