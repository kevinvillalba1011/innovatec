import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorService, Advisor, TeamStats } from '../../services/advisor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-dashboard.component.html',
  styleUrl: './team-dashboard.component.css'
})
export class TeamDashboardComponent implements OnInit, OnDestroy {
  boss: Advisor | null = null;
  teamStats: TeamStats | null = null;
  sortedAdvisors: Advisor[] = [];
  sortBy: 'name' | 'collection' | 'goal' | 'progress' = 'collection';
  sortDirection: 'asc' | 'desc' = 'desc';
  private subscription?: Subscription;

  constructor(public advisorService: AdvisorService) {}

  ngOnInit(): void {
    this.subscription = this.advisorService.currentAdvisor$.subscribe(advisor => {
      this.boss = advisor;
      if (advisor && this.advisorService.isBoss(advisor.code)) {
        this.teamStats = this.advisorService.getTeamStats(advisor.code);
        this.sortedAdvisors = [...this.teamStats.advisors];
        this.sortAdvisors();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  formatCurrency(amount: number): string {
    return this.advisorService.formatCurrency(amount);
  }

  getProgressPercentage(advisor: Advisor): number {
    return this.advisorService.getProgressPercentage(advisor);
  }

  getProgressColor(percentage: number): string {
    if (percentage >= 80) return '#10b981'; // Green
    if (percentage >= 50) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  }

  getProgressGradient(percentage: number): string {
    const color = this.getProgressColor(percentage);
    return `linear-gradient(90deg, ${color}, ${color}dd)`;
  }

  sortAdvisors(): void {
    this.sortedAdvisors.sort((a, b) => {
      let comparison = 0;

      switch (this.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'collection':
          comparison = a.currentCollection - b.currentCollection;
          break;
        case 'goal':
          comparison = a.collectionGoal - b.collectionGoal;
          break;
        case 'progress':
          const progressA = this.getProgressPercentage(a);
          const progressB = this.getProgressPercentage(b);
          comparison = progressA - progressB;
          break;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  setSortBy(field: 'name' | 'collection' | 'goal' | 'progress'): void {
    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortDirection = 'desc';
    }
    this.sortAdvisors();
  }

  logout(): void {
    this.advisorService.logout();
  }
}
