/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const studentList = document.querySelector(".student-list");
const linkList = document.querySelector(".link-list");

const listPerPage = 9;

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

   let startIndex = (page * listPerPage ) - listPerPage;
   let endIndex = (page * listPerPage) - 1 ; 
   studentList.innerHTML = "";


   //generates students by looping through given data.
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
   const numberOfpagination = Math.ceil(list.length/listPerPage);
   let paginationButtons = "";
   linkList.innerHTML = "";
  
   for(let i = 1; i <= numberOfpagination; i++) {
       paginationButtons += `<li> <button type="button">${i}</button> </li>`;
   }
  
   // appends generated list in a preceeding order.
   linkList.insertAdjacentHTML('beforeend', paginationButtons);

   //selects first list - applies the class "active".
   let paginationButton = document.querySelectorAll("li > button");
   paginationButton[0].className = "active";


   // generates the a new list whenever a button is trickered.
   linkList.addEventListener("click", (event)=> {
      
      let eventTarget = event.target;
      // checks the condition,then genarates studentlist.
      if (eventTarget.tagName === 'BUTTON') {
         showPage(data, eventTarget.textContent);
      }
      // removes all pre-existing "active" classes.
      for(let i = 0; i < paginationButton.length; i++) {
         paginationButton[i].classList.remove("active");
      }
     
      // applies active class to the spacified target.
      eventTarget.className = "active";
   });
 
}

/* 
   selects both searchi icon and input.
*/
const SearchIcon = document.querySelector(".student-search");
const valueInput = SearchIcon.querySelector("#search");
let inputSearch = [];


// filters data according to the UserInput.
const filterdata =  (list, input)=> {
   // checks the userInput and filters list according given data.
   if (valueInput.value.length !== 0) {
      for(let i = 0; i < list.length; i++)
      {
         let studentData = list[i];
         let studentNames = studentData.name.last + " "+ studentData.name.first;

         let firstAndLast = studentNames.toLowerCase();
         let userInput = input.toLowerCase();

         if( firstAndLast.includes(userInput) )
         {
            inputSearch.push(studentData);
         } 
      }

      // generates new list and pagination.
      showPage(inputSearch,1);
      addPagination(inputSearch);
     
   }
      
      // Call functions
      // studentList.innerHTML = `<p class = "no-results">No Results, found </p> `;
      // linkList.innerHTML = "";
     
   
}


// calls filter funtion on keyup event
SearchIcon.addEventListener('keyup', ()=> {
   filterdata(data, valueInput.value);
   // addPagination(data);

});

// calls filter funtion on click event
SearchIcon.addEventListener("click", (e)=> {
   e.preventDefault();
   filterdata(data, valueInput.value);
})





// Call functions
showPage(data,1);
addPagination(data);









