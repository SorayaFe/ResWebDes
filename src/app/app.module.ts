import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { BenefitsComponent } from './benefits/benefits.component';
import { ImageTextComponent } from './image-text/image-text.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, BenefitsComponent, ImageTextComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
