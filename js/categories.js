


const loadCategories = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;

    const res = await fetch(url);
    const data = await res.json();
    loadCategoriesDisplay(data.data.tools,dataLimit);

};




  
   
const loadCategoriesDisplay = (categories,dataLimit) => {
  // display 6 only 
    const showAll = document.getElementById('see-more');
    
    if (dataLimit && categories.length >6) {
             categories = categories.slice(0, 6);
    showAll.classList.remove('hidden');
  }
  else {
    showAll.classList.add('hidden');
 
    console.log(categories.length );
} 
    const postContainer = document.getElementById("post-categories");



    for (const category of categories) {



        const categoryDiv = document.createElement('div');
        //   categoryDiv.classList.add("col");
        categoryDiv.innerHTML = "";
        categoryDiv.innerHTML = `
<div class="shadow-lg shadow-gray-500 m-4">
        <div class="p-4  ">
            <div class="h-[100%] w-[100%] border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img class="rounded-lg md:h-36 w-full object-cover object-center" src=${category.image}
                    alt="blog">
                <div class="p-6 ">
                    <h2 class="tracking-widest text-lg title-font font-bold text-gray-800 mb-1">Features</h2>
                   <div id="featuresId " >
                   <ol class="list-decimal">        
    ${category.features.map(item => `<li>${item}</li>`).join('')}
   </ol>
                   </div>
                   <hr class="my-3 text-extra-bold" >
<div>
<h1 class="text-md  font-bold " >${category.name}</h1>
</div>


                    <div class="text-end ">
                   
                        <button onclick="loadModal('${category.id}')"   class="text-pink-500 inline-flex items-center md:mb-2 lg:mb-0 justify-items-end">
                        <label for="my-modal-3"><svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>  </label>
                  </button>
     
                    </div>
                                <i class="fa-solid fa-calendar-days"></i> <span>${category.published_in
            }</span>
                </div>
            </div>
        `;

        postContainer.appendChild(categoryDiv);

       // console.log(category);
    }  

};

  // display 6 only 
loadCategories(6);


// See more all categories
document.getElementById('see-more-btn').addEventListener('click', function () {

 const postContainer = document.getElementById("post-categories");
        //   categoryDiv.classList.add("col");
        postContainer.innerHTML = "";
    loadCategories();
})


// Modal display
const loadModal = async (category_id) => {
   
  const urlModal = `https://openapi.programming-hero.com/api/ai/tool/${category_id}`
  const res = await fetch(urlModal);
  const data = await res.json();
        displayModalItems(data);
   
};

const displayModalItems = (newsDetails) => {
   console.log(newsDetails);
    // const modalBody = document.getElementById('modalDisplay');
    // const modalTitle = document.getElementById('exampleModalLabel');
    // modalBody.textContent = '';
    // newsDetails.forEach(view => {
    //     modalTitle.innerText = "Hello";
    //     // console.log(view.title);
    //     const modal = document.createElement('div');
    //     modal.innerHTML = `
    //     <p1>Hello</p1>
    //        `;
    //     modalBody.appendChild(modal);
       
       
    //     // console.log(phone);
    //     
    // });
}
loadModal();