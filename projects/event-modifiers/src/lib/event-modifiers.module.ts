import { NgModule } from '@angular/core';
import { ClickEventPreventDefaultStopPropagationDirective } from './click-event-prevent-default-stop-propagation.directive';
import { ClickEventPreventDefaultDirective } from './click-event-prevent-default.directive';
import { ClickEventStopPropagationDirective } from './click-event-stop-propagation.directive';

@NgModule({
    declarations: [
        ClickEventPreventDefaultDirective,
        ClickEventStopPropagationDirective,
        ClickEventPreventDefaultStopPropagationDirective
    ],
    imports: [
    ],
    exports: [
        ClickEventPreventDefaultDirective,
        ClickEventStopPropagationDirective,
        ClickEventPreventDefaultStopPropagationDirective
    ]
})
export class EventModifiersModule { }
