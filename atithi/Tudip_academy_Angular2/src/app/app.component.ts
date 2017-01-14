import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import {GlobalState} from './global.state';

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    template: `
      <router-outlet></router-outlet>
      `
})
export class App {
    constructor() {
    }

    public ngAfterViewInit(): void {

    }
}
