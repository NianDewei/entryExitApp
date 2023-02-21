import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, FooterComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, SidebarComponent, FooterComponent],
})
export class SharedModule {}
