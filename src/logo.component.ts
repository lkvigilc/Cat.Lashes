import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <img
      src="assets/logo_cat_lashes.jpeg"
      alt="Cat Lashes"
      [attr.width]="size"
      [attr.height]="size"
      class="inline-block rounded-full object-cover"
    />
  `,
})
export class Logo {
  @Input() size: number = 48;
}
