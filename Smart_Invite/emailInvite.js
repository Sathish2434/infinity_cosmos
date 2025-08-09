function emailInvite() {
  if (!validateForm()) return;

  const email = prompt("Enter recipient email address:");
  if (!email || !email.includes("@")) {
    alert("Please enter a valid email.");
    return;
  }

  showLoading();
  setTimeout(() => {
    const inviteData = gatherInviteData();
    simulateEmailSend(email, inviteData);
    hideLoading();
    showSuccess();
    document.getElementById("inviteForm").reset();
    document
      .querySelectorAll(".dynamic-fields")
      .forEach((f) => f.classList.remove("active"));
    updatePreview();
  }, 1000);
}

function simulateEmailSend(email, data) {
  const htmlContent = `
    <html>
      <body>
        <h1>${data.title}</h1>
        <p>${data.message}</p>
      </body>
    </html>
  `;

  fetch("send_invite.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, ...data, htmlContent }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Email response:", response);
    })
    .catch((err) => {
      console.error("Error sending email:", err);
      alert("Failed to send email. Please try again.");
    });
}
