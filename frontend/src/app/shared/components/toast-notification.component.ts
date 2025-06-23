import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.css'],
})
export class ToastNotificationComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() duration: number = 3000; // in milliseconds

  visible: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.message) {
      this.showToast();
    }
  }

  showToast() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }
}
