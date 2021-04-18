/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
let navbarMenu = document.getElementById("navbar__list"); // nav ul
let sections = document.querySelectorAll("section"); // All section
let arrowTop = document.querySelector(".arrow-top"); // Arrow
/*Select arrow to top*/
/**
 * End Global Variables
 *
 * Start Helper Functions
 *
 */

function creatListItems() {
  for (section of sections) {
    let sectionName = section.getAttribute("data-nav"); // get attribute Data-nav  Section

    let txt_Node = document.createTextNode(sectionName); //Creat TextNode of  data_nav section

    let sectionId = section.getAttribute("id"); // get attribute id Section

    let attr = document.createAttribute("href"); // Create a href attribute

    let anchor = document.createElement("a"); // Creat anchor tag

    let listItems = document.createElement("li"); // Creat listItems

    anchor.appendChild(txt_Node); //add text node to anchor tag

    attr.value = `#${sectionId}`; //add value of the  href attribute

    anchor.setAttributeNode(attr); //add attribute href to anchor tag

    anchor.classList.add("menu__link"); // add class menu__link to anchor

    listItems.appendChild(anchor); // add anchor to li

    navbarMenu.appendChild(listItems); // Add anchor tag to li

    let anchorId = anchor.getAttribute("href"); // get attribute href Section

    /*
     *Event click with smooht scroll to sections
     */
    anchor.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth" });
      // console.log("anchor value  = " + sectionName);
      // console.log("anchor href = " + anchorId);
      // console.log("section id = " + sectionId);
    });
  }
}

// add  your-active-clas to current section and remove from others
function currenSection() {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    //Check if section in ViewPort
    if (rect.top >= 0 && rect.top <= 300) {
      sections.forEach((section) => {
        //check if section have a class active will remove
        if (section.classList.contains("your-active-class")) {
          section.classList.remove("your-active-class"); //remove class active if section out view Port
          // console.log("the class was removed!!");
        }
      });
      section.classList.add("your-active-class"); //add class active if section in view Port
      // console.log("the class was added!!");

      let links = document.querySelectorAll(".menu__link"); // nav ul li a
      links.forEach((link) => {
        if (section.getAttribute("data-nav") == link.textContent) {
          link.classList.add("active"); //add class active to list item
        } else {
          link.classList.remove("active"); //add class active to list item
        }
      });
    }
  });
}

/*
 * funcution Scroll Smooth
 */

function scrollSmooth() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
      // console.log(this.getAttribute("href"));
    });
  });
}

/*
 * function hide page header when stop scrolling 2second
 */
let hidePageHeader = function (callback) {
  //Check if call back Not a function not do things
  if (!callback || typeof callback !== "function") {
    return;
  }
  let scrolling; // variable scrollibg
  window.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(scrolling); // clear setTimeout
      document.querySelector(".page__header").classList.remove("hide"); //remove class hide
      Scrolling = setTimeout(() => {
        callback(); // revoke function callback
      }, 4000); // wait 4second to hide
    },
    false
  );
};

/*
 * check if page offset y >100
 *add class active to arrow top
 *remove class active to arrow top
 */
function checkWindowOffsetY() {
  //chek offsetY Of window
  if (window.pageYOffset > 100) {
    arrowTop.classList.add("show"); //add class show
    // console.log("Arrow Top Show")
  } else {
    arrowTop.classList.remove("show"); //remove class show
    // console.log("Arrow Top hidden")
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
creatListItems();
// Scroll to anchor ID using scrollTO event
document.addEventListener("scroll", currenSection);

//call back function scrollSmooth
scrollSmooth();

/**
 * End Main Functions
 * Begin Events
 *
 */

/*set arrow top show
 *call back function checkWindowOffsetY in event listner scroll of window
 */
document.addEventListener("scroll", checkWindowOffsetY);

/*
 * add event click to Arrow top
 */
arrowTop.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo(0, 0);
});

// call bak hidePageHeade
hidePageHeader(() => {
  document.querySelector(".page__header").classList.add("hide");
});
