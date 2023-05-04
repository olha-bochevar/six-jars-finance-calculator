// DOM
const btnBegin = document.querySelector("#btn-begin-calc");

// counter for active section
let counter = 0;

// show only first section 
const sections = Array.from(document.querySelectorAll('section'));
window.addEventListener('load', () => {
    
    // get all sections without first
    const sliced = sections.slice(1);
    // set all sections display: none
    sliced.forEach(item => item.classList.add('d-none'));
});

// add visibility for need section
const switchSections = counter => {
    sections.forEach(item => item.classList.add('d-none'));
    sections[counter].classList.remove('d-none');
};

btnBegin.addEventListener("click", () => {
    counter++;
    switchSections(counter);
});

// show section categories
getData(url).then(data => updateUI(data));

const updateUI = data => {

  const list = document.querySelector(".categories__list");
  let html = document.createElement("ul");
  //html.classList.add("categories__list", "list");

  const jars = Array.from(data);
  jars.forEach(jar => {
    html.innerHTML += `
            <li class="list__item item">
                <h4 class="item__title">${jar.title}
                  <span class="item__subtitle">(${jar.id.toUpperCase()} - ${jar.rate}%)</span>
                </h4>
                <p class="item__desc">${jar.description}</p>
            </li>
        `;
        list.append(html);
  });

  
};
