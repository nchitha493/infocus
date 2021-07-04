import { Injectable } from '@angular/core';
import { Toast } from './toaster/toast.interface';
import { ToastType } from './toaster/toast.type';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  subject: any;
  toast$: any;

  constructor() {
    this.subject = new BehaviorSubject(null);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));
  }

  show(type: ToastType, title?: any, body?: any, delay?: any) {
    this.subject.next({ type, title, body, delay });
  }
}