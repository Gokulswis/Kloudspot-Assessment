const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

async function fetchData(url, elementId, formatter = v => v) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await res.json();
  document.getElementById(elementId).textContent = formatter(data.value);
}

// APIs
fetchData(
  "https://hiring-dev.internal.kloudspot.com/api/analytics/occupancy",
  "liveOccupancy"
);

fetchData(
  "https://hiring-dev.internal.kloudspot.com/api/analytics/footfall",
  "footfall"
);

fetchData(
  "https://hiring-dev.internal.kloudspot.com/api/analytics/dwell",
  "dwell",
  v => `${v} min`
);

// Logout
document.querySelector(".logout").onclick = () => {
  localStorage.clear();
  window.location.href = "index.html";
};
