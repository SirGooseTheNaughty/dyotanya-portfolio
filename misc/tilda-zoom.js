function t_initZoom() {
  var zoomerWrapper;
  if (
    !(zoomerWrapper = document.querySelectorAll(".t-zoomer__wrapper")).length
  ) {
    (window.tzoominited = !0),
      (window.tzoomopenonce = !1),
      (window.isDoubletapScaleAdded = !1);
    var zoomableElmnts = document.querySelectorAll(
        '[data-zoomable="yes"]:not(.t-slds__thumbs_gallery):not([data-img-zoom-url=""])'
      ),
      zoomerWrapper;
    Array.prototype.forEach.call(zoomableElmnts, function (zoomableEl) {
      zoomableEl.classList.add("t-zoomable");
    }),
      document.body &&
        document.body.insertAdjacentHTML(
          "beforeend",
          '<div class="t-zoomer__wrapper"><div class="t-zoomer__container"></div><div class="t-zoomer__bg"></div><div class="t-zoomer__close" style="display:none;"><svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.41421 -0.000151038L0 1.41406L21.2132 22.6273L22.6274 21.2131L1.41421 -0.000151038Z" fill="black"/><path d="M22.6291 1.41421L21.2148 0L0.00164068 21.2132L1.41585 22.6274L22.6291 1.41421Z" fill="black"/></svg></div></div>'
        ),
      (zoomerWrapper = document.querySelector(".t-zoomer__wrapper")) &&
        zoomerWrapper.insertAdjacentHTML(
          "beforeend",
          '<div class="t-zoomer__scale showed" style="display:none;"><svg class="icon-increase" width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.832 22L17.8592 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.58591 3.7511C0.917768 7.41924 0.917768 13.367 4.58591 17.0352C8.25405 20.7033 14.2019 20.7033 17.87 17.0352C21.5381 13.367 21.5381 7.41924 17.87 3.7511C14.2019 0.0829653 8.25405 0.0829653 4.58591 3.7511Z" stroke="black" stroke-width="2"/><path d="M6.25781 10.3931H16.2035" stroke="black" stroke-width="2"/><path d="M11.2305 15.3662V5.42053" stroke="black" stroke-width="2"/></svg><svg class="icon-decrease" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.9961 22L17.0233 17.0273" stroke="black" stroke-width="2" stroke-linecap="square"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.74997 3.7511C0.0818308 7.41924 0.0818308 13.367 3.74997 17.0352C7.41811 20.7033 13.3659 20.7033 17.0341 17.0352C20.7022 13.367 20.7022 7.41924 17.0341 3.7511C13.3659 0.0829653 7.41811 0.0829653 3.74997 3.7511Z" stroke="black" stroke-width="2"/><path d="M5.41797 10.3931H15.3637" stroke="black" stroke-width="2"/></svg></div>'
        ),
      t_zoom__initFullScreenImgOnClick(),
      t_zoom__closeCarousel();
  }
}
function t_zoom__initFullScreenImgOnClick() {
  var sections = document.querySelectorAll(".r");
  Array.prototype.forEach.call(sections, function (section) {
    section.addEventListener("click", function (e) {
      for (
        var target = e.target;
        target && target !== this;
        target = target.parentNode
      )
        if (
          target.matches('.t-zoomable:not([data-img-zoom-url=""])') ||
          target.matches(".t-slds__thumbs_gallery-zoomable")
        ) {
          t_zoomHandler.call(target, e);
          break;
        }
    });
  });
}
function t_zoom__closeCarousel() {
  var zoomerCloseAndBg = document.querySelectorAll(
    ".t-zoomer__close, .t-zoomer__bg"
  );
  Array.prototype.forEach.call(zoomerCloseAndBg, function (el) {
    el.addEventListener("click", function () {
      var isPopupShown;
      t_zoom_close(),
        !!document.querySelectorAll(".t-popup_show").length &&
          document.addEventListener("keydown", function (e) {
            27 === e.keyCode &&
              window.t_store_closePopup &&
              t_store_closePopup(!1);
          });
    });
  });
}
function t_zoomHandler() {
  var targetElement = this;
  document.body.classList.add("t-zoomer__show");
  var zoomerContainers = document.querySelectorAll(".t-zoomer__container");
  Array.prototype.forEach.call(zoomerContainers, function (zoomerContainer) {
    zoomerContainer.innerHTML =
      '<div class="t-carousel__zoomed"><div class="t-carousel__zoomer__slides"><div class="t-carousel__zoomer__inner"><div class="t-carousel__zoomer__track"></div></div><div class="t-carousel__zoomer__control t-carousel__zoomer__control_left" data-zoomer-slide="prev"><div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_left"><div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_left t-carousel__zoomer__arrow_small"></div></div></div><div class="t-carousel__zoomer__control t-carousel__zoomer__control_right" data-zoomer-slide="next"><div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_right"><div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_right t-carousel__zoomer__arrow_small"></div></div></div></div></div>';
  });
  var parentBlock = this.closest(".r"),
    sliderTrack;
  if (!parentBlock) return !1;
  if (!document.querySelector(".t-carousel__zoomer__track")) return !1;
  t_zoom__addingImgsIntoCarousel(this);
  var closeBtn = document.querySelector(".t-zoomer__close");
  closeBtn && (closeBtn.style.display = "flex"),
    t_zoom_setModalColor(parentBlock),
    t_zoom__createAndLoopSlider(this),
    t_zoom__getEventOnBtn(),
    t_zoom__closeZoomOnKeyup(),
    document.body.classList.add("t-zoomer__show_fixed"),
    t_zoom__initSingleZoom(),
    t_zoom__setEventOnZoomerInner(),
    t_zoom_checkForScale(),
    t_zoom_lockScroll(),
    t_zoom_initSwipe(),
    t_zoom_initCloseSwipe(),
    t_zoom_initResizeListener(),
    (window.tzoomopenonce = !0),
    t_zoom__initEventsonMobile();
}
function t_zoom_initSwipe() {
  var slideItems = document.querySelectorAll(".t-carousel__zoomer__item"),
    modal = document.querySelector(".t-zoomer__wrapper");
  if (slideItems.length > 1) {
    var hammer = new Hammer(modal, {
        domEvents: !0,
        inputClass: Hammer.TouchInput,
        cssProps: { touchCollout: "default" },
        recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]],
      }),
      sliderTrackPosLeft = null,
      isScaled = !1;
    window.tzoomopenonce ||
      (hammer.on("panstart", function () {
        var sliderTrack = document.querySelector(".t-carousel__zoomer__track"),
          sliderTrackTransition;
        "y" !== sliderTrack.getAttribute("data-on-transition")
          ? sliderTrack &&
            ((sliderTrackPosLeft = sliderTrack.getBoundingClientRect().left),
            (sliderTrack.style.transition = "none"))
          : (sliderTrackPosLeft = null),
          (isScaled = t_zoom__isScaled(modal));
      }),
      hammer.on("panmove", function (event) {
        var sliderTrack = document.querySelector(".t-carousel__zoomer__track"),
          sliderTrackTransition =
            sliderTrack.getAttribute("data-on-transition"),
          modalOnDrag = modal.getAttribute("data-on-drag"),
          deltaX;
        if (
          "y" !== sliderTrackTransition &&
          "y" !== modalOnDrag &&
          1 === event.maxPointers &&
          !isScaled &&
          (Math.abs(event.deltaX) > 40 &&
            sliderTrack.setAttribute("data-on-drag", "y"),
          sliderTrackPosLeft)
        ) {
          var newTrackPosition = sliderTrackPosLeft + event.deltaX;
          sliderTrack.style.transform =
            "translateX(" + newTrackPosition + "px)";
        }
      }),
      hammer.on("panend", function (event) {
        var sliderTrack = document.querySelector(".t-carousel__zoomer__track");
        sliderTrack.setAttribute("data-on-drag", "");
        var sliderTrackTransition =
            sliderTrack.getAttribute("data-on-transition"),
          modalOnDrag = modal.getAttribute("data-on-drag");
        if (
          "y" !== sliderTrackTransition &&
          "y" !== modalOnDrag &&
          1 === event.maxPointers &&
          !isScaled
        ) {
          sliderTrack.style.transition = "";
          var velocity = Math.abs(event.velocityX),
            sliderTrackOffset = sliderTrack.offsetLeft,
            slideWidth = slideItems[0].offsetWidth,
            targetSlideOffset = sliderTrack.querySelector(
              ".t-carousel__zoomer__item.active"
            ).offsetLeft,
            distance,
            transitionTime =
              (slideWidth - Math.abs(sliderTrackOffset + targetSlideOffset)) /
              velocity /
              1e3;
          transitionTime > 0.6
            ? (transitionTime = 0.6)
            : transitionTime < 0.2 && (transitionTime = 0.2),
            (sliderTrack.style.transitionDuration = transitionTime + "s"),
            event.velocityX < -0.5 || event.deltaX < -80
              ? (t_zoom_unscale(),
                t_zoom_showSlide("next"),
                t_zoom_checkForScale())
              : event.velocityX > 0.5 || event.deltaX > 80
              ? (t_zoom_unscale(),
                t_zoom_showSlide("prev"),
                t_zoom_checkForScale())
              : t_zoom_showSlide();
        }
      }));
  }
}
function t_zoom__initEventsonMobile() {
  if (window.isMobile) {
    t_zoom_setHideControlsTimer();
    var modal = document.querySelector(".t-zoomer__wrapper"),
      modalListeners = ["touchstart", "touchmove", "touchend", "mousemove"];
    Array.prototype.forEach.call(modalListeners, function (listener) {
      modal.addEventListener(listener, t_zoom_setHideControlsTimer);
    });
  }
}
function t_zoom__initSingleZoom() {
  var slidesCount;
  if (1 === document.querySelectorAll(".t-carousel__zoomer__item").length) {
    var controls = document.querySelectorAll(".t-carousel__zoomer__control");
    Array.prototype.forEach.call(controls, function (control) {
      control.style.display = "none";
    });
  }
}
function t_zoom__closeZoomOnKeyup() {
  "undefined" != typeof jQuery && $(document).unbind("keydown"),
    (document.onkeydown = null);
  var isPopupShown = !!document.querySelectorAll(".t-popup_show").length;
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        t_zoom__setEventOnBtn("prev");
        break;
      case 39:
        t_zoom__setEventOnBtn("next");
        break;
      case 27:
        t_zoom_close(),
          isPopupShown &&
            (document.onkeydown = function (e) {
              27 === e.keyCode && t_store_closePopup(!1);
            });
    }
  };
}
function t_zoom__setEventOnZoomerInner() {
  var carouselZooomerInner = document.querySelector(
    ".t-carousel__zoomer__inner"
  );
  carouselZooomerInner.addEventListener("click", function () {
    if (window.isMobile) return !1;
    carouselZooomerInner.classList.contains("scale-active")
      ? t_zoom_unscale()
      : t_zoom_close();
  });
}
function t_zoom__getEventOnBtn() {
  var navBtns = [
    { name: "right", move: "next" },
    { name: "left", move: "prev" },
  ];
  Array.prototype.forEach.call(navBtns, function (navBtn) {
    var arrowBtn;
    document
      .querySelector(".t-carousel__zoomer__control_" + navBtn.name)
      .addEventListener("click", function () {
        t_zoom__setEventOnBtn(navBtn.move);
      });
  });
}
function t_zoom__setEventOnBtn(btnMove) {
  var sliderTrack = document.querySelector(".t-carousel__zoomer__track"),
    modal = document.querySelector(".t-zoomer__wrapper"),
    sliderOnTransition = sliderTrack.getAttribute("data-on-transition"),
    modalOnDrag = modal.getAttribute("data-on-drag");
  "y" !== sliderOnTransition &&
    "y" !== modalOnDrag &&
    (t_zoom_unscale(),
    setTimeout(function () {
      t_zoom_showSlide(btnMove), t_zoom_checkForScale();
    }));
}
function t_zoom__addingImgsIntoCarousel(targetElement) {
  var parentBlock = targetElement.closest(".r"),
    images = parentBlock.querySelectorAll(
      ".t-zoomable:not(.t-slds__thumbs_gallery):not(.tn-atom__slds-img)"
    );
  if (parentBlock.querySelectorAll(".t-slds").length) {
    var slider = targetElement.closest(".t-slds");
    slider &&
      (images = slider.querySelectorAll(
        ".t-zoomable:not(.t-slds__thumbs_gallery)"
      ));
  }
  var sliderTrack = document.querySelector(".t-carousel__zoomer__track");
  Array.prototype.forEach.call(images, function (img) {
    var dataZoomAttr = img.getAttribute("data-img-zoom-url"),
      imgTitle = "",
      imgDescr = "",
      titleBody = "",
      descrBody = "",
      imgURLs = dataZoomAttr ? dataZoomAttr.split(",") : "";
    ("IMG" !== img.nodeName && "DIV" !== img.nodeName) ||
      ((imgTitle = img.getAttribute("title") || ""),
      (imgDescr = img.getAttribute("data-img-zoom-descr") || "")),
      imgTitle &&
        (titleBody =
          '<div class="t-zoomer__title t-name t-descr_xxs">' +
          imgTitle +
          "</div>"),
      imgDescr &&
        (descrBody =
          '<div class="t-zoomer__descr t-descr t-descr_xxs">' +
          imgDescr +
          "</div>"),
      sliderTrack.insertAdjacentHTML(
        "beforeend",
        '<div class="t-carousel__zoomer__item"><div class="t-carousel__zoomer__wrapper"><img class="t-carousel__zoomer__img" src="' +
          imgURLs +
          '"></div><div class="t-zoomer__comments">' +
          titleBody +
          descrBody +
          "</div></div>"
      );
  });
}
function t_zoom__createAndLoopSlider(targetElement) {
  var sliderTrack = document.querySelector(".t-carousel__zoomer__track"),
    modal = document.querySelector(".t-zoomer__wrapper"),
    slideItems = document.querySelectorAll(".t-carousel__zoomer__item"),
    maxCommentsHeight = 0;
  if (modal && slideItems.length) {
    var imageBordersWidth = modal.offsetHeight - slideItems.offsetHeight;
    Array.prototype.forEach.call(slideItems, function (slideItem) {
      var zoomerComments = slideItem.querySelectorAll(".t-zoomer__comments");
      Array.prototype.forEach.call(zoomerComments, function (comment) {
        var zoomerTitle = comment.querySelector(".t-zoomer__title"),
          zoomerDescr = comment.querySelector(".t-zoomer__descr");
        zoomerTitle || zoomerDescr || (comment.style.padding = 0);
        var commentHeight = comment.offsetHeight;
        (maxCommentsHeight =
          maxCommentsHeight > commentHeight
            ? maxCommentsHeight
            : commentHeight),
          (comment.style.height = maxCommentsHeight + "px");
      });
      var zoomedImages = slideItem.querySelectorAll(".t-carousel__zoomer__img");
      Array.prototype.forEach.call(zoomedImages, function (zoomedImg) {
        zoomedImg.style.maxHeight =
          "calc(100vh - " + (maxCommentsHeight + imageBordersWidth) + "px";
        var ZoomedImgSrc = zoomedImg.getAttribute("src");
        ZoomedImgSrc &&
          -1 !== ZoomedImgSrc.indexOf(".svg") &&
          (zoomedImg.style.width = window.innerWidth + "px");
      });
      var arrowWrappers = document.querySelectorAll(
        ".t-carousel__zoomer__arrow__wrapper"
      );
      Array.prototype.forEach.call(arrowWrappers, function (arrowWrapper) {
        arrowWrapper.style.top = "calc(50% - " + maxCommentsHeight / 2 + "px)";
      });
    });
    var targetURL = targetElement.getAttribute("data-img-zoom-url"),
      targetImg =
        !!targetURL &&
        document.querySelector(
          '.t-carousel__zoomer__img[src="' + targetURL + '"]'
        ),
      carouselItem =
        !!targetImg && targetImg.closest(".t-carousel__zoomer__item");
    Array.prototype.forEach.call(slideItems, function (slideItem, index) {
      slideItem.setAttribute("data-zoomer-slide-number", index);
    }),
      slideItems.length > 1 && t_zoom_loopSlider();
    var carouselPosLeft = !!carouselItem && carouselItem.offsetLeft;
    carouselItem &&
      (carouselItem.classList.add("active"),
      (sliderTrack.style.transition = "none"),
      (sliderTrack.style.transform = "translateX(" + -carouselPosLeft + "px)"),
      setTimeout(function () {
        sliderTrack.style.transition = "";
      }));
  }
}
function t_zoom_showSlide(direction) {
  var sliderTrack = document.querySelector(".t-carousel__zoomer__track"),
    slideItems = sliderTrack.querySelectorAll(".t-carousel__zoomer__item"),
    targetItem = sliderTrack.querySelector(".t-carousel__zoomer__item.active"),
    currentSlideIndex = 0;
  switch (
    (Array.prototype.forEach.call(slideItems, function (slideItem, index) {
      slideItem === targetItem && (currentSlideIndex = index);
    }),
    direction)
  ) {
    case "next":
      (currentSlideIndex = (currentSlideIndex + 1) % slideItems.length),
        sliderTrack.setAttribute("data-on-transition", "y");
      break;
    case "prev":
      (currentSlideIndex =
        (slideItems.length + (currentSlideIndex - 1)) % slideItems.length),
        sliderTrack.setAttribute("data-on-transition", "y");
  }
  var trackPosition = slideItems[currentSlideIndex].offsetLeft;
  targetItem.classList.remove("active"),
    slideItems[currentSlideIndex].classList.add("active"),
    (sliderTrack.style.transform = "translateX(" + -trackPosition + "px");
}
function t_zoom_transitForLoop(side) {
  var sliderTrack = document.querySelector(".t-carousel__zoomer__track"),
    slideItems = document.querySelectorAll(".t-carousel__zoomer__item"),
    currentSlideIndex,
    slideOffset;
  if (!side) return 1;
  "start" === side && (currentSlideIndex = slideItems.length - 2),
    "end" === side && (currentSlideIndex = 1),
    (slideOffset = slideItems[currentSlideIndex].offsetLeft),
    Array.prototype.forEach.call(slideItems, function (slideItem, index) {
      index === currentSlideIndex
        ? slideItem.classList.add("active")
        : slideItem.classList.remove("active");
    }),
    (sliderTrack.style.transition = "none"),
    (sliderTrack.style.transform = "translateX(" + -slideOffset + "px)"),
    setTimeout(function () {
      sliderTrack.style.transition = "";
    });
}
function t_zoom_loopSlider() {
  var sliderTrack = document.querySelector(".t-carousel__zoomer__track"),
    sliderItems = sliderTrack.querySelectorAll(".t-carousel__zoomer__item"),
    firstSlideCopy = sliderItems[0].cloneNode(!0),
    lastSlideCopy = sliderItems[sliderItems.length - 1].cloneNode(!0);
  firstSlideCopy.classList.remove("active"),
    lastSlideCopy.classList.remove("active"),
    sliderTrack.insertBefore(lastSlideCopy, sliderTrack.firstChild),
    sliderTrack.appendChild(firstSlideCopy);
  var slidesCount = (sliderItems = sliderTrack.querySelectorAll(
      ".t-carousel__zoomer__item"
    )).length,
    events = ["transitionend", "webkitTransitionEnd", "oTransitionEnd"];
  Array.prototype.forEach.call(events, function (event) {
    sliderTrack.addEventListener(event, function () {
      var currentSlideIndex = 0;
      Array.prototype.forEach.call(sliderItems, function (sliderItem, index) {
        sliderItem.classList.contains("active") && (currentSlideIndex = index);
      }),
        0 === currentSlideIndex && t_zoom_transitForLoop("start"),
        currentSlideIndex === slidesCount - 1 && t_zoom_transitForLoop("end"),
        sliderTrack.setAttribute("data-on-transition", "");
    });
  });
}
function t_zoom_initCloseSwipe() {
  var modal = document.querySelector(".t-zoomer__wrapper"),
    sliderTrack = document.querySelector(".t-carousel__zoomer__track"),
    isScaled = !1,
    modalPosition,
    hammer = new Hammer(modal, {
      domEvents: !0,
      inputClass: Hammer.TouchInput,
      cssProps: { touchCollout: "default" },
      recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]],
    });
  hammer.on("panstart", function () {
    (modalPosition = modal.offsetTop),
      (modal.style.position = "none"),
      (isScaled = t_zoom__isScaled(modal));
  }),
    hammer.on("panmove", function (event) {
      var deltaY = Math.abs(event.deltaY);
      if (
        ("y" !== sliderTrack.getAttribute("data-on-drag") ||
          "y" === modal.getAttribute("data-on-drag")) &&
        ((event.angle > -120 && event.angle < -60) ||
          (event.angle < 120 && event.angle > 60)) &&
        1 === event.maxPointers &&
        !isScaled
      ) {
        deltaY > 40 && modal.setAttribute("data-on-drag", "y");
        var newTrackPosition = modalPosition + event.deltaY;
        modal.style.transform = "translateY(" + newTrackPosition + "px)";
      }
    }),
    hammer.on("panend", t_zoom_closeSwipeHandler);
}
function t_zoom_closeSwipeHandler(event) {
  var modal = document.querySelector(".t-zoomer__wrapper"),
    closeAnimationTime = 300,
    isScaled = t_zoom__isScaled(modal);
  (modal.style.transition = "transform 300ms ease-out"),
    Math.abs(event.deltaY) < 40 && (modal.style.transform = ""),
    "y" !== modal.getAttribute("data-on-drag") ||
      1 !== event.maxPointers ||
      isScaled ||
      (event.deltaY < -200 || event.velocityY < -0.3
        ? ((modal.style.transform = "translateY(-100vh)"),
          setTimeout(function () {
            t_zoom_close(), (modal.style.transform = "");
          }, 300))
        : event.deltaY > 200 || event.velocityY > 0.3
        ? ((modal.style.transform = "translateY(100vh)"),
          setTimeout(function () {
            t_zoom_close(), (modal.style.transform = "");
          }, 300))
        : (modal.style.transform = "")),
    modal.setAttribute("data-on-drag", "");
}
function t_zoom_checkForScale() {
  var eventAdded = !1,
    zoomedImage = document.querySelector(
      ".t-carousel__zoomer__item.active .t-carousel__zoomer__img:not(.loaded)"
    ),
    windowWidth = window.innerWidth,
    windowHeight = window.innerHeight;
  if (
    zoomedImage &&
    ((zoomedImage.onload = function () {
      if (!eventAdded)
        return windowHeight < zoomedImage.naturalHeight ||
          windowWidth < zoomedImage.naturalWidth
          ? (zoomedImage.classList.add("loaded"),
            window.isDoubletapScaleAdded || t_zoom_doubletapScaleInit(),
            void t_zoom_scale_init())
          : void 0;
    }),
    zoomedImage.complete && !eventAdded)
  ) {
    if (
      ((eventAdded = !0),
      windowHeight < zoomedImage.naturalHeight ||
        windowWidth < zoomedImage.naturalWidth)
    )
      return (
        window.isDoubletapScaleAdded || t_zoom_doubletapScaleInit(),
        void t_zoom_scale_init()
      );
    document.querySelector(".t-zoomer__scale").style.display = "";
  }
}
function t_zoom_scale_init() {
  var zoomerWrapper = document.querySelector(".t-zoomer__wrapper"),
    zoomerScale = document.querySelector(".t-zoomer__scale");
  (zoomerScale.style.display = "block"),
    "y" !== zoomerScale.getAttribute("data-zoom-scale-init") &&
      (zoomerScale.setAttribute("data-zoom-scale-init", "y"),
      zoomerWrapper.addEventListener(
        "click",
        function (e) {
          for (
            var zoomedImage = document.querySelector(
                ".t-carousel__zoomer__item.active .t-carousel__zoomer__img"
              ),
              zoomerTrack = document.querySelector(
                ".t-carousel__zoomer__track"
              ),
              zoomerInner = document.querySelector(
                ".t-carousel__zoomer__inner"
              ),
              target = e.target;
            target && target != this;
            target = target.parentNode
          )
            if (target === zoomerScale) {
              zoomerTrack.setAttribute("data-on-transition", ""),
                (zoomerTrack.style.transition = "none"),
                (zoomerTrack.style.transform = "none"),
                (zoomedImage.style.maxHeight = ""),
                zoomerWrapper.classList.contains("scale-active")
                  ? t_zoom_unscale()
                  : (zoomerWrapper.classList.add("scale-active"),
                    zoomerInner.classList.add("scale-active"),
                    window.isMobile
                      ? t_zoom_mobileZoomPositioningInit(zoomedImage)
                      : t_zoom_desktopZoomPositioningInit(zoomedImage, e));
              break;
            }
        },
        !1
      ));
}
function t_zoom_doubletapScaleInit() {
  window.isDoubletapScaleAdded = !0;
  var zoomerWrapper = document.querySelector(".t-zoomer__wrapper"),
    hammer;
  new Hammer(zoomerWrapper, {
    domEvents: !0,
    inputClass: Hammer.TouchInput,
    cssProps: { touchCollout: "default" },
    recognizers: [[Hammer.Tap]],
  }).on("tap", function (e) {
    if (
      2 === e.tapCount &&
      document.body.classList.contains("t-zoomer__show") &&
      !e.target.closest(".t-carousel__zoomer__control")
    ) {
      var zoomedImage = document.querySelector(
          ".t-carousel__zoomer__item.active .t-carousel__zoomer__img"
        ),
        zoomerInner = document.querySelector(".t-carousel__zoomer__inner"),
        zoomerTrack = document.querySelector(".t-carousel__zoomer__track");
      (zoomedImage.style.maxHeight = ""),
        (zoomerTrack.style.transition = "none"),
        (zoomerTrack.style.transform = "none"),
        zoomerWrapper.classList.contains("scale-active")
          ? t_zoom_unscale()
          : (zoomerWrapper.classList.add("scale-active"),
            zoomerInner.classList.add("scale-active"),
            t_zoom_mobileZoomPositioningInit(zoomedImage));
    }
  });
}
function t_zoom_desktopZoomPositioningInit(zoomedImage, event) {
  var leftCoord = (window.innerWidth - zoomedImage.offsetWidth) / 2,
    topCoord = (window.innerHeight - zoomedImage.offsetHeight) / 2,
    clientYpercent,
    imageYpx,
    clientXpercent,
    imageXpx;
  function imageMoveWidth(e, img) {
    (clientXpercent =
      (100 * (void 0 !== e.touches ? e.touches[0].clientX : e.clientX)) /
      window.innerWidth),
      (imageXpx =
        (-clientXpercent * (img.offsetWidth - window.innerWidth)) / 100),
      (img.style.left = imageXpx + "px");
  }
  function imageMoveHeight(e, img) {
    (clientYpercent =
      (100 * (void 0 !== e.touches ? e.touches[0].clientY : e.clientY)) /
      window.innerHeight),
      (imageYpx =
        (-clientYpercent * (img.offsetHeight - window.innerHeight)) / 100),
      (img.style.top = imageYpx + "px");
  }
  (zoomedImage.style.left = leftCoord + "px"),
    (zoomedImage.style.top = topCoord + "px"),
    window.innerWidth < zoomedImage.naturalWidth &&
    window.innerHeight < zoomedImage.naturalHeight
      ? ((clientXpercent = (100 * event.clientX) / window.innerWidth),
        (imageXpx =
          (-clientXpercent * (zoomedImage.offsetWidth - window.innerWidth)) /
          100),
        (clientYpercent = (100 * event.clientY) / window.innerHeight),
        (imageYpx =
          (-clientYpercent * (zoomedImage.offsetHeight - window.innerHeight)) /
          100),
        (zoomedImage.style.left = imageXpx + "px"),
        (zoomedImage.style.top = imageYpx + "px"),
        window.isMobile
          ? (zoomedImage.ontouchmove = function (e) {
              imageMoveWidth(e, zoomedImage), imageMoveHeight(e, zoomedImage);
            })
          : (zoomedImage.onmousemove = function (e) {
              imageMoveWidth(e, zoomedImage), imageMoveHeight(e, zoomedImage);
            }))
      : window.innerWidth < zoomedImage.naturalWidth
      ? ((clientXpercent = (100 * event.clientX) / window.innerWidth),
        (imageXpx =
          (-clientXpercent * (zoomedImage.offsetWidth - window.innerWidth)) /
          100),
        (zoomedImage.style.left = imageXpx + "px"),
        window.isMobile
          ? (zoomedImage.ontouchmove = function (e) {
              imageMoveWidth(e, zoomedImage);
            })
          : (zoomedImage.onmousemove = function (e) {
              imageMoveWidth(e, zoomedImage);
            }))
      : window.innerHeight < zoomedImage.naturalHeight &&
        ((clientYpercent = (100 * event.clientY) / window.innerHeight),
        (imageYpx =
          (-clientYpercent * (zoomedImage.offsetHeight - window.innerHeight)) /
          100),
        (zoomedImage.style.top = imageYpx + "px"),
        window.isMobile
          ? (zoomedImage.ontouchmove = function (e) {
              imageMoveHeight(e, zoomedImage);
            })
          : (zoomedImage.onmousemove = function (e) {
              imageMoveHeight(e, zoomedImage);
            }));
}
function t_zoom_mobileZoomPositioningInit(zoomedImage) {
  var leftCoordinate = (window.innerWidth - zoomedImage.offsetWidth) / 2,
    topCoordinate = (window.innerHeight - zoomedImage.offsetHeight) / 2;
  (zoomedImage.style.left = leftCoordinate + "px"),
    (zoomedImage.style.top = topCoordinate + "px");
  var currentPosition = { x: 0, y: 0 },
    startTouchPosition = {},
    currentTranslate = {};
  (zoomedImage.ontouchstart = function (e) {
    startTouchPosition = t_zoom_getTouchEventXY(e);
  }),
    (zoomedImage.ontouchmove = function (e) {
      var currentTouchPosition = t_zoom_getTouchEventXY(e),
        moveVelocity = 1.5,
        imageOffsetX = 1.5 * (currentTouchPosition.x - startTouchPosition.x),
        imageOffsetY = 1.5 * (currentTouchPosition.y - startTouchPosition.y);
      (currentTranslate.x = currentPosition.x + imageOffsetX),
        (currentTranslate.y = currentPosition.y + imageOffsetY),
        currentTranslate.x > -leftCoordinate &&
          (currentTranslate.x = -leftCoordinate),
        currentTranslate.x < leftCoordinate &&
          (currentTranslate.x = leftCoordinate),
        currentTranslate.y > -topCoordinate &&
          (currentTranslate.y = -topCoordinate),
        currentTranslate.y < topCoordinate &&
          (currentTranslate.y = topCoordinate),
        (zoomedImage.style.transform =
          "translate(" +
          currentTranslate.x +
          "px, " +
          currentTranslate.y +
          "px)");
    }),
    (zoomedImage.ontouchend = function () {
      (currentPosition.x = currentTranslate.x),
        (currentPosition.y = currentTranslate.y);
    }),
    (zoomedImage.ontouchcancel = function () {
      (currentPosition.x = currentTranslate.x),
        (currentPosition.y = currentTranslate.y);
    });
}
function t_zoom_getTouchEventXY(event) {
  var coordinates = { x: 0, y: 0 };
  if (
    "touchstart" == event.type ||
    "touchmove" == event.type ||
    "touchend" == event.type ||
    "touchcancel" == event.type
  ) {
    var touch = event.touches[0] || event.changedTouches[0];
    (coordinates.x = touch.pageX), (coordinates.y = touch.pageY);
  }
  return coordinates;
}
function t_zoom_close() {
  t_zoom_unscale(),
    document.body.classList.remove("t-zoomer__show", "t-zoomer__show_fixed"),
    (document.onkeydown = null),
    t_zoom_unlockScroll();
}
function t_zoom_unscale() {
  var scaledZoomerWrappers = document.querySelectorAll(
    ".t-zoomer__wrapper.scale-active, .t-carousel__zoomer__inner"
  );
  Array.prototype.forEach.call(scaledZoomerWrappers, function (wrapper) {
    wrapper.classList.remove("scale-active");
  });
  var zoomedItem = document.querySelector(".t-carousel__zoomer__item.active"),
    zoomerTrack = document.querySelector(".t-carousel__zoomer__track"),
    modal = document.querySelector(".t-zoomer__wrapper");
  if (zoomedItem) {
    var zoomedImages = document.querySelectorAll(".t-carousel__zoomer__img"),
      zoomerComments = zoomedItem.querySelector(".t-zoomer__comments");
    zoomerComments &&
      modal &&
      Array.prototype.forEach.call(zoomedImages, function (zoomedImage) {
        var imageBordersWidth = modal.offsetHeight - zoomedItem.offsetHeight,
          height = zoomerComments.offsetHeight;
        (zoomedImage.onmousemove = null),
          (zoomedImage.ontouchmove = null),
          (zoomedImage.style.transform = ""),
          (zoomedImage.style.left = ""),
          (zoomedImage.style.top = ""),
          (zoomedImage.style.maxHeight =
            "calc(100vh - " + (imageBordersWidth + height) + "px)");
      });
  }
  if (void 0 !== zoomedItem.offsetLeft && void 0 !== zoomedItem.offsetTop) {
    var trackPosition = zoomedItem.offsetLeft;
    zoomerTrack.style.transform = "translateX(" + -trackPosition + "px)";
  }
  setTimeout(function () {
    zoomerTrack.style.transition = "";
  });
}
function t_zoom_lockScroll() {
  var isAndroid = /(android)/i.test(navigator.userAgent);
  if (
    ((window.isiOS && !window.MSStream) || isAndroid) &&
    ((window.isiOSVersion && window.isiOSVersion) || isAndroid) &&
    (11 === window.isiOSVersion[0] || isAndroid) &&
    !document.body.classList.contains("t-body_scroll-locked")
  ) {
    var bodyScrollTop =
      void 0 !== window.pageYOffset
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;
    document.body.classList.add("t-body_scroll-locked"),
      (document.body.style.top = "-" + bodyScrollTop + "px"),
      document.body.setAttribute("data-popup-scrolltop", bodyScrollTop);
  }
}
function t_zoom_unlockScroll() {
  var isAndroid = /(android)/i.test(navigator.userAgent);
  if (
    ((window.isiOS && !window.MSStream) || isAndroid) &&
    ((window.isiOSVersion && window.isiOSVersion) || isAndroid) &&
    (11 === window.isiOSVersion[0] || isAndroid) &&
    document.body.classList.contains("t-body_scroll-locked")
  ) {
    var bodyScrollTop = document.body.getAttribute("data-popup-scrolltop");
    document.body.classList.remove("t-body_scroll-locked"),
      (document.body.style.top = ""),
      document.body.removeAttribute("data-popup-scrolltop"),
      window.scrollTo(0, bodyScrollTop);
  }
}
function t_zoom_initResizeListener() {
  var debouncedResizeHandler = t_throttle(t_zoom_resizeHandler, 300);
  window.addEventListener("resize", debouncedResizeHandler);
}
function t_zoom_resizeHandler() {
  var sliderTrack = document.querySelector(".t-carousel__zoomer__track"),
    activeSlidePosition = sliderTrack.querySelector(
      ".t-carousel__zoomer__item.active"
    ).offsetLeft;
  sliderTrack.style.transform = "translateX(" + -activeSlidePosition + "px)";
}
function t_zoom_onFuncLoad(funcName, okFunc, time) {
  "function" == typeof window[funcName]
    ? okFunc()
    : setTimeout(function checkFuncExist() {
        if ("function" != typeof window[funcName]) {
          if (
            "complete" === document.readyState &&
            "function" != typeof window[funcName]
          )
            throw new Error(funcName + " is undefined");
          setTimeout(checkFuncExist, time || 100);
        } else okFunc();
      });
}
function t_zoom_setModalColor(parent) {
  var COLOR_WHITE = "#ffffff",
    COLOR_BLACK = "#000000",
    bgColor = parent.getAttribute("data-bg-color"),
    parentBGColor = bgColor || "#ffffff";
  parentBGColor = t_zoom_hexToRgb(parentBGColor);
  var modalContainer = document.querySelector(".t-zoomer__container"),
    modalSvg = document.querySelectorAll(".t-zoomer__wrapper svg"),
    controlsBG = document.querySelectorAll(
      ".t-zoomer__close, .t-zoomer__scale"
    ),
    arrowsWrapper = modalContainer.querySelectorAll(
      ".t-carousel__zoomer__arrow__wrapper"
    ),
    modalTextColor,
    controlsBGColor,
    titleAndDescr = document.querySelectorAll(
      ".t-zoomer__title, .t-zoomer__descr"
    ),
    modalBGColor =
      "black" === t_zoom_luma_rgb(parentBGColor) ? "#000000" : "#ffffff";
  "#000000" === modalBGColor
    ? ((modalTextColor = "#ffffff"),
      (controlsBGColor = "rgba(1, 1, 1, 0.3)"),
      Array.prototype.forEach.call(arrowsWrapper, function (arrow) {
        arrow.classList.add("t-carousel__zoomer__arrow__wrapper_dark");
      }))
    : ((modalTextColor = "#000000"),
      (controlsBGColor = "rgba(255, 255, 255, 0.3)"),
      Array.prototype.forEach.call(arrowsWrapper, function (arrow) {
        arrow.classList.remove("t-carousel__zoomer__arrow__wrapper_dark");
      })),
    Array.prototype.forEach.call(controlsBG, function (controlBg) {
      controlBg.style.background = controlsBGColor;
    }),
    (modalContainer.style.backgroundColor = modalBGColor),
    (modalContainer.style.color = modalTextColor),
    Array.prototype.forEach.call(modalSvg, function (svg) {
      "none" === svg.getAttribute("fill")
        ? svg.setAttribute("fill", "none")
        : svg.setAttribute("fill", modalTextColor);
      var modalPath = svg.querySelectorAll("path");
      modalPath.length > 0 &&
        Array.prototype.forEach.call(modalPath, function (path) {
          path.getAttribute("stroke") &&
            path.setAttribute("stroke", modalTextColor),
            path.getAttribute("fill") &&
              path.setAttribute("fill", modalTextColor);
        });
    }),
    Array.prototype.forEach.call(titleAndDescr, function (el) {
      el.style.color = modalTextColor;
    });
}
function t_zoom_luma_rgb(color) {
  var isArray = Array.isArray(color);
  if (void 0 === color) return "black";
  if (0 !== color.indexOf("rgb") && !isArray) return "black";
  var rgb = isArray ? color : color.split("(")[1].split(")")[0].split(",");
  return rgb.length < 3
    ? "black"
    : 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2] < 128
    ? "black"
    : "white";
}
function t_zoom_hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
    aaa = result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  return result ? [aaa.r, aaa.g, aaa.b] : null;
}
function t_zoom_setHideControlsTimer() {
  var controls = document.querySelectorAll(
    ".t-carousel__zoomer__arrow__wrapper, .t-zoomer__scale"
  );
  Array.prototype.forEach.call(controls, function (control) {
    control.classList.remove("t-zoomer__hide-animation");
  }),
    setTimeout(function () {
      Array.prototype.forEach.call(controls, function (control) {
        control.classList.add("t-zoomer__hide-animation");
      });
    });
}
function t_zoom__isScaled(modal) {
  return (
    (window.visualViewport && 1 !== window.visualViewport.scale) ||
    modal.classList.contains("scale-active")
  );
}
"loading" !== document.readyState
  ? window.tzoominited || t_zoom_onFuncLoad("t_initZoom", t_initZoom)
  : document.addEventListener("DOMContentLoaded", function () {
      window.tzoominited || t_zoom_onFuncLoad("t_initZoom", t_initZoom);
    }),
  Element.prototype.matches ||
    (Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.oMatchesSelector),
  Element.prototype.closest ||
    (Element.prototype.closest = function (s) {
      for (var el = this; el && 1 === el.nodeType; ) {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
      }
      return null;
    });
