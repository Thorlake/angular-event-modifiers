import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[click.prevent.stop], [click.stop.prevent]'
})
export class ClickEventPreventDefaultStopPropagationDirective {
    @Output("click.prevent.stop")
    invokeEventHandler = new EventEmitter();

    @Output("click.stop.prevent")
    invokeEventHandlerDuplicate = new EventEmitter();

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
                    event.stopPropagation();
                    this.invokeEventHandler.emit(event);
                    this.invokeEventHandlerDuplicate.emit(event);
                }
            )
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
