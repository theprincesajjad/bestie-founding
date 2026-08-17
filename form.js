(function () {
  var form = document.getElementById("founding-form");
  var thanks = document.getElementById("thanks");
  var err = document.getElementById("err");
  var btn = document.getElementById("submit");
  if (!form) return;

  var inbox = ["sajjad.pirani", "torontomu.ca"].join("@");

  function showError(msg) {
    err.hidden = false;
    err.textContent = msg;
  }

  function done() {
    form.hidden = true;
    thanks.hidden = false;
    thanks.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    err.hidden = true;

    if (form._honey && form._honey.value) {
      done();
      return;
    }

    var name = (form.name.value || "").trim();
    var email = (form.email.value || "").trim();
    var age = form.age.checked;

    if (!name) return showError("Add your name.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return showError("Add a real email.");
    }
    if (!age) return showError("Founding Girls is 18 and over.");

    btn.disabled = true;
    btn.textContent = "Sending…";

    fetch("https://formsubmit.co/ajax/" + inbox, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        list: "Founding Girls",
        age: "18+",
        _subject: "Founding Girls — new name on the list",
        _template: "table",
        _captcha: "false",
        _honey: form._honey.value
      })
    })
      .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (result) {
        done();
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = "Ask to be on the list";
        showError("That did not go through. Try once more.");
      });
  });
})();
