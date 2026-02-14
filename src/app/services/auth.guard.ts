import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se o cara tá logado (tem o token), a porta abre (return true)
  if (authService.isAutenticado()) {
    return true;
  } else {
    // Se não, é barrado e mandado pro login (return false)
    router.navigate(['/login']);
    return false;
  }
};
