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

  document.querySelectorAll('[data-action="print"]').forEach((button) => {
    button.addEventListener("click", () => window.print());
  });

  document.querySelector('[data-action="calendar"]')?.addEventListener("click", () => {
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Happiness Bank//Wedding Invitation//ZH-TW",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:wedding-20261212-happiness-bank",
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
      "DTSTART:20261212T033000Z",
      "SUMMARY:永軒 & 昀蓁 婚宴",
      "LOCATION:清新溫泉飯店\\, 台中市烏日區溫泉路 2 號",
      "DESCRIPTION:迎賓 11:30；開席 12:00。誠摯邀請您見證我們的幸福。",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    const file = new Blob(["\uFEFF", calendar], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "永軒與昀蓁-婚宴.ics";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    announce("行事曆檔案已下載");
  });

  const form = document.querySelector("#rsvp-form");
  function getRsvpReply() {
    if (!form?.reportValidity()) return null;
    const values = new FormData(form);
    const guestName = String(values.get("guestName")).trim();
    const attendance = String(values.get("attendance"));
    const guestCount = String(values.get("guestCount"));
    const status = attendance === "出席" ? "出席 ❤️" : "不克出席";
    const countLine = attendance === "出席" ? `出席人數：${guestCount} 位` : "";
    const reply = [
      "【永軒＆昀蓁 12.12 婚禮出席回覆】",
      "",
      `姓名：${guestName}`,
      `出席狀況：${status}`,
      countLine
    ].filter(Boolean).join("\n");
    return reply;
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const reply = getRsvpReply();
    if (!reply) return;
    const lineUrl = `https://line.me/R/oaMessage/%40634ydtgf/?${encodeURIComponent(reply)}`;

    announce("即將開啟 LINE，請確認後傳送回覆");
    window.location.href = lineUrl;
  });

  document.querySelector("#rsvp-copy")?.addEventListener("click", async () => {
    const reply = getRsvpReply();
    if (!reply) return;

    try {
      await navigator.clipboard.writeText(reply);
    } catch {
      const copyBuffer = document.createElement("textarea");
      copyBuffer.value = reply;
      copyBuffer.setAttribute("readonly", "");
      copyBuffer.style.position = "fixed";
      copyBuffer.style.opacity = "0";
      document.body.append(copyBuffer);
      copyBuffer.select();
      const copied = document.execCommand("copy");
      copyBuffer.remove();
      if (!copied) {
        announce("無法自動複製，請再試一次或手動回覆");
        return;
      }
    }
    announce("回覆內容已複製，可貼到 LINE 傳送");
  });
})();
