import { Component } from '@angular/core';
import { Navbar } from '../../pages/navbar/navbar';
import { ChatAi } from '../../pages/chat-ai/chat-ai';

@Component({
  selector: 'app-layout',
  imports: [Navbar, ChatAi],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
