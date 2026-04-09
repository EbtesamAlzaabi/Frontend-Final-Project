

    // Featured Rooms
    const roomsData = [
      { id: 1, name: "Single Room", desc: "Comfortable room", image: "images/nice.jpg" },
      { id: 2, name: "Double Room", desc: "Luxurious room with view", image: "images/comfort.jpg" },
      { id: 3, name: "Suite Deluxe Room", desc: "Best rooms in the hotel", image: "images/Luxury room.jpg" }
    ];
    const featuredRoomsContainer = document.getElementById("featuredRooms");
    roomsData.forEach(room => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";
      col.innerHTML = `<div class="card h-100">
      <img src="${room.image}" alt="${room.name}">
      <div class="card-body">
        <h5 class="card-title">${room.name}</h5>
        <p class="card-text">${room.desc}</p>
      </div>
    </div>`;
      featuredRoomsContainer.appendChild(col);
    });
    // بعد renderRooms(rooms) مباشرة
    document.querySelectorAll(".book-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const roomId = e.target.dataset.id;
        const bookedRoom = rooms.find(r => r.id == roomId);
        // حفظ الغرفة المختارة
        localStorage.setItem("bookedRoom", JSON.stringify(bookedRoom));
        // الانتقال مباشرةً إلى صفحة Booking Form
        window.location.href = "booking.html";
      });
    });
    // Dark Mode Toggle
    const themeToggle = document.getElementById("themeToggle");

    // عند تحميل الصفحة، تحقق من LocalStorage
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      themeToggle.classList.replace("bi-moon-fill", "bi-sun-fill");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      if (document.body.classList.contains("dark")) {
        themeToggle.classList.replace("bi-moon-fill", "bi-sun-fill");
        localStorage.setItem("theme", "dark");
      } else {
        themeToggle.classList.replace("bi-sun-fill", "bi-moon-fill");
        localStorage.removeItem("theme");
      }
    });