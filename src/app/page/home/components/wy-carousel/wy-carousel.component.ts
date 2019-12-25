import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  Output,
  ChangeDetectionStrategy
} from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-wy-carousel",
  templateUrl: "./wy-carousel.component.html",
  styleUrls: ["./wy-carousel.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCarouselComponent implements OnInit {
  @ViewChild("dot", { static: true }) dotRef: TemplateRef<any>;
  @Input() activeIndex: number;
  @Output() changeSlide = new EventEmitter<"pre" | "next">();

  constructor() {}

  ngOnInit() {}

  onChangeSlide(type: "pre" | "next") {
    this.changeSlide.emit(type);
  }
}
