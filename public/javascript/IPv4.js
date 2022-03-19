$.ajax({
  url: "https://ipapi.co/json/",
  type: "GET",

  success: function (data) {
    document.getElementById("IPv4").innerHTML = data.ip;
  },

  error: function (err) {
    document.getElementById("IPv4").innerHTML = "Error...";
  },

  fail: function (err) {
    console.error(err);
  },
});
