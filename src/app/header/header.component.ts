import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output()
  inputTextEvent = new EventEmitter();

  inputText="";
  
  sendInputText(){
    this.inputTextEvent.emit({inputText: this.inputText.toLowerCase()});
  }

}
