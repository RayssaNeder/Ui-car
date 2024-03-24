import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<any>();

  success(message: string) {
    this.subject.next({ type: 'success', text: message });
  }

  getMessage() {
    return this.subject.asObservable();
  }
}
