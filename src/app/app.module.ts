import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShowtickBarComponent } from './samples/showtick-bar/showtick-bar.component';
import { ShowtickComponent } from './samples/showtick/showtick.component';
import { BarComponent } from './samples/showtick-bar/bar/bar.component';
import { TickService } from './samples/tick.service';
import { TickGraphComponent } from './tickGraph.component';

@NgModule({
    declarations: [
        AppComponent,
        ShowtickBarComponent,
        ShowtickComponent,
        TickGraphComponent,
        BarComponent
    ],
    imports: [BrowserModule],
    providers: [TickService],
    bootstrap: [AppComponent]
})
export class AppModule {}
