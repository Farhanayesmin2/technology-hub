


const loadCategories = async (dataLimit) => {

    const url = `https://openapi.programming-hero.com/api/ai/tools`;

    const res = await fetch(url);
    toggleSpinner(true);
    const data = await res.json();
    loadCategoriesDisplay(data.data.tools,dataLimit);
 
};


// accuracy added
const accuracyAdded = score => {
    let res = "";
    if (score > 0) {
        res += `<span id="accuracyBtn" class="badge main-btn p-2" style="position: absolute; right:10px; top:10px;">${100 * score}% accuracy</span>`;
    }
    return res;
}

  
   
const loadCategoriesDisplay = (categories, dataLimit) => {
    


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
toggleSpinner(false);
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
    displayModalItems(data.data);
    
   
};

const displayModalItems = (categoryDetails) => {
    console.log(categoryDetails);

 const modalBody = document.getElementById('modalDisplay');
  //  const modalTitle = document.getElementById('exampleModalLabel');
 
      modalBody.textContent ='';
    // categoryDetails.forEach(view => {
     // modalTitle.innerText=categoryDetails.description;
        const modalAdd = document.createElement('div');
       
    modalAdd.innerHTML = `
  
     
     
             <div class="grid gap-4 mx-auto  lg:grid-cols-2 "> <!-- Modal body  -->
    
                
                <div class="bg-red-50 border border-1 border-red-300  card w-[100%] bg-base-100 shadow-xl sm:mx-auto">

                    <div class="card-body"> <!-- Card body  -->
                        <h2 id="exampleModalLabel" class="card-title">${categoryDetails.description}</h2>
                        <!-- for right box -->
                        <div class="flex gap-2 mx-auto">
                            <div class="h-[100px] w-[132px] bg-gray-100 rounded-lg text-center py-5">
                                <span class="text-red-900 text-bold">

                               ${categoryDetails.pricing != null ? categoryDetails.pricing[0].price : "Free of Cost"}<br>
                                 ${categoryDetails.pricing != null ? categoryDetails.pricing[0].plan : "No Data"}
                                </span>
                            </div>
                            <div class="h-[100px] w-[132px]  bg-gray-100 rounded-lg text-center py-5 ">
                                <span class="text-red-900 text-bold">
                                   ${categoryDetails.pricing != null ? categoryDetails.pricing[1].price : "Free of Cost"} <br>
                                 ${categoryDetails.pricing != null ? categoryDetails.pricing[1].plan : "No Data"}
                                </span>
                            </div>
                            <div class="h-[100px] w-[132px]  bg-gray-100 rounded-lg text-center py-5">
                                <span class="text-red-900 text-bold">
                                   ${categoryDetails.pricing != null ? categoryDetails.pricing[2].price : "Free of Cost"} <br>
                                 ${categoryDetails.pricing != null ? categoryDetails.pricing[2].plan : "No Data"}
                                </span>
                            </div>
                        </div>
                        <!-- For feature and integration -->
                        <div class="flex gap-5 mx-auto">
    
                            <!-- features -->
                            <div class="px-3">
                                <h1>Features</h1>
                               <ol class="list-disc">        
                          <li>${categoryDetails.features[1] ?  categoryDetails.features[1]['feature_name'] : "" }
                          </li>
                          <li>${categoryDetails.features[2] ? categoryDetails.features[2]['feature_name'] : "" }
                          </li>
                          <li>${categoryDetails.features[3] ? categoryDetails.features[3]['feature_name'] : ""}
                          </li> 


                          <li>${categoryDetails.features[4]  ? categoryDetails.features[4]['feature_name'] : "No Data Found"}
                          </li> 
                          
                          </ol>

                            </div>

                            <!--integration  -->
                            <div>
                                <h1>Integration</h1>
                           <ol class="list-disc">     
                           ${categoryDetails.integrations != null ?  categoryDetails.integrations.map(item =>`<li>${item}</li>`).join('') : "No Data Found" }

                             
                           </ol>
                            </div>
    
                        </div> <!-- For feature and integration finish -->
    
                     </div> <!-- Card body  -->
              </div>

                  <!-- left card start -->
                   <div class="card w-[100%] bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="${categoryDetails.image_link[0]}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">
                        ${categoryDetails.input_output_examples === null ? "Can you give any example?" : categoryDetails.input_output_examples[0].input}
                        
                        
                        
                        </h2>
                        <p>  ${categoryDetails.input_output_examples === null ? "No! Not Yet! Take a break! Please!" : categoryDetails.input_output_examples[0].input}</p>
                    </div>
                   </div>
                    <!-- left card finish-->   
              
           </div>
    
   `;
        modalBody.appendChild(modalAdd);
       
       
           

  
}

// Toggle spinner function...
  const toggleSpinner = isLoading => {
  const loaderSpinner = document.getElementById('loader');

  if (isLoading) {
    loaderSpinner.classList.remove('hidden');
  }
  else {
    loaderSpinner.classList.add('hidden');
  }
}    