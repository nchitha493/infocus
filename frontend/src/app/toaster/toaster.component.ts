import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Toast } from './toast.interface';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {
  @Input() toast: any;
  @Input() i: any;

  @Output() remove = new EventEmitter<number>();
}