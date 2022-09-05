// #region tabs
/**
 * @tabs
 *
 * Табы инициируются все
 * У какой кнопки таба есть класс из js переменной TAB_ACTIVE_CLASS, тот таб и будет активным сразу
 */
const tabsBars = document.querySelectorAll(".tabs");
const tabsPagesWraps = document.querySelectorAll(".tabs-content");
const TAB_ACTIVE_CLASS = "tab--active";
const TAB_ANIMATED_CLASS = "tab--animated";

// Добавляем активное состояние для табов, чтоб инициализировать Swiper
tabsBars.forEach((tabsBar) => {
  if (tabsBar.dataset.tabs) {
    tabsPagesWraps.forEach((tabsPagesWrap) => {
      const tabPages = tabsPagesWrap.querySelectorAll(".tabs-page");
      tabPages.forEach((tabPage) => {
        tabPage.classList.add(TAB_ACTIVE_CLASS);
      });
    });
  }
});

function activateFilter(tab) {
  const checkbox = tab.querySelector('input[type="checkbox"]');
  if (checkbox) {
    checkbox.checked = true;
    debounce(() => {
      checkbox.dispatchEvent(new Event("change"));
    }, 200);
  }
}
function deactivateFilter(tab) {
  const checkbox = tab.querySelector('input[type="checkbox"]');
  if (checkbox) {
    checkbox.checked = false;
    debounce(() => {
      checkbox.dispatchEvent(new Event("change"));
    }, 200);
  }
}
// Задержка нужна, чтобы Swiper слайдеры не разъезжались
setTimeout(() => {
  tabsBars.forEach((tabsBar) => {
    const tabBarButtons = tabsBar.querySelectorAll(".tab");
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
          deactivateFilter(tab);
        });
        tabButton.classList.add(TAB_ACTIVE_CLASS);
        activateFilter(tabButton);

        if (tabsBar.dataset.tabs) {
          const tabPages = document
            .querySelector(`.tabs-content[data-tabs="${tabsBar.dataset.tabs}"]`)
            .querySelectorAll(".tabs-page");

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
          activateFilter(tabButton);
        }
      });
    }
  });
}, 150);

const filtersButtons = document.querySelectorAll(".js_tabs-filters .tab");
const closableArea = 28;
// Клик по кнопке закрыть в чипсе
filtersButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (
      button.classList.contains("tab--active") &&
      !button.classList.contains("chips--date")
    ) {
      setTimeout(() => {
        if (button.getBoundingClientRect().width - e.offsetX < closableArea) {
          button.classList.remove("tab--active");
          button.classList.remove("calendar--active");

          const checkbox = button.querySelector('input[type="checkbox"]');
          if (checkbox) {
            checkbox.checked = false;
          }
        }
      }, 10);
    }
  });
});
// #endregion tabs
