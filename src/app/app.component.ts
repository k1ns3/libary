import { Component, ErrorHandler } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'scout-library-graph';
}
export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        console.log(error);
        if (error.name === 'HttpErrorResponse') {
            alert(
`Name error: ${error.name}
Status: ${0},
URL: ${error.error.currentTarget.__zone_symbol__xhrURL}
`);
        } else {
            alert(error.message);
        }
    }

}
