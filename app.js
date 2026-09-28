// ===== 観察情報入力欄 =====
const obsDate = document.getElementById("obsDate");
const obsStartTime = document.getElementById("obsStartTime");
const obsEndTime = document.getElementById("obsEndTime");
const obsPlace = document.getElementById("obsPlace");
const obsWeather = document.getElementById("obsWeather");
const obsObserver = document.getElementById("obsObserver");

// ===== sp.判定関数 =====
function isSpName(name) {
  return name.includes("sp.");
}


// ===== 表示処理（折りたたみ対応） =====
const list = document.getElementById("birdList");
const output = document.getElementById("output");
const outputDrawer = document.getElementById("outputDrawer");
const outputDrawerHandle = document.getElementById("outputDrawerHandle");
const closeOutputDrawerBtn = document.getElementById("closeOutputDrawerBtn");
const birdSearchInput = document.getElementById("birdSearchInput");
const clearBirdSearchBtn = document.getElementById("clearBirdSearchBtn");
const checkedOnlyBtn = document.getElementById("checkedOnlyBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const settingsBtn = document.getElementById("settingsBtn");
const allBirdItems = [];
let freeMemoInput = null;
let searchResultsView = null;
let familyOpenStatesBeforeSearch = null;
let checkedOnlyMode = false;
let familyOpenStatesBeforeCheckedOnly = null;
let outputDrawerScrollLockY = 0;

function updateOutputDrawerHeight() {
  if (!outputDrawer) return;
  document.body.style.setProperty("--output-drawer-height", `${outputDrawer.offsetHeight}px`);
}

function getPageBottomGap() {
  const scrollingElement = document.scrollingElement || document.documentElement;
  return scrollingElement.scrollHeight - window.innerHeight - window.scrollY;
}

function lockPageScrollForOutputDrawer() {
  if (document.body.classList.contains("output-drawer-scroll-locked")) return;

  outputDrawerScrollLockY = window.scrollY;
  document.body.style.setProperty("--page-scroll-lock-top", `-${outputDrawerScrollLockY}px`);
  document.body.classList.add("output-drawer-scroll-locked");
}

function unlockPageScrollForOutputDrawer() {
  if (!document.body.classList.contains("output-drawer-scroll-locked")) return;

  document.body.classList.remove("output-drawer-scroll-locked");
  document.body.style.removeProperty("--page-scroll-lock-top");
  window.scrollTo({
    top: outputDrawerScrollLockY,
    left: 0,
    behavior: "auto"
  });
}

function setOutputDrawerOpen(isOpen) {
  if (!outputDrawer || !outputDrawerHandle) return;

  const wasOpen = outputDrawer.classList.contains("fullscreen");
  const bottomGapBeforeOpen = getPageBottomGap();
  const newlyCoveredHeight = Math.max(0, outputDrawer.offsetHeight - outputDrawerHandle.offsetHeight);

  outputDrawer.classList.toggle("fullscreen", isOpen);
  document.body.classList.toggle("output-drawer-is-open", isOpen);
  document.body.classList.toggle("output-drawer-is-fullscreen", isOpen);
  updateOutputDrawerHeight();
  outputDrawerHandle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen && !wasOpen && bottomGapBeforeOpen < newlyCoveredHeight) {
    window.scrollBy({
      top: newlyCoveredHeight - bottomGapBeforeOpen,
      behavior: "auto"
    });
  }

  if (isOpen) {
    lockPageScrollForOutputDrawer();
  } else {
    unlockPageScrollForOutputDrawer();
  }
}

if (outputDrawer && outputDrawerHandle) {
  let drawerTouchStartY = null;

  updateOutputDrawerHeight();
  window.addEventListener("resize", updateOutputDrawerHeight);

  outputDrawerHandle.addEventListener("click", () => {
    setOutputDrawerOpen(!outputDrawer.classList.contains("fullscreen"));
  });

  if (closeOutputDrawerBtn) {
    closeOutputDrawerBtn.addEventListener("click", () => {
      setOutputDrawerOpen(false);
    });
  }

  outputDrawerHandle.addEventListener("touchstart", event => {
    drawerTouchStartY = event.touches[0].clientY;
  }, { passive: true });

  outputDrawerHandle.addEventListener("touchend", event => {
    if (drawerTouchStartY === null) return;

    const touchEndY = event.changedTouches[0].clientY;
    const diffY = touchEndY - drawerTouchStartY;

    if (diffY < -35) {
      setOutputDrawerOpen(true);
    } else if (diffY > 35) {
      setOutputDrawerOpen(false);
    }

    drawerTouchStartY = null;
  }, { passive: true });
}

function normalizeSearchText(text) {
  return text
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[ぁ-ん]/g, char => String.fromCharCode(char.charCodeAt(0) + 0x60));
}

function getNormalizedTextMap(text) {
  const normalizedChars = [];
  const originalIndexes = [];

  Array.from(text).forEach((char, index) => {
    const normalizedChar = normalizeSearchText(char);
    if (!normalizedChar) return;

    Array.from(normalizedChar).forEach(charPart => {
      normalizedChars.push(charPart);
      originalIndexes.push(index);
    });
  });

  return {
    text: normalizedChars.join(""),
    originalIndexes
  };
}

function renderBirdLabel(item, keyword = "") {
  const label = item.querySelector("label");
  const birdName = item.dataset.birdDisplayName || item.dataset.birdName || "";
  if (!label) return;

  label.textContent = " " + birdName + " ";
  if (!keyword) return;

  const normalizedMap = getNormalizedTextMap(birdName);
  const matchStart = normalizedMap.text.indexOf(keyword);
  if (matchStart === -1) return;

  const matchEnd = matchStart + keyword.length - 1;
  const originalStart = normalizedMap.originalIndexes[matchStart];
  const originalEnd = normalizedMap.originalIndexes[matchEnd] + 1;

  label.textContent = " ";
  label.append(
    document.createTextNode(birdName.slice(0, originalStart))
  );

  const mark = document.createElement("mark");
  mark.textContent = birdName.slice(originalStart, originalEnd);
  label.append(mark);

  label.append(
    document.createTextNode(birdName.slice(originalEnd) + " ")
  );
}

function createExactMatchClone(item, keyword) {
  const birdId = item.dataset.birdId;
  const checkbox = item.querySelector('input[type="checkbox"]');
  const countInput = item.querySelector('input[type="text"]');
  const clone = document.createElement("li");
  clone.dataset.birdName = item.dataset.birdName || "";
  clone.dataset.birdDisplayName = item.dataset.birdDisplayName || clone.dataset.birdName;
  clone.classList.add("search-hit", "search-exact-hit");

  const cloneCheckbox = document.createElement("input");
  cloneCheckbox.type = "checkbox";
  cloneCheckbox.id = `exact-bird-${birdId}`;
  cloneCheckbox.checked = checkbox ? checkbox.checked : false;

  const cloneLabel = document.createElement("label");
  cloneLabel.htmlFor = cloneCheckbox.id;

  const cloneCountInput = document.createElement("input");
  cloneCountInput.type = "text";
  cloneCountInput.placeholder = "数・メモ";
  cloneCountInput.dataset.birdId = birdId;
  cloneCountInput.value = countInput ? countInput.value : "";

  clone.appendChild(cloneCheckbox);
  clone.appendChild(cloneLabel);
  clone.appendChild(cloneCountInput);
  renderBirdLabel(clone, keyword);

  cloneCheckbox.addEventListener("change", () => {
    if (checkbox) checkbox.checked = cloneCheckbox.checked;
    updateOutputText();
    applyCheckedOnlyView();
  });

  cloneCountInput.addEventListener("input", () => {
    if (countInput) countInput.value = cloneCountInput.value;
    updateOutputText();
  });

  return clone;
}

function createSearchResultsView() {
  if (searchResultsView) return searchResultsView;

  const view = document.createElement("div");
  view.classList.add("search-results-view");

  const exactList = document.createElement("ul");
  exactList.classList.add("family-list", "open", "search-results");
  exactList.dataset.searchSection = "exactList";

  const noResults = document.createElement("p");
  noResults.classList.add("search-no-results");
  noResults.dataset.searchSection = "noResults";
  noResults.textContent = "一致する鳥が見つかりません。";

  view.appendChild(exactList);
  view.appendChild(noResults);
  list.prepend(view);

  searchResultsView = view;
  return searchResultsView;
}

function resetBirdItems() {
  allBirdItems.forEach(item => {
    item.hidden = false;
    item.classList.remove("search-hit", "search-exact-hit");
    renderBirdLabel(item);
  });
}

function getItemCheckbox(item) {
  return item ? item.querySelector('input[type="checkbox"]') : null;
}

function updateCheckedOnlyButton() {
  if (!checkedOnlyBtn) return;
  checkedOnlyBtn.setAttribute("aria-pressed", String(checkedOnlyMode));
  checkedOnlyBtn.setAttribute(
    "aria-label",
    checkedOnlyMode ? "通常表示に戻す" : "チェック済みだけ表示"
  );
}

function setFamilyOpen(familyTitle, familyList, isOpen) {
  familyTitle.classList.toggle("open", isOpen);
  familyList.classList.toggle("open", isOpen);
}

function closeFamilyKeepingNextPosition(familyTitle, familyList) {
  const nextFamilyTitle = familyList.nextElementSibling;
  const previousTop = nextFamilyTitle ? nextFamilyTitle.getBoundingClientRect().top : null;

  setFamilyOpen(familyTitle, familyList, false);

  if (!nextFamilyTitle || previousTop === null) return;

  const currentTop = nextFamilyTitle.getBoundingClientRect().top;
  window.scrollBy({
    top: currentTop - previousTop,
    left: 0,
    behavior: "auto"
  });
}

function restoreFamilyOpenStates(states) {
  const familyTitles = list.querySelectorAll(".family-title");

  familyTitles.forEach(familyTitle => {
    const familyList = familyTitle.nextElementSibling;
    const familyName = familyTitle.dataset.familyName || "";
    const wasOpen = states
      ? states.get(familyName)
      : familyTitle.classList.contains("open");

    familyTitle.hidden = false;
    familyList.hidden = false;
    familyList.classList.remove("search-results");
    setFamilyOpen(familyTitle, familyList, Boolean(wasOpen));
    familyTitle.textContent = familyName;
  });
}

function applyCheckedOnlyView() {
  if (!checkedOnlyMode) return;

  if (searchResultsView) searchResultsView.hidden = true;

  const familyTitles = list.querySelectorAll(".family-title");

  resetBirdItems();

  familyTitles.forEach(familyTitle => {
    const familyList = familyTitle.nextElementSibling;
    const familyName = familyTitle.dataset.familyName || "";
    let checkedCount = 0;

    familyList.querySelectorAll("li[data-bird-id]").forEach(item => {
      const checkbox = getItemCheckbox(item);
      const isChecked = Boolean(checkbox && checkbox.checked);

      item.hidden = !isChecked;
      if (isChecked) checkedCount++;
    });

    familyTitle.hidden = checkedCount === 0;
    familyList.hidden = checkedCount === 0;
    familyList.classList.remove("search-results");
    setFamilyOpen(familyTitle, familyList, checkedCount > 0);
    familyTitle.textContent = checkedCount > 0 ? `${familyName}（${checkedCount}）` : familyName;
  });
}

function setCheckedOnlyMode(isOn) {
  if (!list) return;

  if (isOn && !checkedOnlyMode) {
    familyOpenStatesBeforeCheckedOnly = new Map(
      Array.from(list.querySelectorAll(".family-title")).map(familyTitle => [
        familyTitle.dataset.familyName || "",
        familyTitle.classList.contains("open")
      ])
    );
  }

  checkedOnlyMode = isOn;
  updateCheckedOnlyButton();

  if (birdSearchInput) {
    birdSearchInput.value = "";
    birdSearchInput.disabled = checkedOnlyMode;
  }
  if (clearBirdSearchBtn) {
    clearBirdSearchBtn.disabled = checkedOnlyMode;
  }
  familyOpenStatesBeforeSearch = null;

  if (checkedOnlyMode) {
    applyCheckedOnlyView();
    return;
  }

  resetBirdItems();
  restoreFamilyOpenStates(familyOpenStatesBeforeCheckedOnly);
  familyOpenStatesBeforeCheckedOnly = null;
}

function filterBirdList() {
  if (!birdSearchInput) return;

  if (checkedOnlyMode) {
    birdSearchInput.value = "";
    applyCheckedOnlyView();
    return;
  }

  const keyword = normalizeSearchText(birdSearchInput.value);
  const familyTitles = list.querySelectorAll(".family-title");

  if (keyword && !familyOpenStatesBeforeSearch) {
    familyOpenStatesBeforeSearch = new Map(
      Array.from(familyTitles).map(familyTitle => [
        familyTitle.dataset.familyName || "",
        familyTitle.classList.contains("open")
      ])
    );
  }

  resetBirdItems();

  if (!keyword) {
    if (searchResultsView) searchResultsView.hidden = true;

    restoreFamilyOpenStates(familyOpenStatesBeforeSearch);

    familyOpenStatesBeforeSearch = null;
    return;
  }

  const view = createSearchResultsView();
  const exactList = view.querySelector('[data-search-section="exactList"]');
  const noResults = view.querySelector('[data-search-section="noResults"]');
  const exactMatches = [];
  let matchTotal = 0;

  view.hidden = false;
  exactList.textContent = "";

  familyTitles.forEach(familyTitle => {
    const familyList = familyTitle.nextElementSibling;
    const familyName = familyTitle.dataset.familyName || "";
    let matchCount = 0;

    familyList.querySelectorAll("li[data-bird-id]").forEach(item => {
      const birdName = item.dataset.birdDisplayName || item.dataset.birdName || "";
      const normalizedBirdName = normalizeSearchText(birdName);
      const isMatch = normalizedBirdName.includes(keyword);
      const isExactMatch = normalizedBirdName === keyword;

      item.hidden = !isMatch;
      item.classList.toggle("search-hit", isMatch);
      renderBirdLabel(item, isMatch ? keyword : "");

      if (isMatch) matchCount++;
      if (isExactMatch) exactMatches.push(item);
    });

    matchTotal += matchCount;
    familyTitle.hidden = matchCount === 0;
    familyList.hidden = matchCount === 0;
    familyList.classList.toggle("search-results", matchCount > 0);
    setFamilyOpen(familyTitle, familyList, matchCount > 0);
    familyTitle.textContent = matchCount > 0 ? `${familyName}（${matchCount}）` : familyName;
  });

  exactMatches.forEach(item => {
    exactList.appendChild(createExactMatchClone(item, keyword));
  });
  exactList.hidden = exactMatches.length === 0;
  noResults.hidden = matchTotal > 0;
}

birds.forEach(familyGroup => {
  // 科の見出し
  const familyTitle = document.createElement("h2");
  familyTitle.textContent = familyGroup.family;
  familyTitle.classList.add("family-title");
  familyTitle.dataset.familyName = familyGroup.family;

  // 科ごとのリスト（折りたたみ対象）
  const familyList = document.createElement("ul");
  familyList.classList.add("family-list");

  // 開閉処理
  familyTitle.addEventListener("click", () => {
    setFamilyOpen(familyTitle, familyList, !familyTitle.classList.contains("open"));
  });

  list.appendChild(familyTitle);
  list.appendChild(familyList);

  familyGroup.species.forEach(bird => {
    const li = document.createElement("li");
    li.dataset.birdId = String(bird.id);
    li.dataset.birdName = bird.name;
    li.dataset.birdDisplayName = getBirdDisplayName(bird);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "bird-" + bird.id;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = " " + getBirdDisplayName(bird) + " ";

    const countInput = document.createElement("input");
    countInput.type = "text";
    countInput.placeholder = "数・メモ";
    countInput.dataset.birdId = bird.id;

    checkbox.addEventListener("change", () => {
      const exactCheckbox = document.getElementById(`exact-bird-${bird.id}`);
      if (exactCheckbox) exactCheckbox.checked = checkbox.checked;
      updateOutputText();
      applyCheckedOnlyView();
    });

    countInput.addEventListener("input", () => {
      const exactCountInput = document.querySelector(`.search-results-view input[type="text"][data-bird-id="${bird.id}"]`);
      if (exactCountInput) exactCountInput.value = countInput.value;
      updateOutputText();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(countInput);

    familyList.appendChild(li);
    allBirdItems.push(li);
  });

  const closeRow = document.createElement("li");
  closeRow.classList.add("family-close-row");

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("family-close-bar");
  closeButton.setAttribute("aria-label", `${familyGroup.family}を閉じる`);
  closeButton.addEventListener("click", () => {
    closeFamilyKeepingNextPosition(familyTitle, familyList);
  });

  closeRow.appendChild(closeButton);
  familyList.appendChild(closeRow);
});

const freeMemoPanel = document.createElement("section");
freeMemoPanel.classList.add("free-memo");

const freeMemoLabel = document.createElement("label");
freeMemoLabel.htmlFor = "freeMemoInput";
freeMemoLabel.textContent = "メモ";

freeMemoInput = document.createElement("textarea");
freeMemoInput.id = "freeMemoInput";
freeMemoInput.rows = 5;
freeMemoInput.placeholder = "自由にメモを入力";

freeMemoPanel.appendChild(freeMemoLabel);
freeMemoPanel.appendChild(freeMemoInput);
list.appendChild(freeMemoPanel);

if (birdSearchInput) {
  birdSearchInput.addEventListener("input", filterBirdList);
}

if (clearBirdSearchBtn && birdSearchInput) {
  clearBirdSearchBtn.addEventListener("click", () => {
    birdSearchInput.value = "";
    filterBirdList();
    birdSearchInput.focus();
  });
}

if (checkedOnlyBtn) {
  updateCheckedOnlyButton();
  checkedOnlyBtn.addEventListener("click", () => {
    setCheckedOnlyMode(!checkedOnlyMode);
  });
}

// ===== テキスト出力処理（自動更新対応）=====
const todayDraftKey = "birdTodayDraft";
let isRestoringDraft = false;

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCountInputForCheckbox(checkbox) {
  if (!checkbox || !checkbox.parentElement) return null;
  return checkbox.parentElement.querySelector('input[type="text"]');
}

function buildOutputText() {
  let result = "";

  let nativeSpeciesCount = 0;
  let alienSpeciesCount = 0;
  const nativeBirdLines = [];
  const alienBirdLines = [];
  const freeMemo = freeMemoInput ? freeMemoInput.value.trim() : "";

  // ---- 観察情報 ----
  if (obsDate.value) {
    const formattedDate = obsDate.value.replace(/-/g, "/");
    result += formattedDate;

    if (obsStartTime.value || obsEndTime.value) {
      result += " ";
      if (obsStartTime.value) result += obsStartTime.value;
      if (obsStartTime.value && obsEndTime.value) result += "–";
      if (obsEndTime.value) result += obsEndTime.value;
    }
    result += "\n";
  }

  if (obsPlace.value) result += `${obsPlace.value}\n`;
  if (obsWeather.value) result += `天候:${obsWeather.value}\n`;
  if (obsObserver.value) result += `観察者:${obsObserver.value}\n`;

  result += "\n";

  // ---- 鳥リスト ----
  birds.forEach(familyGroup => {
    familyGroup.species.forEach(bird => {
      const checkbox = document.getElementById("bird-" + bird.id);
      if (checkbox && checkbox.checked) {

        const isSp = isSpName(bird.name);

        // sp.は種数に含めない
        if (!isSp) {
          if (bird.alien === true) {
            alienSpeciesCount++;
          } else {
            nativeSpeciesCount++;
          }
        }

        const countInput = getCountInputForCheckbox(checkbox);
        const count = countInput && countInput.value ? countInput.value : "";

        const birdLine = isSp
          ? `・${bird.name} ${count}`
          : `${bird.name} ${count}`;

        if (bird.alien === true) {
          alienBirdLines.push(birdLine);
        } else {
          nativeBirdLines.push(birdLine);
        }
      }
    });
  });

  if (nativeBirdLines.length > 0) {
    result += `${nativeBirdLines.join("\n")}\n`;
  }

  result += "\n";
  result += `確認種数：${nativeSpeciesCount}種\n`;
  result += `＋${alienSpeciesCount}種\n`;

  if (alienBirdLines.length > 0) {
    result += `${alienBirdLines.join("\n")}\n`;
  }

  if (freeMemo) {
    result += `\nメモ:\n${freeMemo}\n`;
  }

  return result;
}

function updateOutputText() {
  if (!output) return;
  output.textContent = buildOutputText();
  updateOutputDrawerHeight();
  saveTodayDraft();
}

function collectCurrentDraftData() {
  const record = {
    date: obsDate.value,
    startTime: obsStartTime.value,
    endTime: obsEndTime.value,
    place: obsPlace.value,
    weather: obsWeather.value,
    observer: obsObserver.value,
    memo: freeMemoInput ? freeMemoInput.value : "",
    birds: []
  };

  birds.forEach(familyGroup => {
    familyGroup.species.forEach(bird => {
      const checkbox = document.getElementById("bird-" + bird.id);
      const countInput = getCountInputForCheckbox(checkbox);
      const count = countInput ? countInput.value : "";

      if ((checkbox && checkbox.checked) || count) {
        record.birds.push({
          id: bird.id,
          count: count,
          checked: checkbox ? checkbox.checked : false
        });
      }
    });
  });

  return record;
}

function saveTodayDraft() {
  if (isRestoringDraft) return;

  const draft = {
    startedOn: getTodayString(),
    record: collectCurrentDraftData()
  };

  localStorage.setItem(todayDraftKey, JSON.stringify(draft));
}

function restoreTodayDraft() {
  const savedDraft = localStorage.getItem(todayDraftKey);
  if (!savedDraft) return;

  let draft;
  try {
    draft = JSON.parse(savedDraft);
  } catch {
    localStorage.removeItem(todayDraftKey);
    return;
  }

  if (!draft || draft.startedOn !== getTodayString() || !draft.record) {
    localStorage.removeItem(todayDraftKey);
    return;
  }

  isRestoringDraft = true;

  obsDate.value = draft.record.date || "";
  obsStartTime.value = draft.record.startTime || "";
  obsEndTime.value = draft.record.endTime || "";
  obsPlace.value = draft.record.place || "";
  obsWeather.value = draft.record.weather || "";
  obsObserver.value = draft.record.observer || "";

  clearAllChecks();
  if (freeMemoInput) freeMemoInput.value = draft.record.memo || "";

  (draft.record.birds || []).forEach(item => {
    const birdData = typeof item === "object" ? item : { id: item, checked: true, count: "" };
    const checkbox = document.getElementById("bird-" + birdData.id);
    if (!checkbox) return;

    checkbox.checked = birdData.checked !== false;

    const countInput = getCountInputForCheckbox(checkbox);
    if (countInput) countInput.value = birdData.count || "";
  });

  isRestoringDraft = false;
}

[
  obsDate,
  obsStartTime,
  obsEndTime,
  obsPlace,
  obsWeather,
  obsObserver,
  freeMemoInput
].forEach(input => {
  if (!input) return;
  input.addEventListener("input", updateOutputText);
  input.addEventListener("change", updateOutputText);
});

// ===== コピー機能 =====
const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {

    const text = output.textContent;

    if (!text) {
      alert("コピーする内容がありません");
      return;
    }

    navigator.clipboard.writeText(text)
      .then(() => {
        alert("コピーしました");
      })
      .catch(() => {
        alert("コピーに失敗しました");
      });
  });
}

// ===============================
// 初期表示
// ===============================
restoreTodayDraft();
updateOutputText();

function clearAllChecks() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = false;
  });

  const birdMemoInputs = document.querySelectorAll('#birdList input[type="text"]');
  birdMemoInputs.forEach(input => {
    input.value = "";
  });

  if (freeMemoInput) freeMemoInput.value = "";

  updateOutputText();
}

function clearAllRecordData() {
  setCheckedOnlyMode(false);

  [
    obsDate,
    obsStartTime,
    obsEndTime,
    obsPlace,
    obsWeather,
    obsObserver
  ].forEach(input => {
    input.value = "";
  });

  clearAllChecks();
}

if (clearAllBtn) {
  clearAllBtn.addEventListener("click", clearAllRecordData);
}

if (settingsBtn) {
  settingsBtn.addEventListener("click", () => {
    window.location.href = "settings.html";
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.warn("Service worker registration failed:", error);
    });
  });
}
