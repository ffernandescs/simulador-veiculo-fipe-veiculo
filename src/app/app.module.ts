import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { NgxCurrencyModule } from "ngx-currency";
import  {  NgCircleProgressModule  }  from  'ng-circle-progress' ;

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormComponent } from './shared/components/form/form.component';
import { MainResultComponent } from './shared/components/nav-result/main-result.component';
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
    NgxCurrencyModule,
    NgCircleProgressModule.forRoot({
      "radius": 65,
      "space": -14,
      "outerStrokeWidth": 14,
      "innerStrokeWidth": 14,
      "innerStrokeColor": "#999",
      "showBackground": false,
      "titleFontSize": "25",
      "unitsFontSize": "25",
      "titleFontWeight":"800",
      "unitsFontWeight":"800",
      "animationDuration": 1000,
      "startFromZero": false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
