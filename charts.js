const token = localStorage.getItem("token");

/* ---------- OCCUPANCY LINE CHART ---------- */
async function drawOccupancyChart() {
  const res = await fetch(
    "https://hiring-dev.internal.kloudspot.com/api/analytics/occupancy",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  );

  const data = await res.json(); // assume array [{time, count}]
  const canvas = document.getElementById("occupancyChart");
  const ctx = canvas.getContext("2d");

  const padding = 40;
  const maxVal = Math.max(...data.map(d => d.count));

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding);

  data.forEach((d, i) => {
    const x =
      padding +
      (i / (data.length - 1)) * (canvas.width - padding * 2);
    const y =
      canvas.height -
      padding -
      (d.count / maxVal) * (canvas.height - padding * 2);
    ctx.lineTo(x, y);
  });

  ctx.strokeStyle = "#009688";
  ctx.lineWidth = 2;
  ctx.stroke();
}

/* ---------- DONUT CHART ---------- */
async function drawDonutChart() {
  const res = await fetch(
    "https://hiring-dev.internal.kloudspot.com/api/analytics/demographics",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  );

  const data = await res.json(); // { male: 55, female: 45 }
  const canvas = document.getElementById("donutChart");
  const ctx = canvas.getContext("2d");

  const total = data.male + data.female;
  const maleAngle = (data.male / total) * Math.PI * 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Male
  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, maleAngle);
  ctx.strokeStyle = "#00796b";
  ctx.lineWidth = 25;
  ctx.stroke();

  // Female
  ctx.beginPath();
  ctx.arc(125, 125, 100, maleAngle, Math.PI * 2);
  ctx.strokeStyle = "#80cbc4";
  ctx.lineWidth = 25;
  ctx.stroke();
}

/* ---------- DEMOGRAPHICS LINE CHART ---------- */
async function drawDemoLineChart() {
  const res = await fetch(
    "https://hiring-dev.internal.kloudspot.com/api/analytics/demographics",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  );

  const data = await res.json(); 
  // assume: { timeline: [{time, male, female}] }

  const canvas = document.getElementById("demoLineChart");
  const ctx = canvas.getContext("2d");
  const padding = 40;

  const maxVal = Math.max(
    ...data.timeline.map(d => Math.max(d.male, d.female))
  );

  function drawLine(key, color) {
    ctx.beginPath();
    data.timeline.forEach((d, i) => {
      const x =
        padding +
        (i / (data.timeline.length - 1)) *
          (canvas.width - padding * 2);
      const y =
        canvas.height -
        padding -
        (d[key] / maxVal) * (canvas.height - padding * 2);

      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLine("male", "#00796b");
  drawLine("female", "#80cbc4");
}

/* ---------- INIT ---------- */
drawOccupancyChart();
drawDonutChart();
drawDemoLineChart();
