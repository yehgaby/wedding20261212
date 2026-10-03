(() => {
  const toast = document.querySelector("#toast");
  let toastTimer;

  function announce(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "開啟導覽選單" : "關閉導覽選單");
    nav?.classList.toggle("is-open", !isOpen);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "開啟導覽選單");
  }));

  document.querySelectorAll('[data-action="print"]').forEach((button) => {
    button.addEventListener("click", () => window.print());
  });

  document.querySelector('[data-action="copy-address"]')?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("台中市烏日區溫泉路 2 號");
      announce("地址已複製");
    } catch {
      announce("地址：台中市烏日區溫泉路 2 號");
    }
  });

  document.querySelector('[data-action="calendar"]')?.addEventListener("click", () => {
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Happiness Bank//Wedding Invitation//ZH-TW",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:wedding-20261212-happiness-bank",
      "DTSTAMP:20261003T000000Z",
      "DTSTART:20261212T113000",
      "SUMMARY:永軒 & 李昀蓁 婚宴",
      "LOCATION:清新溫泉飯店\\, 台中市烏日區溫泉路 2 號",
      "DESCRIPTION:迎賓 11:30；開席 12:00。誠摯邀請您見證我們的幸福。",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    const file = new Blob(["\uFEFF", calendar], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "永軒與李昀蓁-婚宴.ics";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    announce("行事曆檔案已下載");
  });

  const countdown = document.querySelector("#countdown");
  if (countdown) {
    const eventDate = new Date(2026, 11, 12);
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const days = Math.ceil((eventDate - todayDate) / 86400000);
    countdown.textContent = days > 0 ? `${days} 天` : days === 0 ? "就是今天" : "幸福已入帳";
  }
})();
