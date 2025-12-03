import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { AdvisorService } from './services/advisor.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginModalComponent, DashboardComponent, TeamDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'collection-tracker';
  isLoggedIn = false;
  isBoss = false;

  constructor(private advisorService: AdvisorService) {}

  ngOnInit(): void {
    this.advisorService.currentAdvisor$.subscribe(advisor => {
      this.isLoggedIn = advisor !== null;
      this.isBoss = advisor ? this.advisorService.isBoss(advisor.code) : false;
    });
  }

  onLoginSuccess(): void {
    this.isLoggedIn = true;
  }
}

