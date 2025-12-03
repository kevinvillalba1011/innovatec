import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdvisorService } from '../../services/advisor.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  @Output() loginSuccess = new EventEmitter<void>();

  advisorCode: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private advisorService: AdvisorService) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.advisorCode.trim()) {
      this.errorMessage = 'Por favor ingrese su código de asesor';
      return;
    }

    this.isLoading = true;

    // Simulate a small delay for better UX
    setTimeout(() => {
      const isValid = this.advisorService.validateCode(this.advisorCode);

      if (isValid) {
        this.loginSuccess.emit();
      } else {
        this.errorMessage = 'Código de asesor inválido. Por favor intente nuevamente.';
      }

      this.isLoading = false;
    }, 500);
  }

  onInputChange(): void {
    this.errorMessage = '';
  }
}

