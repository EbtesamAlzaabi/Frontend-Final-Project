

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

// Booking Form Logic
const bookingForm=document.getElementById("bookingForm");
const checkIn=document.getElementById("checkIn");
const checkOut=document.getElementById("checkOut");
const today=new Date().toISOString().split('T')[0];
checkIn.setAttribute("min",today);
checkOut.setAttribute("min",today);

// Room check
let bookedRoom = JSON.parse(localStorage.getItem("bookedRoom") || "null");
const roomNameInput = document.getElementById("roomName");

if(!bookedRoom){
  const summaryDiv=document.getElementById("summary");
  summaryDiv.classList.remove("d-none");
  summaryDiv.innerHTML = `<div class="alert alert-warning">⚠️ Please select a room first from the Rooms page!</div>`;
  document.getElementById("submitBtn").disabled = true;
} else {
  roomNameInput.value = bookedRoom.name;
}

// Update check-out min based on check-in
checkIn.addEventListener("change",()=>{
  if(checkIn.value){
    const minOut=new Date(checkIn.value);
    minOut.setDate(minOut.getDate()+1);
    checkOut.min=minOut.toISOString().split('T')[0];
  }
});

// Form submit
bookingForm.addEventListener("submit",e=>{
  e.preventDefault();
  
  if(!bookedRoom) return; // Safety check
  
  // Clear previous errors
  ["guestName","email","phone","checkIn","checkOut","guests"].forEach(id=>{
    document.getElementById(id+"Error").textContent="";
  });

  let valid=true;
  const guestName=document.getElementById("guestName").value.trim();
  const email=document.getElementById("email").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const guests=document.getElementById("guests").value;
  const requests=document.getElementById("requests").value.trim();

  if(!guestName){document.getElementById("guestNameError").textContent="Required"; valid=false;}
  if(!email || !/^\S+@\S+\.\S+$/.test(email)){document.getElementById("emailError").textContent="Invalid email"; valid=false;}
  if(!phone){document.getElementById("phoneError").textContent="Required"; valid=false;}
  if(!checkIn.value){document.getElementById("checkInError").textContent="Required"; valid=false;}
  if(!checkOut.value){document.getElementById("checkOutError").textContent="Required"; valid=false;}
  if(checkIn.value && checkOut.value && new Date(checkOut.value)<=new Date(checkIn.value)){
    document.getElementById("checkOutError").textContent="Check-out must be after check-in"; valid=false;
  }
  if(!guests){document.getElementById("guestsError").textContent="Required"; valid=false;}

  if(!valid) return;

  const pricePerNight=bookedRoom.price;
  const nights=(new Date(checkOut.value)-new Date(checkIn.value))/(1000*60*60*24);
  const total=pricePerNight*nights;

  const summaryDiv=document.getElementById("summary");
  summaryDiv.innerHTML=`
    <h4>Booking Summary</h4>
    <p><strong>Guest:</strong> ${guestName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Room:</strong> ${bookedRoom.name}</p>
    <p><strong>Check-in:</strong> ${checkIn.value}</p>
    <p><strong>Check-out:</strong> ${checkOut.value}</p>
    <p><strong>Nights:</strong> ${nights}</p>
    <p><strong>Guests:</strong> ${guests}</p>
    <p><strong>Special Requests:</strong> ${requests || "-"}</p>
    <p><strong>Total Price:</strong> $${total}</p>
  `;
  summaryDiv.classList.remove("d-none");
});

// Reset button
document.getElementById("resetBtn").addEventListener("click",()=>{
  document.getElementById("summary").classList.add("d-none");
  document.getElementById("summary").innerHTML="";
});
