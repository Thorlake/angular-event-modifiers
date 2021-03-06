import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[click.prevent]'
})
export class ClickEventPreventDefaultDirective {
    @Output("click.prevent")
    invokeEventHandler = new EventEmitter();

    private unsubscribe$: Subject<any> = new Subject<any>();

    constructor(
        private element: ElementRef) {
    }

    ngOnInit() {
        fromEvent<Event>(this.element.nativeElement, "click")
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                (event: Event) => {
                    event.preventDefault();
                    this.invokeEventHandler.emit(event);
                }
            )
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
