import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormComponent } from './shared/components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainResultComponent } from './shared/components/nav-result/main-result.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { NgxCurrencyModule } from "ngx-currency";
import { AccordionComponent } from './shared/components/accordion/accordion.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    FormComponent,
    MainResultComponent,
    LoadingComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
