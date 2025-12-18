const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

let page = 1;
const limit = 10;

const tbody = document.getElementById("entriesBody");
const pageInfo = document.getElementById("pageInfo");

async function loadEntries() {
  const res = await fetch(
    "https://hiring-dev.internal.kloudspot.com/api/analytics/entry-exit",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        page,
        limit
      })
    }
  );

  const data = await res.json(); 
  // assume: { records: [] }

  tbody.innerHTML = "";

  data.records.forEach(item => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.gender}</td>
      <td>${item.entryTime || "--"}</td>
      <td>${item.exitTime || "--"}</td>
      <td>${item.dwellTime || "--"}</td>
    `;

    tbody.appendChild(tr);
  });

  pageInfo.textContent = `Page ${page}`;
}

document.getElementById("prevBtn").onclick = () => {
  if (page > 1) {
    page--;
    loadEntries();
  }
};

document.getElementById("nextBtn").onclick = () => {
  page++;
  loadEntries();
};

document.querySelector(".logout").onclick = () => {
  localStorage.clear();
  window.location.href = "index.html";
};

loadEntries();
