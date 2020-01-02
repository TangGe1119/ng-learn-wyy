import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import ScrollBar from "@better-scroll/scroll-bar";
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);

@Component({
  selector: "app-wy-scroll",
  template: `
    <div class="wy-scroll" #wrap>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .wy-scroll {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyScrollComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: any[];
  @ViewChild("wrap", { static: true }) private wrap: ElementRef<HTMLDivElement>;

  private bs: BScroll;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.bs = new BScroll(this.wrap.nativeElement, {
      scrollbar: {
        interactive: true
      },
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"]) {
      this.refresh();
    }
  }

  refresh() {
    console.log("refresh");
    this.bs.refresh();
  }
}
