import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  private loggedInDataSource = new Subject<any>();
  loggedInDataChangeEmitted$ = this.loggedInDataSource.asObservable();


  private getChangeEvent: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  getChangeEventEmitted$: Observable<any> = this.getChangeEvent.asObservable();

  // request and response call emitter
  private loaderData = new Subject<any>();
  loaderDataChangeEmitted$ = this.loaderData.asObservable();
  // Service message
  emitChange(myMessage: any) {
      this.emitChangeSource.next(myMessage);
  }

  // Service message
  loggedInDataemitChange(myMessage: any) {
      this.loggedInDataSource.next(myMessage);
  }

  // changeEvent
  getChangeEventEmitChange(myMessage: any) {
      this.getChangeEvent.next(myMessage);
  }

  // request and response call emitter
  loaderDataEmitChange(myMessage: any) {
      this.loaderData.next(myMessage);
  }
}
