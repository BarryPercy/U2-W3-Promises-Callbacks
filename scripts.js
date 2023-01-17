const options={
    method: 'GET',
    headers: {
        Authorization: "563492ad6f91700001000001e6826af18ad3455c9106aa3885ec34ae",
    }
}
function getQuery(query){
    fetch(`https://api.pexels.com/v1/search?query=${query}`, options)
	.then(response => response.json())
    .then(object=>renderPhotos(object))
    .catch(err => console.error(err));
}

function getCarouselImages(query){
    fetch(`https://api.pexels.com/v1/search?query=${query}`, options)
	.then(response => response.json())
    .then(object=>createCarousel(object))
    .catch(err => console.error(err));
}
function logObject(test){
    fetch(`https://api.pexels.com/v1/search?query=${test}`, options)
	.then(response => response.json())
    .then(jsonResponse=>console.log(jsonResponse))
    .catch(err => console.error(err));
}
let thumbnails = document.querySelectorAll(".card svg");
let cards = document.querySelectorAll(".card");
function renderPhotos(object){
    let counter=0;
    for(let i=0;i<cards.length;i++){
        thumbnails[i].remove();
        cards[i].firstChild.remove();
        let img = document.createElement("img");
        img.src=`${object.photos[i].src.medium}`;
        cards[i].insertBefore(img,cards[i].firstChild)
        counter++;
    }
    replaceCardMins(object);
    let modal = document.getElementById("myModal");
    let modalBody = document.querySelector("#myModal .modal-dialog .modal-content .modal-body")
    let closeBtn = document.getElementById("close-modal");
    console.log(modal)
    modalBody.innerHTML=`<p>${counter} photos added!</p>`
    modal.style.display = "block";
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    modal

    setTimeout(function() {
        modal.style.display = "none";
    }, 5000);
}
let editButtons=[];
let buttons;
function replaceEdit(){
    buttons = document.getElementsByTagName('button');
    for(let i=0;i<buttons.length;i++){
        if(buttons[i].innerText === "Edit"){
                editButtons.push(buttons[i]);
        }
    }
    for(let i=0;i<editButtons.length;i++){
        editButtons[i].innerText="Hide";
        editButtons[i].onclick = function(){
            editButtons[i].parentNode.parentNode.parentNode.parentNode.classList.add("hidden");
        }
    }

}
let viewButtons=[];
let imageModalBody=document.querySelector("#imageModal .modal-dialog .modal-content .modal-body");
function changeView(){
    buttons = document.getElementsByTagName('button');
    for(let i=0;i<buttons.length;i++){
        if(buttons[i].innerText === "View"){
                viewButtons.push(buttons[i]);
        }
    }
    let modal = document.getElementById("imageModal");
    let closeBtn = document.getElementById("close-image-modal");
    for(let i=0;i<viewButtons.length;i++){
        viewButtons[i].onclick = function(){
            imageModalBody.innerHTML=`<img src="" id="imageModalImage">`
            let imageInModal = document.getElementById("imageModalImage")
            console.log(imageInModal)
            imageInModal.src=`${this.parentNode.parentNode.parentNode.parentNode.firstChild.src}`;
            modal.style.display = "block";
            closeBtn.addEventListener("click", function() {
                modal.style.display = "none";
            });;
            }
    }
}

function replaceCardMins(object){
    let cardMins = document.querySelectorAll("small");
    for(let i=0;i<cardMins.length;i++){
        cardMins[i].innerText=`${object.photos[i].id}`
    }
}

let searchButton = document.getElementById("search-button");
let searchInput = document.getElementById("search-input");
searchButton.onclick=function(){
    if(searchInput.value==''){
        alert("Can't search an empty value!")
    }
    else{
        getQuery(searchInput.value);
    }
}
let carousel = document.getElementById("carousel");
let slides="";
function createCarousel(object){
    for(let i=0;i<object.photos.length;i++){
        slides+=`<div class="carousel-item">
            <img class="d-block w-100" src="${object.photos[i].src.medium}">
          </div>`
    }
    carousel.innerHTML=`
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">${slides}
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>`
      let firstImage = document.querySelector(".carousel-inner .carousel-item");
      firstImage.classList.add("active");
}
window.onload= function(){
    //logObject("forest");
    getCarouselImages("forest");
    replaceEdit();
    changeView();
}
