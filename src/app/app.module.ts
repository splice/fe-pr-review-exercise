import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleProvidersModule } from './modules/sample-providers/sample-providers.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SampleProvidersModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
