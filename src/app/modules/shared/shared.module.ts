import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [TopNavigationComponent, FooterComponentComponent],
    providers: [],
    exports: [TopNavigationComponent,FooterComponentComponent]
})

export class SharedModule { }
