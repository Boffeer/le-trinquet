// #region tabs
/**
 * @tabs
 *
 * Табы инициируются все
 * У какой кнопки таба есть класс из js переменной TAB_ACTIVE_CLASS, тот таб и будет активным сразу
 */
const tabsBars = document.querySelectorAll(".tabs__controls");
const tabsPagesWraps = document.querySelectorAll(".tabs__pages");
const TAB_ACTIVE_CLASS = "tab--active";
const TAB_ANIMATED_CLASS = "tab--animated";

// Добавляем активное состояние для табов, чтоб инициализировать Swiper
tabsBars.forEach((tabsBar) => {
  if (tabsBar.dataset.tabs) {
    tabsPagesWraps.forEach((tabsPagesWrap) => {
      const tabPages = tabsPagesWrap.querySelectorAll(".tabs__page");
      tabPages.forEach((tabPage) => {
        tabPage.classList.add(TAB_ACTIVE_CLASS);
      });
    });
  }
});

// Задержка нужна, чтобы Swiper слайдеры не разъезжались
setTimeout(() => {
  tabsBars.forEach((tabsBar) => {
    const tabBarButtons = tabsBar.querySelectorAll(".tabs__controls-button");
    let clickedCount = 0;
    tabBarButtons.forEach((tabButton, buttonIndex) => {
      tabButton.addEventListener("click", () => {
        if (clickedCount != 0) {
          //
        } else {
          clickedCount++;
        }
        tabBarButtons.forEach((tab) => {
          tab.classList.remove(TAB_ACTIVE_CLASS);
        });
        tabButton.classList.add(TAB_ACTIVE_CLASS);

        if (tabsBar.dataset.tabs) {
          const tabPages = document
            .querySelector(`.tabs__pages[data-tabs="${tabsBar.dataset.tabs}"]`)
            .querySelectorAll(".tabs__page");

          if (tabPages[buttonIndex]) {
            tabPages.forEach((tabPage, tabIndex) => {
              if (tabIndex !== buttonIndex) {
                tabPage.classList.remove(TAB_ANIMATED_CLASS);
                tabPage.classList.remove(TAB_ACTIVE_CLASS);
              }
            });
            tabPages[buttonIndex].classList.add(TAB_ACTIVE_CLASS);
            setTimeout(() => {
              tabPages[buttonIndex].classList.add(TAB_ANIMATED_CLASS);
            }, 60);
          }
        }
      });
    });

    if (tabsBar.dataset.tabs) {
      tabBarButtons.forEach((tabButton) => {
        if (tabButton.classList.contains(TAB_ACTIVE_CLASS)) {
          tabButton.click();
        }
      });
    }
  });
}, 150);

// #endregion tabs