import { Component, OnInit } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Initialize Firebase
    const app = initializeApp(environment.firebaseConfig);
    getAnalytics(app);
  }
}
