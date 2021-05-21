import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-chat-boat',
  templateUrl: './chat-boat.component.html',
  styleUrls: ['./chat-boat.component.css']
})
export class ChatBoatComponent implements OnInit {

  chatShow: boolean = true;
  chatHide: boolean = false;

  message: any;
  chatMsgs: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private authService: AuthService,
    // public sharedService: SharedService,
    // public socketService: SocketioService,
    // public chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatMsgs = [
      { msg: `Hello, I'm VASS!`},
      { msg: `Hi, My name is Mahesh!`},
      { msg: `How are you doing?`},
      { msg: `I'm fine thank you.`},
      { msg: `Great. How can I help you?`}
    ];

    // this.chatService.getMessage().subscribe(res => {
    //   this.chatMsgs.push({msg: res});
    // });
  }

  showChat(item: any) {
    $("body").toggleClass("open-chat");
    if ($("body").hasClass("open-chat")) {
      $(".chat-card").css("bottom", "50px");
      $(".comment-icon").css("display", "none");
      $(".close-icon").css("display", "inline-block");
    } else {
      $(".chat-card").css("bottom", "-500px");
      $(".comment-icon").css("display", "inline-block");
      $(".close-icon").css("display", "none");
    }
  }

  sendMessage() {
    // this.chatService.sendMessage(this.message);
    this.message = '';
  }

  getMessage() {

  }

}
