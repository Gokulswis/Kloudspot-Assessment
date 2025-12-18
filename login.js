const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");
const togglePwd = document.getElementById("togglePwd");
const passwordInput = document.getElementById("password");

togglePwd.onclick = () => {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    loginId: document.getElementById("username").value,
    password: passwordInput.value
  };

  try {
    const res = await fetch(
      "https://hiring-dev.internal.kloudspot.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();
    localStorage.setItem("token", data.token);

    window.location.href = "dashboard.html";
  } catch (err) {
    errorMsg.textContent = "Login failed. Please try again.";
  }
});
