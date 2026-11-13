import type { Routes } from '@angular/router';
import { BookDetailPage } from './book-detail-page/book-detail-page';
import { BookListPage } from './book-list-page/book-list-page';

export const routes: Routes = [
  { path: '', component: BookListPage, title: 'Reading List' },
  { path: 'books/:id', component: BookDetailPage, title: 'Book details · Reading List' },
  { path: '**', redirectTo: '' },
];
