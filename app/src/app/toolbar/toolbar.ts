import { Component, input, output } from '@angular/core';
import { STATUS_LABELS, STATUSES } from '../../core/books';
import type { StatusFilter } from '../../core/types';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.html',
})
export class Toolbar {
  readonly query = input.required<string>();
  readonly status = input.required<StatusFilter>();
  readonly queryChange = output<string>();
  readonly statusChange = output<StatusFilter>();

  protected readonly filters: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    ...STATUSES.map((value) => ({ value, label: STATUS_LABELS[value] })),
  ];

  protected onQuery(event: Event): void {
    this.queryChange.emit((event.target as HTMLInputElement).value);
  }
}
