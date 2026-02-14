import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Pega o crachá do bolso do navegador
  const token = sessionStorage.getItem('token_lontras');

  // Se tiver o crachá, fazemos um clone da requisição original e grudamos o token no cabeçalho
  if (token) {
    const reqClonada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Manda a requisição clonada (com o crachá) seguir viagem
    return next(reqClonada);
  }

  // Se não tiver crachá (ex: na própria tela de login), segue normal
  return next(req);
};
