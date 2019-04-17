'use strict';

// OOP
var custom = {
  // variables
  trigger: false,
  width: window.innerWidth,
  height: window.innerHeight,
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false,

  // methods
  typeAnimation: function typeAnimation() {
    $('.role').typed({
      strings: ['^500 Dreamer ', '^500 Designer ', '^500 Developer ', '^500 Lifelong Learner '],
      startDelay: 200,
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });
  },

  preloader: function preloader() {
    var $preloader = $('.spinner-wrapper');
    var $overlay = $('#preloader');

    $(window).load(function () {
      setTimeout(function () {
        $preloader.children().velocity({
          opacity: 0,
          translateY: '-80px'
        }, {
          duration: 400,
          complete: function complete() {
            return $preloader.velocity({
              translateY: '-100%'
            }, {
              duration: 1000,
              progress: function progress() {
                return custom.typeAnimation();
              },
              complete: function complete() {
                $preloader.hide();
                $overlay.removeClass().addClass('loaded');
              }
            });
          }
        });
      }, 1000);
    });
  },

  dynamicHeader: function dynamicHeader() {
    var $siteHeader = $('#site-header');

    if (this.height > 750) {
      $siteHeader.css({ 'height': custom.height + 5 + 'px' });
    }
  },

  navBackground: function navBackground() {
    var $nav = $('.navbar-main');

    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 50) {
        $nav.addClass('scrolled');
      } else {
        $nav.removeClass('scrolled');
      }
    });
  },

  scrollToTop: function scrollToTop() {
    var $scrollButton = $('#scroll-top');
    var offset = 250;

    $(window).on('scroll', function () {
      if ($(this).scrollTop() > offset) {
        $scrollButton.fadeIn('slow');
      } else {
        $scrollButton.fadeOut('fast');
      }

      return false;
    });

    $scrollButton.on('click', 'a', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 800);
      return false;
    });
  },

  navigation: function navigation() {
    var _this = this;

    var $nav = $('#navigation');
    var scrollable = $nav.find('.page-scroll');
    var mainNav = $nav.find('#main-navbar');
    var mobileNav = $nav.find('#mobile-navbar');
    var menuToggle = $nav.find('#toggle-navbar');

    $('body').on('click', '.page-scroll a', function (e) {
      e.preventDefault();
      var $anchor = $(this);
      var mobileChild = mobileNav.children('ul.expanded');

      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 40
      }, 1500, 'easeInOutExpo');

      if (mobileNav.children('ul').hasClass('expanded')) {
        mobileChild.slideUp('fast').removeClass('expanded');
        menuToggle.children('.bar').removeClass('animate');
      }
    });

    if (this.width <= 768) {
      mobileNav.html(mainNav.html());
    }

    menuToggle.on('click', '.bar', function (e) {
      e.preventDefault();
      if (mobileNav.children('ul').hasClass('expanded')) {
        mobileNav.children('ul.expanded').removeClass('expanded').slideUp(250);
        $(_this).removeClass('animate');
      } else {
        mobileNav.children('ul').addClass('expanded').slideDown(250);
        $(_this).addClass('animate');
      }
    });
  },

  animateSkill: function animateSkill() {
    var animationTime = 2000;
    var easing = 'easeInOutExpo';
    var $skill = '#' + $('#skills').attr('id');
    var $skillHeight = $('#skills').outerHeight();
    var $progressbar = $('.progress-bar');

    // var controller     = new ScrollMagic.Controller();

    var skillProgress = new ScrollMagic.Scene({
      triggerElement: $skill,
      duration: $skillHeight,
      offset: 100
    });
    if (!custom.trigger) {
      custom.trigger = true;
      skillProgress.on('enter', function () {
        $progressbar.each(function () {
          var $this = $(this);
          var percent = $this.parent().data('progress-percent') / 100;
          var progressWrapWidth = $this.width();
          var progressTotal = percent * progressWrapWidth;

          $this.stop().animate({ left: progressTotal }, animationTime, easing);
        });
      });
      // .addIndicators()
      // .addTo(controller);
    }
  },

  linkHighlight: function linkHighlight() {
    var controller = new ScrollMagic.Controller();
    var $sections = $('section');
    var $nav = $('.navbar-main');
    var $dotNav = $('.dot-navbar');

    $sections.each(function () {
      var $this = $(this);
      var $triggerID = '#' + $this.attr('id');
      var $elementHeight = $this.outerHeight() + 40;

      var highlightNav = new ScrollMagic.Scene({
        triggerElement: $triggerID,
        duration: $elementHeight
      }).setClassToggle($triggerID, 'active').on('enter leave', function (event) {
        if (event.type == 'enter') {
          $nav.find('a[href="#' + $this.attr('id') + '"]').addClass('active');
          $dotNav.find('a[href="#' + $this.attr('id') + '"]').addClass('active');
        } else {
          $nav.find('a[href="#' + $this.attr('id') + '"]').removeClass('active');
          $dotNav.find('a[href="#' + $this.attr('id') + '"]').removeClass('active');
        }
      })
      // .addIndicators()
      .addTo(controller);
    });
  },

  scrollAnimation: function scrollAnimation() {
    var $logoOffset = $('.logo-container').offset();
    var logoLeftValue = custom.width / 2 - $logoOffset.left;

    var $headerHeight = $('#site-header').outerHeight();
    var $aboutHeight = $('#about').outerHeight();
    var headerDuration = $headerHeight + $aboutHeight / 2;

    var $socialHeight = $('.social').height();

    var $portfolioHeight = $('#portfolio').outerHeight();

    var $skillHeight = $('#skills').outerHeight();

    var scrollAnimationPin = new ScrollMagic.Controller();

    var logoTween = TweenMax.to('.logo-container', 0.5, {
      xPercent: -50,
      x: logoLeftValue
    });
    var navScene = new ScrollMagic.Scene({
      triggerElement: '#main-navbar',
      duration: 0,
      offset: 15,
      triggerHook: 0.1
    })
    // .setPin('.logo', {
    //   pushFollowers: false,
    //   spacerClass: 'logo-pin'
    // })
    .setTween(logoTween).setClassToggle('.navbar-main', 'scroll-trigger').addIndicators({ name: 'main-nav' }).addTo(scrollAnimationPin);

    var headerScene = new ScrollMagic.Scene({
      triggerElement: '.header-wrapper',
      duration: headerDuration - 1,
      offset: $(window).height() / 2 - 39
    }).setPin('.header-hero-content', {
      pushFollowers: false,
      spacerClass: 'header-pin'
    }).addIndicators({ name: 'header' }).addTo(scrollAnimationPin);

    var socialTween = TweenMax.to('.social', 1, {
      autoAlpha: 0,
      ease: Linear.easeNone
    });
    var socialScene = new ScrollMagic.Scene({
      triggerElement: '.social',
      duration: 40,
      offset: -($(window).height() / 2 - $socialHeight * 2.4)
    }).setTween(socialTween).addIndicators({ name: 'social' }).addTo(scrollAnimationPin);

    var aboutScene = new ScrollMagic.Scene({
      triggerElement: '#about',
      duration: $aboutHeight / 2,
      offset: $(window).height() / 2 - 40
    }).setPin('#about-wrapper', { pushFollowers: false }).addIndicators({ name: 'about' }).addTo(scrollAnimationPin);

    var portfolioScene = new ScrollMagic.Scene({
      triggerElement: '#portfolio',
      duration: $portfolioHeight - ($portfolioHeight / 5 - 72),
      offset: $(window).height() / 2 - 51
    }).setPin('#portfolio-title', { pushFollowers: false }).addIndicators({ name: 'portfolio-header' }).addTo(scrollAnimationPin);

    $('.project-wrapper').each(function () {
      var $project = $(this);
      var $textTrigger = $(this).find('.section-content');

      var textReveal = new ScrollMagic.Scene({
        triggerElement: $textTrigger[0],
        duration: '100',
        offset: $textTrigger[0].offsetHeight / 2 - 2
      }).on('enter', function () {
        $textTrigger.find('.reveal-holder').addClass('show-text');
      }).addIndicators({ name: 'text-reveal' }).addTo(scrollAnimationPin);

      var projectScene = new ScrollMagic.Scene({
        triggerElement: $project[0],
        duration: $project[0].offsetHeight / 2,
        offset: $project[0].offsetHeight / 7
      }).setPin($textTrigger[0], { pushFollowers: false }).addIndicators({ name: 'project-pin' }).addTo(scrollAnimationPin);
    });

    // var skillTitle = new ScrollMagic.Scene({
    //   triggerElement: '#skills',
    //   duration: $skillHeight / 2,
    //   offset: $(window).height() / 2 - 51
    // })
    //   .setPin('#skills', { pushFollowers: false })
    //   .addIndicators({name: 'skills'})
    //   .addTo(scrollAnimationPin);

    // var skillContent = new ScrollMagic.Scene({
    //   triggerElement: '#skills',
    //   duration: $skillHeight / 2,
    //   offset: $(window).height() / 2 - 51
    // })
    //   .setPin('.skill-content', { pushFollowers: true })
    //   .addIndicators({ name: 'skill-content', indent: 150 })
    //   .addTo(scrollAnimationPin);
  },

  modalController: function modalController() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById('myBtn');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function (e) {
      e.preventDefault();
      modal.style.display = 'block';
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function (e) {
      e.preventDefault();
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (e) {
      e.preventDefault();
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    };
  },

  init: function init() {
    custom.preloader();
    custom.dynamicHeader();
    // custom.navBackground();
    custom.scrollToTop();
    custom.navigation();
    // custom.animateSkill();
    custom.linkHighlight();
    custom.scrollAnimation();
    custom.modalController();
  }
};

$(function () {
  custom.init();
});