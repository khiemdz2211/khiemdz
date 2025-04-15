const userData = {
    "username":"khiemdz",
    "password":"123456"
}
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
  
    if (usernameInput === userData.username && passwordInput === userData.password) {
      // Đăng nhập thành công, chuyển hướng sang index.html
      window.location.href = "index.html";
    } else {
      // Sai tài khoản hoặc mật khẩu
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
});