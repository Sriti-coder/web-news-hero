// connect html
const categoriesContainer = document.getElementById('categories-list');
const newsCountConatiner = document.getElementById('news-count-conatainer');
const newsConatiner = document.getElementById('news-container');
const modalContainer = document.getElementById('modal-container');
const spinner = document.getElementById('spinner');
// show news by category
const showNewsByCategories = (categoryId = '08', categoryName = 'All News') => {
  spinner.style.display = 'block';
  newsCountConatiner.innerText = 'Waiting....';
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayNewses(data, categoryName))
    .catch((error) => {
      console.error('Error:', error);
    });
}
// load categories List Data 
const categoriesNameLoad = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data))
    .catch((error) => {
      console.error('Error:', error);
    });
}
// Load News Load Data
const LoadNewsData = (news_id) => {

  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data[0]))
    .catch((error) => {
      console.error('Error:', error);
    });
}
// display specific news
const displayNews = (news) => {
  const { name, published_date, img } = news.author;
  const { title, details, thumbnail_url, total_view } = news;
  const { is_trending } = news.others_info;
  const { number } = news.rating;
  const rating = (number / 5) * 100;
  const ratingString = `${Math.round(rating / 10) * 10}%`;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  let pubDate = ``;
  if (published_date === null) {

  }
  else {
    let date = published_date.split(' ');
    let date2 = date[0].split('-');
    let monthName = monthNames[parseInt(date2[1])];
    pubDate = `${monthName} ${date2[2]}, ${date2[0]}`;
  }
  modalContainer.innerHTML = `<div class="modal-box ">
    <label for="my-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div class="card w-full bg-base-100  grid grid-cols-1 rounded-none mt-5">
      <div class="">
         <img src="${thumbnail_url ? thumbnail_url : ''}"class="py-4 pl-4 rounded-md h-72 w-full"/>
          </div>
          <div class="card-body ">
            <h2 class="card-title">
               ${title ? title : 'N/a'}
            </h2>
            <p class='bg-green-200 text-green-600 w-fit rounded font-semibold ${is_trending === true ? 'p-2' : ''}'>${is_trending === true ? 'Trending' : ''}</p>
            <p class="text-slate-500">
              ${details ? details : 'N/a'}
            </p>
            <div class="card-actions mt-2 flex justify-between items-center">
              <div class="author-details flex gap-4 items-center">
                <div>
                  <label
                    tabindex="0"
                    class="btn btn-ghost btn-circle avatar ">
                    <div class="w-10 rounded-full ">
                      <img src="${img ? img : 'N/a'}" />
                    </div>
                  </label>
                </div>
                <div class="info w-auto">
                  <h1 class="text-md font-semibold">${name ? name : 'N/a'}</h1>
                  <p class="text-slate-500">${published_date ? pubDate : 'N/a'}</p>
                </div>
              </div>
              <div class="views flex gap-2 items-center">
                <i class="fa-regular fa-eye"></i>
                <h1 class="text-xl font-bold">${total_view ? total_view : 'N/a'}</h1>
              </div>
              <div class="rating">
              <div class="stars-outer">
              <div class="stars-inner"  style="width:${ratingString ? ratingString : 'N/a'}"  ></div>
              </div>   
              </div>    
            </div>
          </div>
        </div>  
  </div>`;
}
// show all news data by category
const displayNewses = (newses, categoryName) => {
  spinner.style.display = 'none';
  newsConatiner.innerHTML = '';
  let newsesList = newses.data;
  newsesList = newsesList.sort((first, second) => {
    if (first.total_view < second.total_view) {
      return 1;

    }
    else {
      return -1;
    }
  })
  const newsCount = newsesList.length;
  if (newsCount > 0) {
    newsCountConatiner.innerText = `${newsCount} items found for category ${categoryName}`;
  } else {
    newsCountConatiner.innerText = `No items found for category ${categoryName}`;
  }
  newsesList.forEach(news => {
    const { name, published_date, img } = news.author;
    const { _id, title, details, thumbnail_url, total_view } = news;
    const { number } = news.rating;
    const rating = (number / 5) * 100;
    const ratingString = `${Math.round(rating / 10) * 10}%`;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let pubDate = ``;
    if (published_date !== null) {
       
      let date = published_date.split(' ');
      let date2 = date[0].split('-');
      let monthName = monthNames[parseInt(date2[1])];
      pubDate = `${monthName} ${date2[2]}, ${date2[0]}`;
    }
    let detailsArray = details.split(' ');
    let modifyDetails=''
    if (detailsArray.length > 60) {
      modifyDetails = detailsArray.slice(0, 60)
      modifyDetails = modifyDetails.join(' ');
    }
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card w-full bg-base-100 shadow-xl md:grid md:grid-cols-4 rounded-lg hover:bg-slate-200  hover:text-[black] duration-500 cursor-pointer" >
          <div class="col-span-1">
            <img
              src="${thumbnail_url}"
              class="py-4 px-4 md:pl-4 rounded-md h-full w-full"/>
          </div>
          <div class="card-body col-span-3  px-4">
            <h2 class="card-title">
               ${title ? title : 'N/a'}
            </h2>
            <p class="text-slate-500">
              ${details!== null && detailsArray.length > 60? modifyDetails:details} ${details===null?'N/a':''} ${detailsArray.length > 60 ? '...' : ''}
            </p>
            <div class="card-actions mt-2 flex justify-between items-center">
              <div class="author-details flex gap-4 items-center">
                <div>
                  <label
                    tabindex="0"
                    class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full ">
                      <img src="${img ? img : 'N/a'}" />
                    </div>
                  </label>
                </div>
                <div class="info w-auto">
                  <h1 class="text-md font-semibold">${name ? name : 'N/a'}</h1>
                  <p class="text-slate-500">${published_date ? pubDate : 'N/a'}</p>
                </div>
              </div>
              <div class="views flex gap-2 items-center">
                <i class="fa-regular fa-eye"></i>
                <h1 class="text-xl font-bold">${total_view ? total_view : 'N/a'}</h1>
              </div>
              <div class="rating">
              <div class="stars-outer">
              <i class="fas fa-star-half-alt"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              </div> 
              </div>
              <div class="news-details">
                <a onclick="LoadNewsData('${_id}')">
                  <label for="my-modal" class="cursor-pointer modal-button">
                  <i  class="fa-solid fa-arrow-right text-blue-600 text-xl"></i>  
                </label>
                </a>
              </div>
            </div>
          </div>
        </div>`;
    newsConatiner.appendChild(div);
  });
}
// call categories load function
categoriesNameLoad();
// call all news categories function
showNewsByCategories();
// display categories 
const displayCategories = (categories) => {
  const categoriesList = categories.data.news_category;
  let i = 1;
  categoriesList.forEach(category => {
    const div = document.createElement('div');
    if (i == 8) {
      div.innerHTML = `<a class="category cursor-pointer text-lg text-indigo-700 bg-indigo-100 py-1 px-2 rounded hover:bg-indigo-700 hover:px-3 hover:text-[white] duration-500 cursor-pointer" onclick="showNewsByCategories('${category.category_id}','${category.category_name}')">${category.category_name}</a>`;
    } else {
      div.innerHTML = `<a class="category cursor-pointer text-lg py-1 px-2 rounded hover:bg-indigo-700 hover:px-3 hover:text-[white] duration-500 cursor-pointer" onclick="showNewsByCategories('${category.category_id}','${category.category_name}')">${category.category_name}</a>`;

    }
    categoriesContainer.appendChild(div);
    i += 1;
  });
}
// add event all category items
document.getElementById('categories-list').addEventListener('click', function (event) {
  if (event.target.classList[0] === 'category') {
    const allCategory = document.getElementsByClassName('category');
    for (let i = 0; i < allCategory.length; i++) {
      allCategory[i].classList.remove('text-indigo-700', 'bg-indigo-100');
    }
    event.target.classList.add('text-indigo-700', 'bg-indigo-100')
  }
  console.log()
})