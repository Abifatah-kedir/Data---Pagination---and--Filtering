/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const studentList = document.querySelector(".student-list");
const listPerPage = 8;

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


 /*
      Dynamic Search Bar
   */
  const theHeader = document.querySelector(".header");
  const searchBar = `<label for="search" class="student-search">
                       <input id="search" placeholder="Search by name...">
                       
                       <button type="button">
                          <img src="img/icn-search.svg" alt = "Search icon">
                       </button>
  
                    </label>`;  
  theHeader.insertAdjacentHTML(`beforeend`, searchBar);

/*
   Create the `showPage` function
   This function will create and insert/append the elements needed to display a "page" of nine students
*/

const showPage = (list, page)=> {

   let startIndex = (page * listPerPage) - listPerPage;
   let endIndex = page * listPerPage; 
   studentList.innerHTML = "";
  
  
   for(let i = 0; i < list.length; i++) {
      if( i >= startIndex && i <= endIndex) {
         let studentData = list[i];
         let listElements = `<li class="student-item cf">
                                 <div class="student-details">
                                    <img class="avatar" src="${studentData.picture.large}" alt="Profile Picture">
                                    <h3>${studentData.name.last}  ${studentData.name.first}</h3>
                                    <span class="email">${studentData.email}</span>
                                 </div>
                                 <div class="joined-details">
                                    <span class="date">Joined ${studentData.registered.date}</span>
                                 </div>
                              </li>`;

         studentList.insertAdjacentHTML('beforeend',listElements);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const addPagination = (list)=> {
   const numberOfpagination = Math.floor(list.length/listPerPage);
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = "";
   let paginationButtons = "";

   for(let i = 1; i <= numberOfpagination; i++) {
       paginationButtons += `<li> <button type="button">${i}</button> </li>`;
   }
   linkList.insertAdjacentHTML('beforeend', paginationButtons);
   // const firstPagination = linkList.firstElementChild.firstElementChild;
 
   let paginationButton = document.querySelectorAll("li > button");
   paginationButton[0].className = "active";

   linkList.addEventListener("click", (event)=> {
      let eventTarget = event.target;
      if (eventTarget.tagName === 'BUTTON') {
         eventTarget.className = "active";
         showPage(data, eventTarget.textContent);
      }
      for(let i = 0; i < paginationButton.length; i++) {
         paginationButton[i].classList.remove("active");
      }
   });
}

const SearchIcon = document.querySelector(".student-search");
const valueInput = SearchIcon.querySelector("#search");
let inputSearch = [];

const  filterdata =  (list, input)=> {

   for(let i = 0; i < list.length; i++)
   {
      let studentlist = list[i];
      let studentNames = studentlist.name.last + " "+ studentlist.name.first;
      let firstAndLast = studentNames.toLowerCase();
      let userInput = input.toLowerCase();
      if(firstAndLast.includes(userInput) )
      {
         inputSearch.push(studentlist);
         showPage(inputSearch,1);
         addPagination(inputSearch);  
      }
   }
}


SearchIcon.addEventListener('keyup', ()=> {
   filterdata(data, valueInput.value);
});

// Call functions
showPage(data,1);
addPagination(data);












