import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  user1Activated = false;
  user2Activated = false;
  userActivationSubscription: Subscription;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userActivationSubscription = this.userService.userActivated.subscribe((data: number)=> {
      if(data === 1){
        this.user1Activated = true;
      }else if(data === 2){
        this.user2Activated = true;
      }
    });
  }

  ngOnDestroy(){
    this.userActivationSubscription.unsubscribe();
  }
}
