// ONLOAD FUNCTION
((element) => {
  "undefined" == typeof module
    ? (this.charming = element)
    : (module.exports = element);
})((element, n = {}) => {
  const tagName = n.tagName || "span";
  const prefix = null != n.classPrefix ? n.classPrefix : "char";
  let val = 1;
  const func1 = (element) => {
    let length = element.nodeValue.length;
    let value = -1;
    for (; ++value < length; ) {
      const doc = document.createElement(tagName);
      prefix && ((doc.className = prefix + val), val++),
        doc.appendChild(document.createTextNode(element.nodeValue[value])),
        element.parentNode.insertBefore(doc, element);
    }
    element.parentNode.removeChild(element);
  };
  return (
    (func2 = (element) => {
      const nodes = [].slice.call(element.childNodes);
      let val = -1;
      for (; ++val < nodes.length; ) {
        func2(nodes[val]);
      }
      element.nodeType === Node.TEXT_NODE && func1(element);
    })(element),
    element
  );
});
// ONLOAD FUNCTION

// SLIDESHOW START
class Slideshow {
  constructor(element) {
    this.DOM = { element: element };

    this.config = {
      slideshow: {
        delay: 3000,
        pagination: {
          duration: 3,
        },
      },
    };

    this.initSlideshow();
  }

  initSlideshow() {
    const self = this;

    this.DOM.slideTitle = this.DOM.element.querySelectorAll(".slide-title");
    this.DOM.slideTitle.forEach((slideTitle) => charming(slideTitle));

    this.slideshow = new Swiper(this.DOM.element, {
      loop: true,
      autoplay: {
        delay: this.config.slideshow.delay,
        disableOnInteraction: false,
      },
      speed: 500,
      preloadImages: true,
      updateOnImagesReady: true,
      pagination: {
        el: ".slideshow-pagination",
        clickable: true,
        bulletClass: "slideshow-pagination-item",
        bulletActiveClass: "active",
        clickableClass: "slideshow-pagination-clickable",
        modifierClass: "slideshow-pagination-",
        renderBullet: (index) => {
          const slideIndex = index;
          const number = index <= 8 ? "0" + (slideIndex + 1) : slideIndex + 1;
          let paginationItem = '<span class="slideshow-pagination-item">';
          paginationItem +=
            '<span class="pagination-number">' + number + "</span>";
          paginationItem =
            index <= 8
              ? paginationItem +
                '<span class="pagination-separator"><span class="pagination-separator-loader"></span></span>'
              : paginationItem;
          paginationItem += "</span>";

          return paginationItem;
        },
      },

      navigation: {
        nextEl: ".slideshow-navigation-button.next",
        prevEl: ".slideshow-navigation-button.prev",
      },

      scrollbar: {
        el: ".swiper-scrollbar",
      },

      on: {
        init: () => self.animate("next"),
      },
    });

    this.initEvents();
  }

  initEvents() {
    this.slideshow.on("paginationUpdate", (swiper, paginationEl) =>
      this.animatePagination(swiper, paginationEl)
    );
    this.slideshow.on("slideNextTransitionStart", () => this.animate("next"));
    this.slideshow.on("slidePrevTransitionStart", () => this.animate("prev"));
  }

  animate(direction = "next") {
    (this.DOM.activeSlide = this.DOM.element.querySelector(
      ".swiper-slide-active"
    )),
      (this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector(
        ".slide-image"
      )),
      (this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector(
        ".slide-title"
      )),
      (this.DOM.activeSlideTitleLetters = this.DOM.activeSlideTitle.querySelectorAll(
        "span"
      ));

    this.DOM.activeSlideTitleLetters =
      direction === "next"
        ? this.DOM.activeSlideTitleLetters
        : [].slice.call(this.DOM.activeSlideTitleLetters).reverse();

    this.DOM.oldSlide =
      direction === "next"
        ? this.DOM.element.querySelector(".swiper-slide-prev")
        : this.DOM.element.querySelector(".swiper-slide-next");

    if (this.DOM.oldSlide) {
      (this.DOM.oldSlideTitle = this.DOM.oldSlide.querySelector(
        ".slide-title"
      )),
        (this.DOM.oldSlideTitleLetters = this.DOM.oldSlideTitle.querySelectorAll(
          "span"
        ));

      this.DOM.oldSlideTitleLetters.forEach((letter, pos) => {
        TweenMax.to(letter, 0.3, {
          ease: Quart.easeIn,
          delay: (this.DOM.oldSlideTitleLetters.length - pos - 1) * 0.04,
          y: "50%",
          opacity: 0,
        });
      });
    }

    this.DOM.activeSlideTitleLetters.forEach((letter, pos) => {
      TweenMax.to(letter, 0.6, {
        ease: Back.easeOut,
        delay: pos * 0.05,
        startAt: { y: "50%", opacity: 0 },
        y: "0%",
        opacity: 1,
      });
    });

    TweenMax.to(this.DOM.activeSlideImg, 1.5, {
      ease: Expo.easeOut,
      startAt: { x: direction === "next" ? 200 : -200 },
      x: 0,
    });
  }
  animatePagination(swiper, paginationEl) {
    this.DOM.paginationItemsLoader = paginationEl.querySelectorAll(
      ".pagination-separator-loader"
    );
    this.DOM.activePaginationItem = paginationEl.querySelector(
      ".slideshow-pagination-item.active"
    );
    this.DOM.activePaginationItemLoader = this.DOM.activePaginationItem.querySelector(
      ".pagination-separator-loader"
    );

    TweenMax.set(this.DOM.paginationItemsLoader, { scaleX: 0 });
    TweenMax.to(
      this.DOM.activePaginationItemLoader,
      this.config.slideshow.pagination.duration,
      {
        startAt: { scaleX: 0 },
        scaleX: 1,
      }
    );
  }
}

const slideshow = new Slideshow(document.querySelector(".slideshow"));
// SLIDESHOW END

// JUMPING FISH START
const movingFish$ = document.getElementById("movingFish");
const fish$ = document.getElementById("fish");

const main$ = document.getElementById("main");
main$.style.display = "none";
const footer$ = document.getElementById("footer");
footer$.style.display = "none";

const movingFish = new TimelineMax({ paused: true });

let jumping = false;

setTimeout(() => {
  if (!jumping) {
    movingFish.play(0);
    jumping = true;
  }
}, 300);

movingFish
  .from(fish$, {
    duration: 0,
    scale: 1,
  })
  .to(fish$, {
    duration: 0.4,
    scale: 1,
    rotation: -45,
    transformOrigin: "50% 24px",
    y: -140,
    ease: Back.easeIn,
  })
  .to(fish$, {
    duration: 0.7,
    scale: 1,
    rotation: -370,
    transformOrigin: "50% 24px",
  })
  .to(fish$, {
    duration: 0.2,
    scale: 1,
    rotation: -380,
    y: 0,
    transformOrigin: "50% 24px",
  })
  .to(fish$, {
    duration: 0.6,
    scale: 1,
    rotation: -360,
    y: 0,
    transformOrigin: "50% 24px",
    ease: Back.easeOut,
    onComplete: () => {
      jumping = false;
      movingFish$.style.display = "none";
      main$.style.display = "block";
      footer$.style.display = "flex";
    },
  });
// JUMPING FISH END

// PANELS START
const panel1$ = document.getElementById("panel1");
const panel1_description$ = document.getElementById("panel1_description");
const panel2$ = document.getElementById("panel2");
const panel2_description$ = document.getElementById("panel2_description");

panel1$.addEventListener(
  "mouseover",
  () => (panel1_description$.style.display = "block")
);
panel1$.addEventListener(
  "mouseout",
  () => (panel1_description$.style.display = "none")
);
panel2$.addEventListener(
  "mouseover",
  () => (panel2_description$.style.display = "block")
);
panel2$.addEventListener(
  "mouseout",
  () => (panel2_description$.style.display = "none")
);
// PANELS END

// QUIZ START
const inputs = document.getElementsByTagName("input");
const questions = document.getElementsByTagName("section");
const selectedQuestion = document.getElementsByClassName("current");
const nextButton = document.getElementById("nextButton");

const answersArray = () => {
  const answers = [];
  const correctAnswers = [
    "1807",
    "fedorovsky",
    "1920",
    "museum2",
    "scientists",
    "slobidska",
    "karazina",
    "history",
    "15",
    "yes",
  ];

  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      answers.push(inputs[i].value);
    }
  }

  let correctCount = 0;
  for (i = 0; i < answers.length; i++) {
    if (answers[i] === correctAnswers[i]) {
      correctCount++;
    }
  }

  alert("Ви правильно відповіли на " + correctCount + " питань з 10!");
  return answers;
};

const hasClass = (elem, klass) =>
  (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;

let i = 0;
const nextQuestion = () => {
  if (questions[i] === selectedQuestion[0]) {
    questions[i].className = "";
    questions[i + 1].className = "current";
    i++;
    return i;
  }
};

document.getElementById("submitAnswers").onclick = () => answersArray();

if (document.createElement("svg").getAttributeNS) {
  const radiobxsFill = Array.prototype.slice.call(
    document.querySelectorAll('#questionsList input[type="radio"]')
  );

  const pathDefs = {
    fill: [
      "M15.833,24.334c2.179-0.443,4.766-3.995,6.545-5.359 c1.76-1.35,4.144-3.732,6.256-4.339c-3.983,3.844-6.504,9.556-10.047,13.827c-2.325,2.802-5.387,6.153-6.068,9.866 c2.081-0.474,4.484-2.502,6.425-3.488c5.708-2.897,11.316-6.804,16.608-10.418c4.812-3.287,11.13-7.53,13.935-12.905 c-0.759,3.059-3.364,6.421-4.943,9.203c-2.728,4.806-6.064,8.417-9.781,12.446c-6.895,7.477-15.107,14.109-20.779,22.608 c3.515-0.784,7.103-2.996,10.263-4.628c6.455-3.335,12.235-8.381,17.684-13.15c5.495-4.81,10.848-9.68,15.866-14.988 c1.905-2.016,4.178-4.42,5.556-6.838c0.051,1.256-0.604,2.542-1.03,3.672c-1.424,3.767-3.011,7.432-4.723,11.076 c-2.772,5.904-6.312,11.342-9.921,16.763c-3.167,4.757-7.082,8.94-10.854,13.205c-2.456,2.777-4.876,5.977-7.627,8.448 c9.341-7.52,18.965-14.629,27.924-22.656c4.995-4.474,9.557-9.075,13.586-14.446c1.443-1.924,2.427-4.939,3.74-6.56 c-0.446,3.322-2.183,6.878-3.312,10.032c-2.261,6.309-5.352,12.53-8.418,18.482c-3.46,6.719-8.134,12.698-11.954,19.203 c-0.725,1.234-1.833,2.451-2.265,3.77c2.347-0.48,4.812-3.199,7.028-4.286c4.144-2.033,7.787-4.938,11.184-8.072 c3.142-2.9,5.344-6.758,7.925-10.141c1.483-1.944,3.306-4.056,4.341-6.283c0.041,1.102-0.507,2.345-0.876,3.388 c-1.456,4.114-3.369,8.184-5.059,12.212c-1.503,3.583-3.421,7.001-5.277,10.411c-0.967,1.775-2.471,3.528-3.287,5.298 c2.49-1.163,5.229-3.906,7.212-5.828c2.094-2.028,5.027-4.716,6.33-7.335c-0.256,1.47-2.07,3.577-3.02,4.809",
    ],
  };

  const animDefs = {
    fill: { speed: 0.8, easing: "ease-in-out" },
  };

  const createSVGEl = (def) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    if (def) {
      svg.setAttributeNS(null, "viewBox", def.viewBox);
      svg.setAttributeNS(null, "preserveAspectRatio", def.preserveAspectRatio);
    } else {
      svg.setAttributeNS(null, "viewBox", "0 0 100 100");
    }
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    return svg;
  };

  const controlRadiobox = (element, type) => {
    const svg = createSVGEl();
    element.parentNode.appendChild(svg);

    element.addEventListener("change", () => {
      resetRadio(element);
      draw(element, type);
    });
  };

  radiobxsFill.forEach((element) => controlRadiobox(element, "fill"));

  const draw = (element, type) => {
    let paths = [],
      pathDef,
      animDef,
      svg = element.parentNode.querySelector("svg");

    switch (type) {
      case "fill":
        pathDef = pathDefs.fill;
        animDef = animDefs.fill;
        break;
    }

    paths.push(document.createElementNS("http://www.w3.org/2000/svg", "path"));

    if (type === "cross" || type === "list") {
      paths.push(
        document.createElementNS("http://www.w3.org/2000/svg", "path")
      );
    }

    for (let i = 0; i < paths.length; ++i) {
      let path = paths[i];

      svg.appendChild(path);
      path.setAttributeNS(null, "d", pathDef[i]);

      let length = path.getTotalLength();
      path.style.strokeDasharray = length + " " + length;

      i === 0
        ? (path.style.strokeDashoffset = Math.floor(length) - 1)
        : (path.style.strokeDashoffset = length);

      path.getBoundingClientRect();

      path.style.transition = path.style.WebkitTransition = path.style.MozTransition =
        "stroke-dashoffset " +
        animDef.speed +
        "s " +
        animDef.easing +
        " " +
        i * animDef.speed +
        "s";

      path.style.strokeDashoffset = "0";
    }
  };

  const reset = (element) => {
    Array.prototype.slice
      .call(element.parentNode.querySelectorAll("svg > path"))
      .forEach((element) => element.parentNode.removeChild(element));
  };

  const resetRadio = (element) => {
    Array.prototype.slice
      .call(
        document.querySelectorAll(
          'input[type="radio"][name="' + element.getAttribute("name") + '"]'
        )
      )
      .forEach((element) => {
        const path = element.parentNode.querySelector("svg > path");
        if (path) {
          path.parentNode.removeChild(path);
        }
      });
  };
}
