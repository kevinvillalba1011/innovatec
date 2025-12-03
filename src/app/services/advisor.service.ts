import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';

export interface Advisor {
  code: string;
  name: string;
  currentCollection: number;
  collectionGoal: number;
  bossCode?: string; // Código del jefe a cargo
}

export interface TeamStats {
  totalAdvisors: number;
  totalCollection: number;
  totalGoal: number;
  progressPercentage: number;
  advisors: Advisor[];
}

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {
  private advisors: Advisor[] = [];
  private currentAdvisorSubject = new BehaviorSubject<Advisor | null>(null);
  public currentAdvisor$ = this.currentAdvisorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAdvisors();
  }

  private loadAdvisors(): void {
    this.http.get('assets/datos.xlsx', { responseType: 'blob' }).subscribe(
      blob => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

          // Assuming the first sheet is the one we want
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          // Convert to array of arrays
          const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

          console.log('Raw Excel data:', data);

          // Map to Advisor interface using indices
          // Assuming: Col 0 = Code, Col 1 = Name, Col 2 = BossCode, Col 4 = Current, Col 5 = Goal
          this.advisors = data.slice(1).map(row => ({
            code: String(row[0] || ''),
            name: String(row[1] || ''),
            bossCode: row[2] ? String(row[2]) : undefined,
            currentCollection: Number(row[4] || 0),
            collectionGoal: Number(row[5] || 0)
          })).filter(a => a.code && a.code !== 'undefined' && a.code !== 'Cédula'); // Filter invalid rows

          console.log('Advisors loaded from Excel:', this.advisors);
        };
        reader.readAsBinaryString(blob);
      },
      error => {
        console.error('Error loading advisors Excel data:', error);
      }
    );
  }

  validateCode(code: string): boolean {
    console.log('Validating code:', code);
    console.log('All advisors:', this.advisors);
    let advisor = this.advisors.find(a => a.code === code.trim());
    console.log('Found advisor:', advisor);

    const isBossCode = this.isBoss(code);
    console.log('Is boss?', isBossCode);

    // Si no se encuentra el asesor pero es un código de jefe, crear un asesor virtual
    if (!advisor && isBossCode) {
      advisor = {
        code: code.trim(),
        name: `Jefe ${code.trim()}`,
        currentCollection: 0,
        collectionGoal: 0,
        bossCode: undefined
      };
      console.log('Created virtual boss advisor:', advisor);
    }

    if (advisor) {
      this.currentAdvisorSubject.next(advisor);
      return true;
    }
    return false;
  }

  getCurrentAdvisor(): Advisor | null {
    return this.currentAdvisorSubject.value;
  }

  logout(): void {
    this.currentAdvisorSubject.next(null);
  }

  getProgressPercentage(advisor: Advisor): number {
    if (advisor.collectionGoal === 0) return 0;
    return Math.min((advisor.currentCollection / advisor.collectionGoal) * 100, 100);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  isBoss(code: string): boolean {
    // Un código es de jefe si hay asesores que tienen ese código como bossCode
    const bossCodes = this.advisors.map(a => a.bossCode).filter(bc => bc);
    console.log('All boss codes in system:', bossCodes);
    console.log('Checking if code is boss:', code.trim());
    const result = this.advisors.some(a => a.bossCode === code.trim());
    console.log('Result:', result);
    return result;
  }

  getAdvisorsByBoss(bossCode: string): Advisor[] {
    return this.advisors.filter(a => a.bossCode === bossCode.trim());
  }

  getTeamStats(bossCode: string): TeamStats {
    const advisors = this.getAdvisorsByBoss(bossCode);
    const totalCollection = advisors.reduce((sum, a) => sum + a.currentCollection, 0);
    const totalGoal = advisors.reduce((sum, a) => sum + a.collectionGoal, 0);
    const progressPercentage = totalGoal > 0 ? Math.min((totalCollection / totalGoal) * 100, 100) : 0;

    return {
      totalAdvisors: advisors.length,
      totalCollection,
      totalGoal,
      progressPercentage,
      advisors
    };
  }

  isCurrentUserBoss(): boolean {
    const current = this.getCurrentAdvisor();
    return current ? this.isBoss(current.code) : false;
  }
}
