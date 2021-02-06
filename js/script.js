/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
   Create the `showPage` function
   This function will create and insert/append the elements needed to display a "page" of nine students
*/

const showPage = (list, page)=> {
   let startIndex = (page * 8) - 8;
   let endIndex = page * 8; 

   const studentList = document.querySelector(".student-list");
   studentList.innerHTML = "";

   for(let i = 0; i < list.length; i++) {
      if( i >= startIndex && i <= endIndex) {

        let listElements = `<li class="student-item cf">
                                 <div class="student-details">
                                    <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                                    <h3>${list[i].name.last}  ${list[i].name.first}</h3>
                                    <span class="email">${list[i].email}</span>
                                 </div>
                                 <div class="joined-details">
                                    <span class="date">Joined ${list[i].registered.date}</span>
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
   const numberOfpagination = Math.ceil(list.length/9);

   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = "";

   for(let i = 1; i <= numberOfpagination; i++) {
      let paginationButtons = ` <li> <button type="button">${i}</button> </li> `;
      linkList.insertAdjacentHTML('beforeend', paginationButtons);
      
   }
   // const firstPagination = linkList.firstElementChild.firstElementChild;
 
   let paginationButton = document.querySelectorAll("button");
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

// Call functions
showPage(data,1);
addPagination(data);