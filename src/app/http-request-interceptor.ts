import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from './services/environment-service/environment.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private environmentService: EnvironmentService) {

    }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(this.addApiUrlInfo(request));
    }

    addApiUrlInfo(request: HttpRequest<unknown>) {
        return request.clone({
            setHeaders: {
                'apiKey': this.environmentService.apiKey
            }
        });
    }
}