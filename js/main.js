(function () {
  "use strict";
  /* 1. Windows on Load
	====================*/
  $(window).on("load", function () {
    $(".loader").delay(2000).fadeOut("slow");
    var $grid = $(".grid").masonry({
      itemSelector: ".grid-item",
      percentPosition: true,
      columnWidth: ".grid-sizer",
    });
  });

  /* 2. Windows on Scroll
	====================*/
  var winScrollTop = 0;
  $(window).on("scroll", function () {
    var nav = $("#navbar");
    var top = 200;
    if ($(window).scrollTop() >= top) {
      nav.addClass("onscroll");
    } else {
      nav.removeClass("onscroll");
    }
    winScrollTop = $(this).scrollTop();
    parallax();
  });

  /* 3. SVG loader
	====================*/
  function mycallback() {
    this.el.classList.add("finish");
  }
  Vivus.prototype.myremoveclass = function () {
    this.el.classList.remove("finish");
  };
  var loaderSvg = new Vivus(
    "my-svg",
    {
      type: "sync",
      duration: 100,
      file: "img/loader.svg",
      start: "autostart",
      dashGap: 20,
      forceRender: false,
    },
    mycallback
  );

  /* 4. Navbar collapse
	====================*/
  $(".navbar-nav>li>a")
    .not(".dropdown-toggle")
    .on("click", function () {
      $(".navbar-collapse").collapse("hide");
    });

  /* 6. Slick slider
	====================*/
  var slider = function () {
    if ($(".slick-gallery")) {
      $(".slick-gallery").slick({
        centerMode: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
            },
          },
        ],
      });
    }
    if ($(".slick-wishes")) {
      $(".slick-wishes").slick({
        dots: true,
        arrows: false,
      });
    }
    if ($(".slick-gifts")) {
      $(".slick-gifts").slick({
        dots: true,
        arrows: false,
        slidesToShow: 5,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
  };
  var sliderNum = function () {
    var $slides = $(".slick-gallery .slick-slide").not(".slick-cloned");
    var $currentSlide = $(".slick-slide.slick-current").attr(
      "data-slick-index"
    );
    $(".gallery__slider-current").text(+$currentSlide + 1);
    $(".gallery__slider-all").text($slides.length);
  };
  $(".slick").on("afterChange", sliderNum);

  /* 7. Countdown
	====================*/
  var count = new Date("feb 16, 2022 00:00:00").getTime();
  var x = setInterval(function () {
    var now = new Date().getTime();
    var d = count - now;

    var days = Math.floor(d / (1000 * 60 * 60 * 24));
    var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((d % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (d <= 0) {
      clearInterval(x);
    }
  }, 1000);

  /* 8. Page scroll
	====================*/
  var pageScroll = function () {
    $("body").on("click touch", ".page-scroll", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top,
          },
          1500,
          "easeInOutExpo"
        );
      event.preventDefault();
    });
  };
  /* 9. Parallax
	====================*/
  $.fn.is_on_screen = function () {
    var win = $(window);
    var viewport = {
      top: win.scrollTop(),
      left: win.scrollLeft(),
    };
    //viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    //bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return !(viewport.bottom < bounds.top || viewport.top > bounds.bottom);
  };
  function parallax() {
    var scrolled = $(window).scrollTop();
    $(".parallax").each(function () {
      if ($(this).is_on_screen()) {
        var firstTop = $(this).offset().top;
        var moveTop = (firstTop - winScrollTop) * 0.2; //speed;
        $(this).css("transform", "translateY(" + moveTop + "px)");
      }
    });
  }

  $(function () {
    slider();
    sliderNum();
    countdown();
    pageScroll();
  });
})();
