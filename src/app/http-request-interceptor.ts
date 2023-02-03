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
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addApiUrlInfo(request));
    }

    addApiUrlInfo(request: HttpRequest<any>) {
        return request.clone({
            setHeaders: {
                'apiKey': this.environmentService.apiKey
            }
        });
    }
}