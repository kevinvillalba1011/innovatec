import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorService, Advisor } from '../../services/advisor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  advisor: Advisor | null = null;
  progressPercentage: number = 0;
  private subscription?: Subscription;

  constructor(public advisorService: AdvisorService) {}

  ngOnInit(): void {
    this.subscription = this.advisorService.currentAdvisor$.subscribe(advisor => {
      this.advisor = advisor;
      if (advisor) {
        this.progressPercentage = this.advisorService.getProgressPercentage(advisor);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  formatCurrency(amount: number): string {
    return this.advisorService.formatCurrency(amount);
  }

  getProgressColor(): string {
    if (this.progressPercentage >= 80) return '#10b981'; // Green
    if (this.progressPercentage >= 50) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  }

  getProgressGradient(): string {
    const color = this.getProgressColor();
    return `linear-gradient(90deg, ${color}, ${color}dd)`;
  }

  logout(): void {
    this.advisorService.logout();
  }
}

