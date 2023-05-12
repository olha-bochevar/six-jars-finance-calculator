// DOM
const navigation = document.querySelector("nav");
const sections = Array.from(document.querySelectorAll("section"));
// section Main
const btnStart = document.querySelector("#btn-start-calc");

// navigation

navigation.addEventListener("click", e => {
    if (e.target.tagName == "A") {
      Array.from(navigation.children).forEach(item =>
        item.classList.remove("active")
      );
      e.target.classList.add("active");
      let tab = e.target.getAttribute("href").slice(1);
      showSection(tab);
    }
  });
  const showSection = idSection => {
    
    Array.from(navigation.children).forEach(item => {
        item.classList.remove("active");
        if(item.getAttribute('href') == `#${idSection}`) {
            item.classList.add("active");
        }
    });
    sections.forEach(item => {
      item.classList.add("d-none");
      if (item.getAttribute("id") == idSection) {
        item.classList.remove("d-none");
      }
    });
  };

// show only first section in the beginning 
window.addEventListener("load", () => {
    // get all sections without first
    const sliced = sections.slice(1);
    // set all sections display: none
    sliced.forEach(item => item.classList.add("d-none"));
  });


/* btnStart.addEventListener("click", () => {
  showSection(btnBegin.getAttribute("data-target").slice(1));
}); */



// section Categories
const getCards = async (url) => {
    const cardDets = await getData(url);
    return cardDets;
};
// current card index
let cardIndex = 0;

// set buttons' condition
const setButtonsDisable = (data) => {
    const btnNext = document.querySelector("button.next");
    const btnPrev = document.querySelector("button.prev");
    if (cardIndex >= Array.from(data).length - 1) {
        btnNext.disabled = true;
        btnPrev.disabled = false;
      } else if (cardIndex <= 0) {
        btnPrev.disabled = true;
        btnNext.disabled = false;
      } else {
        btnPrev.disabled = false;
        btnNext.disabled = false;
      }
};



// create step dots for all categories in the json file
getCards(url).then(data => {
    
    createSteps(data);
    
}); 
 const createSteps = (data) => {
    const stepNavigation = document.querySelector(".categories__steps");
   
    const steps = Array.from(data);
        steps.forEach(() => {
          const step = document.createElement('span');
          stepNavigation.append(step); 
      });
    return steps;
 };

 const showStep = (index) => {
  const steps = document.querySelectorAll('.categories__steps span');
  steps.forEach(step => step.classList.remove("active"));
  steps[index].classList.add("active");

  // set needed card with clicking on step dot
  steps.forEach((step, idx) => {
    step.addEventListener("click", () => {
        // reset counter for carousel
      cardIndex = 0;
      showCard(idx);
    });
  });
  
}; 



// get data from json and show for each category
const updateCard = (data, index) => {
    // track current dot step
    showStep(index);

let cardContainer = document.querySelector(".card");
  let cardChart = document.querySelector(".categories__chart");
  let card = data[index];
  cardContainer.innerHTML = `
  <h4 class="card__title">${card.title}
    <span class="card__subtitle">(${card.id.toUpperCase()} - ${
    card.rate
  }%)</span>
  </h4>
  <p class="card__desc">${card.description}</p>
</div>
`;
  cardChart.style.background = `${card.image}`;
};

// onclick event for buttons
// show category card
const showCard = (index) => {
    cardIndex += index;
    
    getCards(url).then(data => {
      setButtonsDisable(data);
      updateCard(data, cardIndex);
      
    }); 
    
  };

  // show first category in section Category

showCard(cardIndex);


