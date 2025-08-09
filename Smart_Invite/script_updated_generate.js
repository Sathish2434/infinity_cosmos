// AI Suggestion Templates - Added for ALL event types
const aiSuggestions = {
  birthday: [
    "Let's celebrate another amazing year of your life!",
    "Join us for cake, laughter, and unforgettable memories!",
    "Another year older, another year more fabulous!",
    "Come party with us as we celebrate [name]'s special day!",
  ],
  wedding: [
    "Two hearts, one love, one beautiful celebration!",
    "Join us as we say 'I Do' and start our forever!",
    "Love is in the air! Come celebrate our special day!",
    "Together is a beautiful place to be. Celebrate with us!",
  ],
  corporate: [
    "Join us for an inspiring corporate gathering!",
    "Let's connect, collaborate, and celebrate success!",
    "Professional excellence meets great networking!",
    "Building the future together, one meeting at a time!",
  ],
  anniversary: [
    "Celebrating another year of love and happiness!",
    "Join us as we celebrate our journey together!",
    "Love grows stronger with each passing year!",
    "Here's to many more years of love and laughter!",
  ],
  graduation: [
    "The tassel was worth the hassle! Let's celebrate!",
    "Join us in celebrating this incredible achievement!",
    "From student to graduate - let's party!",
    "All the hard work has paid off. Time to celebrate!",
  ],
  "baby-shower": [
    "A little miracle is on the way! Join us to celebrate!",
    "Tiny feet, a big journey begins!",
    "Come shower the parents-to-be with love and joy!",
    "A sweet baby is almost here - let's celebrate!",
  ],
  housewarming: [
    "New home, new memories! Come celebrate with us!",
    "Join us for a housewarming party full of warmth and cheer!",
    "Our door is open, and our hearts are too!",
    "Home sweet home - let's make it sweeter together!",
  ],
  holiday: [
    "It's the most wonderful time of the year! Celebrate with us!",
    "Join us for holiday cheer, laughter, and joy!",
    "Let's make this holiday season unforgettable!",
    "Merry moments, warm hearts - holiday party time!",
  ],
  retirement: [
    "Cheers to a new chapter in life! Let's celebrate retirement!",
    "A lifetime of work deserves a lifetime of weekends!",
    "Join us in honoring an incredible career!",
    "Retirement: the adventure just begins!",
  ],
  engagement: [
    "Two souls, one heart - join us for our engagement party!",
    "Love is in the air - let's celebrate our engagement!",
    "We said yes! Now let's party!",
    "Our journey to forever begins - celebrate with us!",
  ],
};

// Theme configurations - Added more styles
const themes = {
  elegant: {
    background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
    color: "#ecf0f1",
    titleColor: "#f39c12",
  },
  romantic: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
    color: "#ffffff",
    titleColor: "#fff5f5",
  },
  modern: {
    background: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
    color: "#ffffff",
    titleColor: "#f0ffff",
  },
  festive: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "#ffffff",
    titleColor: "#fff0f5",
  },
  corporate: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    titleColor: "#f8f9ff",
  },
  minimal: {
    background: "#f9f9f9",
    color: "#333333",
    titleColor: "#000000",
  },
  nature: {
    background: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
    color: "#ffffff",
    titleColor: "#e0ffe0",
  },
  neon: {
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    color: "#39ff14",
    titleColor: "#ff00ff",
  },
  vintage: {
    background: "linear-gradient(135deg, #d1913c 0%, #ffd194 100%)",
    color: "#4b3832",
    titleColor: "#854442",
  },
};

let currentTheme = "modern";

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
  updatePreview();
  applyTheme(currentTheme);
});

function setupEventListeners() {
  document.getElementById("eventType").addEventListener("change", function () {
    clearDynamicFields();
    handleEventTypeChange(this.value);
    showAISuggestions(this.value);
    updatePreview();
  });

  const allInputs = [
    "eventTitle",
    "eventDate",
    "eventTime",
    "eventLocation",
    "hostName",
    "eventMessage",
    "birthdayAge",
    "birthdayName",
    "brideName",
    "groomName",
    "companyName",
    "meetingType",
  ];

  allInputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updatePreview);
  });

  document.querySelectorAll(".theme-option").forEach((option) => {
    option.addEventListener("click", function () {
      selectTheme(this.dataset.theme);
    });
  });
}

function clearDynamicFields() {
  document
    .querySelectorAll(".dynamic-fields input, .dynamic-fields select")
    .forEach((input) => {
      input.value = "";
    });
}

function handleEventTypeChange(eventType) {
  document
    .querySelectorAll(".dynamic-fields")
    .forEach((f) => f.classList.remove("active"));
  if (eventType) {
    const fieldsId = eventType + "Fields";
    const fields = document.getElementById(fieldsId);
    if (fields) fields.classList.add("active");
  }
}

function showAISuggestions(eventType) {
  const container = document.getElementById("aiSuggestions");
  const list = document.getElementById("suggestionsList");
  if (aiSuggestions[eventType]) {
    list.innerHTML = "";
    aiSuggestions[eventType].forEach((s) => {
      const item = document.createElement("div");
      item.className = "suggestion-item";
      item.textContent = s;
      item.onclick = () => {
        document.getElementById("eventMessage").value = s;
        updatePreview();
      };
      list.appendChild(item);
    });
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
}

function selectTheme(theme) {
  document
    .querySelectorAll(".theme-option")
    .forEach((o) => o.classList.remove("active"));
  document.querySelector(`[data-theme="${theme}"]`).classList.add("active");
  currentTheme = theme;
  applyTheme(theme);
}

function applyTheme(theme) {
  const previewCard = document.getElementById("previewCard");
  const themeConfig = themes[theme];
  Object.keys(themes).forEach((t) =>
    previewCard.classList.remove(`theme-${t}`)
  );
  previewCard.classList.add(`theme-${theme}`);
  previewCard.style.background = themeConfig.background;
  previewCard.style.color = themeConfig.color;
  document.getElementById("previewTitle").style.color = themeConfig.titleColor;
}

function updatePreview() {
  const eventType = document.getElementById("eventType").value;
  const title =
    document.getElementById("eventTitle").value || "Your Event Title";
  const date = document.getElementById("eventDate").value || "Select a date";
  const time = document.getElementById("eventTime").value || "Select a time";
  const location =
    document.getElementById("eventLocation").value || "Enter location";
  const host = document.getElementById("hostName").value || "Host name";
  const message =
    document.getElementById("eventMessage").value ||
    "Your personal message will appear here...";

  document.getElementById("previewTitle").textContent = title;
  document.getElementById("previewDate").textContent = formatDate(date);
  document.getElementById("previewTime").textContent = formatTime(time);
  document.getElementById("previewLocation").textContent = location;
  document.getElementById("previewHost").textContent = host;
  document.getElementById("previewMessage").textContent = message;

  updateEventSpecificContent(eventType);
}

function updateEventSpecificContent(eventType) {
  let titleText =
    document.getElementById("eventTitle").value || "Your Event Title";

  if (eventType === "birthday") {
    const age = document.getElementById("birthdayAge").value;
    const name = document.getElementById("birthdayName").value;
    if (name && age) titleText = `${name}'s ${age}th Birthday Celebration`;
    else if (name) titleText = `${name}'s Birthday Party`;
  } else if (eventType === "wedding") {
    const bride = document.getElementById("brideName").value;
    const groom = document.getElementById("groomName").value;
    if (bride && groom) titleText = `${bride} & ${groom}'s Wedding`;
  } else if (eventType === "corporate") {
    const company = document.getElementById("companyName").value;
    const meetingType = document.getElementById("meetingType").value;
    if (company && meetingType) titleText = `${company} ${meetingType}`;
  }

  document.getElementById("previewTitle").textContent = titleText;
}

function formatDate(dateString) {
  if (!dateString) return "Select a date";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timeString) {
  if (!timeString) return "Select a time";
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function validateForm() {
  const required = [
    "eventType",
    "eventTitle",
    "eventDate",
    "eventTime",
    "eventLocation",
    "hostName",
  ];
  for (const id of required) {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      alert(`Please fill in the ${field.name || id} field.`);
      field.focus();
      return false;
    }
  }
  return true;
}

function gatherInviteData() {
  return {
    eventType: document.getElementById("eventType").value,
    title: document.getElementById("eventTitle").value,
    birthdayAge: document.getElementById("birthdayAge").value || "",
    birthdayName: document.getElementById("birthdayName").value || "",
    brideName: document.getElementById("brideName").value || "",
    groomName: document.getElementById("groomName").value || "",
    companyName: document.getElementById("companyName").value || "",
    meetingType: document.getElementById("meetingType").value || "",
    date: document.getElementById("eventDate").value,
    time: document.getElementById("eventTime").value,
    location: document.getElementById("eventLocation").value,
    host: document.getElementById("hostName").value,
    message: document.getElementById("eventMessage").value,
    theme: currentTheme,
  };
}

function generateInvite() {
  if (!validateForm()) return;
  showLoading();
  setTimeout(() => {
    const inviteData = gatherInviteData();
    fetch("storedata.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(inviteData).toString(),
    })
      .then((res) => res.text())
      .then((response) => {
        console.log("Database response:", response);
        hideLoading();
        showSuccess();
        document.getElementById("inviteForm").reset();
        document
          .querySelectorAll(".dynamic-fields")
          .forEach((f) => f.classList.remove("active"));
        updatePreview();
      })
      .catch((err) => {
        console.error("Error saving to database:", err);
        hideLoading();
        alert("Failed to save invitation data.");
      });
  }, 1000);
}

function showLoading() {
  document.getElementById("loading").style.display = "block";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

function showSuccess() {
  const msg = document.getElementById("successMessage");
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
}
