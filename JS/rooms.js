// ===================== Rooms Data =====================
const rooms = [
  { id:1,name:"Single Room",type:"Single",price:100,desc:"Cozy single room",image:"images/nice.jpg"},
  { id:2,name:"Double Room",type:"Double",price:200,desc:"Comfortable double room",image:"images/comfort.jpg"},
  { id:3,name:"Suite Room",type:"Suite",price:500,desc:"Luxury suite",image:"images/Luxury room.jpg"}
];

const roomsContainer = document.getElementById("roomsContainer");

// ===================== Render Rooms =====================
function renderRooms(data){

  roomsContainer.innerHTML="";

  if(data.length === 0){
    roomsContainer.innerHTML = `
      <div class="text-center mt-5">
        <h4> No rooms found</h4>
      </div>
    `;
    return;
  }

  data.forEach((room, index)=>{
    const col=document.createElement("div");
    col.className="col-md-4 mb-4";

    col.innerHTML = `
      <div class="card h-100 shadow-lg">
        <div class="position-relative overflow-hidden">
          <img src="${room.image}" class="card-img-top">
          <span class="badge bg-primary position-absolute top-0 start-0 m-2">${room.type}</span>
        </div>

        <div class="card-body text-center">
          <h5 class="card-title">${room.name}</h5>
          <p class="text-muted small">${room.desc}</p>
          <p class="fw-bold text-info fs-5">$${room.price}</p>

          <button class="btn btn-book w-100 book-btn">
            Book Now
          </button>
        </div>
      </div>
    `;

    // ✨ Animation delay لكل كرت
    col.style.animationDelay = `${index * 0.15}s`;

    // ================= BOOK BUTTON =================
    col.querySelector(".book-btn").addEventListener("click", ()=>{

      // تأثير بسيط
      col.querySelector(".book-btn").innerText = "✔ Booked!";
      col.querySelector(".book-btn").disabled = true;

      setTimeout(()=>{
        localStorage.setItem("bookedRoom", JSON.stringify(room));
        window.location.href = "booking.html";
      }, 500);
    });

    roomsContainer.appendChild(col);
  });
}

renderRooms(rooms);

// ===================== Filters =====================
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
    (type==="" || r.type===type) &&
    r.price<=max
  );

  renderRooms(filtered);
}

// تحسين تجربة المستخدم (Debounce للبحث)
let timeout;
searchInput.addEventListener("input", ()=>{
  clearTimeout(timeout);
  timeout = setTimeout(filterRooms, 300);
});

typeFilter.addEventListener("change",filterRooms);

priceFilter.addEventListener("input",()=>{
  priceValue.textContent=priceFilter.value;
  filterRooms();
});

// ===================== Dark Mode =====================
const themeToggle=document.getElementById("themeToggle");

// تحميل الثيم
if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
  themeToggle.classList.replace("bi-moon-fill","bi-sun-fill");
}

// تغيير الثيم
themeToggle.addEventListener("click",()=>{

  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    themeToggle.classList.replace("bi-moon-fill","bi-sun-fill");
    localStorage.setItem("theme","dark");
  } else {
    themeToggle.classList.replace("bi-sun-fill","bi-moon-fill");
    localStorage.removeItem("theme");
  }
}

);