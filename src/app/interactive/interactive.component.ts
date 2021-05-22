import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css'],
})
export class InteractiveComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('icon') icons: QueryList<ElementRef>;

  public active = 0;
  public isBrowser = false;
  public sub: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
      const source = interval(3000);
      this.sub = source.subscribe(() => {
        this.toggleClass();
        setTimeout(() => {
          this.toggleClass();
          setTimeout(() => {
            this.toggleClass();
            setTimeout(() => {
              this.toggleClass();
            }, 200);
          }, 200);
        }, 200);
      });
      this.cd.detectChanges();
    }
  }

  private toggleClass(): void {
    if (this.icons) {
      const icons = this.icons.toArray();

      for (const icon of icons) {
        if (icon.nativeElement) {
          if (icon.nativeElement.classList.contains('big')) {
            icon.nativeElement.classList.remove('big');
            icon.nativeElement.classList.add('small');
          } else {
            icon.nativeElement.classList.remove('small');
            icon.nativeElement.classList.add('big');
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
