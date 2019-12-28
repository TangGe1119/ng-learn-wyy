import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  ViewChild,
  Inject,
  OnDestroy,
  forwardRef
} from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";
import {
  filter,
  tap,
  pluck,
  map,
  distinctUntilChanged,
  takeUntil,
  throttleTime
} from "rxjs/operators";
import { SliderEventObserverConfig } from "./wy-slider.type";
import { DOCUMENT } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { sliderEvent } from "./wy-slider-helper";

@Component({
  selector: "app-wy-slider",
  templateUrl: "./wy-slider.component.html",
  styleUrls: ["./wy-slider.component.less"],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WySliderComponent),
      multi: true
    }
  ]
})
export class WySliderComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  private sliderDom: HTMLDivElement;
  private isDragging = false;
  private value: number;
  offset: number = null;

  @Input() wyVertical = false;
  @Input() wyMin = 0;
  @Input() wyMax = 100;
  @Input() wyBufferOffset = 0;

  dragStart$: Observable<number>;
  dragMove$: Observable<number>;
  dragEnd$: Observable<Event>;

  dragStart_: Subscription;
  dragMove_: Subscription;
  dragEnd_: Subscription;

  @ViewChild("wySlider", { static: true })
  private wySlider: ElementRef;

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
    this.subscribeDrag(["start"]);
  }

  ngOnDestroy() {
    this.unsubscribeDrag();
  }

  private createDraggingObservables() {
    const source: SliderEventObserverConfig = {
      start: "mousedown",
      move: "mousemove",
      end: "mouseup"
    };

    this.dragStart$ = fromEvent(this.sliderDom, source.start).pipe(
      filter(event => event instanceof MouseEvent),
      tap(sliderEvent),
      pluck(this.wyVertical ? "pageY" : "pageX"),
      map((pos: number) => this.findClosestValue(pos))
    );

    this.dragEnd$ = fromEvent(this.doc, source.end);

    this.dragMove$ = fromEvent(this.doc, source.move).pipe(
      filter(event => event instanceof MouseEvent),
      tap(sliderEvent),
      pluck(this.wyVertical ? "pageY" : "pageX"),
      throttleTime(60),
      distinctUntilChanged(),
      map((pos: number) => this.findClosestValue(pos)),
      takeUntil(this.dragEnd$)
    );
  }

  private findClosestValue(pos: number): number {
    // 滑块总长
    const sliderLengh = this.wyVertical
      ? this.sliderDom.clientHeight
      : this.sliderDom.clientWidth;

    const rect = this.sliderDom.getBoundingClientRect();
    const win = this.sliderDom.ownerDocument!.defaultView;

    const sliderStart = this.wyVertical
      ? rect.top + win.scrollY
      : rect.left + win.scrollX;

    const ratio = (pos - sliderStart) / sliderLengh;
    const ratioTrue = Math.max(
      Math.min(this.wyVertical ? 1 - ratio : ratio, 1),
      0
    );
    return ratioTrue * (this.wyMax - this.wyMin) + this.wyMin;
  }

  private subscribeDrag(events: string[] = ["start", "move", "end"]) {
    if (events.includes("start") && this.dragStart$ && !this.dragStart_) {
      this.dragStart_ = this.dragStart$.subscribe(this.onDragStart.bind(this));
    }
    if (events.includes("move") && this.dragMove$ && !this.dragMove_) {
      this.dragMove_ = this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if (events.includes("end") && this.dragEnd$ && !this.dragEnd_) {
      this.dragEnd_ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private unsubscribeDrag(events: string[] = ["start", "move", "end"]) {
    if (events.includes("start") && this.dragStart$ && this.dragStart_) {
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }
    if (events.includes("move") && this.dragMove$ && this.dragMove_) {
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }
    if (events.includes("end") && this.dragEnd$ && this.dragEnd_) {
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  private onDragStart(value: number) {
    this.setValue(value);
    this.toggleDragMoving(true);
  }

  private onDragMove(value: number) {
    if (this.isDragging) {
      this.setValue(value);
    }
  }

  private onDragEnd() {
    this.toggleDragMoving(false);
  }

  private setValue(value: number, bool: boolean = true) {
    if (value === this.value) return;
    this.value = value;
    this.updateTrackAndHandles();
    if (bool) {
      this.onValueChange(this.value);
    }
  }

  private updateTrackAndHandles() {
    this.offset = ((this.value - this.wyMin) / (this.wyMax - this.wyMin)) * 100;
  }

  private toggleDragMoving(moveable: boolean) {
    this.isDragging = moveable;
    if (moveable) {
      this.subscribeDrag(["move", "end"]);
    } else {
      this.unsubscribeDrag(["move", "end"]);
    }
  }

  writeValue(value: number) {
    this.setValue(value, false);
  }

  private onValueChange: (value: number) => void;

  registerOnChange(fn: (value: number) => void) {
    this.onValueChange = fn;
  }

  registerOnTouched() {}
}
