import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import "iconify-icon";


@NgModule({
  declarations: [
    SideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[SideBarComponent]
})
export class SharedModule { }
