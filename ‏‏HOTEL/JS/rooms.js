
// Rooms Data
const rooms = [
  { id:1,name:"Single Room ",type:"Single",price:100,desc:"Cozy single room",image:"images/nice.jpg"},
  { id:2,name:"Double Room ",type:"Double",price:200,desc:"Comfortable double room",image:"images/comfort.jpg"},
  { id:3,name:" Suite Room",type:"Suite",price:500,desc:"Luxury suite",image:"images/Luxury room.jpg"}
];

const roomsContainer = document.getElementById("roomsContainer");

function renderRooms(data){
  roomsContainer.innerHTML="";

  data.forEach(room=>{
    const col=document.createElement("div");
    col.className="col-md-4 mb-4";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${room.image}">
        <div class="card-body">
          <h5>${room.name}</h5>
          <span class="badge bg-primary">${room.type}</span>
          <p>$${room.price}</p>
          <button class="btn btn-success book-btn">Book Now</button>
        </div>
      </div>
    `;

    // ✅ الربط الصحيح
    col.querySelector(".book-btn").addEventListener("click", ()=>{
      localStorage.setItem("bookedRoom", JSON.stringify(room));
      window.location.href = "booking.html";
    });

    roomsContainer.appendChild(col);
  });
}

renderRooms(rooms);

// Filters
const searchInput=document.getElementById("searchInput");
const typeFilter=document.getElementById("typeFilter");
const priceFilter=document.getElementById("priceFilter");
const priceValue=document.getElementById("priceValue");

function filterRooms(){
  const text=searchInput.value.toLowerCase();
  const type=typeFilter.value;
  const max=parseInt(priceFilter.value);

  const filtered=rooms.filter(r=>
    r.name.toLowerCase().includes(text) &&
    (type=="" || r.type==type) &&
    r.price<=max
  );

  renderRooms(filtered);
}

searchInput.addEventListener("input",filterRooms);
typeFilter.addEventListener("change",filterRooms);
priceFilter.addEventListener("input",()=>{
  priceValue.textContent=priceFilter.value;
  filterRooms();
});

// Dark Mode
const themeToggle=document.getElementById("themeToggle");

if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
  themeToggle.classList.replace("bi-moon-fill","bi-sun-fill");
}

themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    themeToggle.classList.replace("bi-moon-fill","bi-sun-fill");
    localStorage.setItem("theme","dark");
  } else {
    themeToggle.classList.replace("bi-sun-fill","bi-moon-fill");
    localStorage.removeItem("theme");
  }
});
