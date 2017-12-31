import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObsSubscription: Subscription;
  customObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
     const ObNumber = Observable.interval(1000)
     .map((data: number) => {
       return data * 2;
     });
     this.numberObsSubscription = ObNumber.subscribe(
       (number: number)=>{
         console.log(number);
       }
     );

    const myObs = Observable.create((observer: Observer<string>)=> {
      setTimeout(()=> {
        observer.next('first package');
      }, 2000);
      setTimeout(()=> {
        observer.next('second package');
      }, 4000);
      // setTimeout(()=> {
      //   observer.error('error !!!');
      // }, 5000);
      setTimeout(()=> {
        observer.complete();
      }, 4000);
      setTimeout(()=> {
        observer.next('third package');
      }, 4000);
    });
    this.customObsSubscription = myObs.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('completed !!');
      }
    );
  }

  ngOnDestroy(){
    this.numberObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }

}