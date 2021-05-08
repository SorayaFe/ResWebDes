import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.css'],
})
export class ImageTextComponent implements OnInit, OnDestroy {
  public scrollSub: Subscription;
  public inView1 = false;
  public inView2 = false;

  @ViewChild('img1') img1: ElementRef;
  @ViewChild('img2') img2: ElementRef;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollSub = fromEvent(window, 'scroll').subscribe(() => {
        if (this.isInViewport('img1')) this.inView1 = true;
        if (this.isInViewport('img2')) this.inView2 = true;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
  }

  public isInViewport(element: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const rect = this[element].nativeElement.getBoundingClientRect();
      const scroll = window.scrollY || window.pageYOffset;

      if (rect.top - scroll <= 0) return true;

      return false;
    }
  }
}
