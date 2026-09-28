const dataInput = document.getElementById("dataInput");
const continueFromDataBtn = document.getElementById("continueFromDataBtn");
const todayDraftKey = "birdTodayDraft";

let birdIndexesByName = new Map();

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function loadBirdIndexesByName() {
  if (birdIndexesByName.size > 0) return birdIndexesByName;

  const birds = await loadBirds();
  birdIndexesByName = new Map();
  birds.forEach(familyGroup => {
    familyGroup.species.forEach(bird => {
      if (!birdIndexesByName.has(bird.name) || bird.alien !== true) {
        birdIndexesByName.set(bird.name, bird);
      }

      if (bird.alien === true) {
        birdIndexesByName.set(getBirdDisplayName(bird), bird);
      }
    });
  });

  return birdIndexesByName;
}

function parseInputLine(line) {
  const trimmedLine = line.trim();
  const match = trimmedLine.match(/^([^\s\u3000]+)(?:[\s\u3000]+(.+))?$/);

  if (!match) return null;

  return {
    originalText: trimmedLine,
    name: match[1],
    count: match[2] ? match[2].trim() : ""
  };
}

function getInputRows() {
  return dataInput.value
    .split(/\r?\n/)
    .map(parseInputLine)
    .filter(Boolean);
}

function saveImportedDraft(rows, birdMap) {
  const memoLines = [];
  const importedBirds = [];

  rows.forEach(row => {
    const bird = birdMap.get(row.name);

    if (!bird) {
      memoLines.push(row.originalText);
      return;
    }

    importedBirds.push({
      id: bird.id,
      count: row.count,
      checked: true
    });
  });

  if (importedBirds.length === 0 && memoLines.length === 0) {
    alert("入力された内容が見つかりませんでした");
    return false;
  }

  const draft = {
    startedOn: getTodayString(),
    record: {
      date: "",
      startTime: "",
      endTime: "",
      place: "",
      weather: "",
      observer: "",
      memo: memoLines.join("\n"),
      birds: importedBirds
    }
  };

  localStorage.setItem(todayDraftKey, JSON.stringify(draft));

  if (memoLines.length > 0) {
    alert(`種名に完全一致しなかった行をメモに入れました：\n${memoLines.join("\n")}`);
  }

  return true;
}

async function continueFromData() {
  try {
    const birdMap = await loadBirdIndexesByName();
    const rows = getInputRows();

    if (rows.length === 0) {
      alert("鳥の種名を入力してください");
      return;
    }

    if (saveImportedDraft(rows, birdMap)) {
      window.location.href = "index.html";
    }
  } catch (error) {
    alert(error.message);
  }
}

if (continueFromDataBtn) {
  continueFromDataBtn.addEventListener("click", continueFromData);
}
