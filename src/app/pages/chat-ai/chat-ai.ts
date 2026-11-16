import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../chat-service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-ai.html',
  styleUrl: './chat-ai.css',
})
export class ChatAi {
  ngOnInit(): void {}

  private chatService = inject(ChatService);

  isLoading = signal(false);

  isEmpty = signal(true);

  userMessage = '';

  messages = signal<any[]>([]);

  startNewChat() {
    this.isEmpty.set(false);
  }

  sendMessage() {
    const message = this.userMessage.trim();

    if (!message || this.isLoading()) return;

    this.isEmpty.set(false);

    this.messages.update((current) => [
      ...current,
      {
        role: 'user',
        content: message,
      },
    ]);

    this.userMessage = '';
    this.isLoading.set(true);

    this.chatService.sendMessage(message).subscribe({
      next: (response) => {
        console.log('API Response:', response);

        this.messages.update((current) => [
          ...current,
          {
            role: 'assistant',
            content: response.reply,
          },
        ]);

        this.isLoading.set(false);
      },

      error: (error) => {
        console.error('API Error:', error);

        this.messages.update((current) => [
          ...current,
          {
            role: 'assistant',
            content: 'Sorry, something went wrong. Please try again.',
          },
        ]);

        this.isLoading.set(false);
      },
    });
  }

  askSuggestion(message: string) {
    this.userMessage = message;
    this.sendMessage();
  }

  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;

    if (!keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.sendMessage();
    }
  }

  clearChat() {
    this.messages.set([]);
  }
}
