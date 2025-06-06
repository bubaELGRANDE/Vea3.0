import { HttpInterceptorFn } from '@angular/common/http';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {

  let tokenData: any = null;

  try {
    tokenData = JSON.parse(localStorage.getItem('auth_key') || 'null');
  } catch (e) {
    tokenData = null;
  }

  if (tokenData?.accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenData.accessToken}`,
      },
    });
  }


  return next(req);
};
