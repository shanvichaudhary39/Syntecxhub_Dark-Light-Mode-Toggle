(() => {
  const storageKey = "mode-theme";
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const themeName = document.getElementById("theme-name");
  const statusLabel = document.getElementById("status-label");
  const thumbIcon = document.getElementById("thumb-icon");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const sunIcon = '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
  const moonIcon = '<path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.6 8.6 0 1 0 20.2 15.2Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  let theme = "light";

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme;
    }
  } catch (error) {
    console.error("Could not read the saved theme preference.", error);
  }

  const applyTheme = (nextTheme) => {
    theme = nextTheme;
    const isDark = theme === "dark";
    root.dataset.theme = theme;
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeName.textContent = `${isDark ? "Dark" : "Light"} mode`;
    statusLabel.textContent = `${isDark ? "Dark" : "Light"} theme is on`;
    thumbIcon.innerHTML = isDark ? moonIcon : sunIcon;
    themeColor.setAttribute("content", isDark ? "#141714" : "#f6f7f4");
  };

  applyTheme(theme);

  toggle.addEventListener("click", () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch (error) {
      console.error("Could not save the theme preference.", error);
    }
  });
})();
