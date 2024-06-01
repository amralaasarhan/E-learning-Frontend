import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular2';

  constructor() { }
  
  // ngOnInit(): void {
  //   $(document).ready(() => {
  //     // jQuery-dependent code here
  //     $('.nav li:first').addClass('active');

  //     var showSection = function showSection(section: string, isAnimate: boolean) {
  //       var
  //       direction = section.replace(/#/, ''),
  //       reqSection = $('.section').filter('[data-section="' + direction + '"]'),
  //       reqSectionPos = reqSection.offset().top - 0;

  //       if (isAnimate) {
  //         $('body, html').animate({
  //           scrollTop: reqSectionPos },
  //         800);
  //       } else {
  //         $('body, html').scrollTop(reqSectionPos);
  //       }
  //     };

  //     var checkSection = () => {
  //       $('.section').each( () => {
  //         var
  //         $this = $(this),
  //         topEdge = $this.offset().top - 80,
  //         bottomEdge = topEdge + $this.height(),
  //         wScroll = $(window).scrollTop();
  //         if (topEdge < wScroll && bottomEdge > wScroll) {
  //           var
  //           currentId = $this.data('section'),
  //           reqLink = $('a').filter('[href*=\\#' + currentId + ']');
  //           reqLink.closest('li').addClass('active').
  //           siblings().removeClass('active');
  //         }
  //       });
  //     };

  //     $('.main-menu, .responsive-menu, .scroll-to-section').on('click', 'a',  (e: { preventDefault: () => void; }) => {
  //       e.preventDefault();
  //       showSection($(this).attr('href'), true);
  //     });

  //     $(window).scroll(function () {
  //       checkSection();
  //     });
  //   });
  // }


}
