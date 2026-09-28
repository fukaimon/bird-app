const birdSortInput = document.getElementById("birdSortInput");
const sortBirdsBtn = document.getElementById("sortBirdsBtn");
const copySortedBirdsBtn = document.getElementById("copySortedBirdsBtn");
const birdSortOutput = document.getElementById("birdSortOutput");

let birdOrder = [];
let birdOrderIndexes = new Map();

async function loadBirdOrder() {
  if (birdOrder.length > 0) return birdOrder;

  const birds = await loadBirds();
  birdOrder = birds.flatMap(familyGroup => familyGroup.species);
  birdOrderIndexes = new Map();

  birdOrder.forEach((bird, index) => {
    if (!birdOrderIndexes.has(bird.name) || bird.alien !== true) {
      birdOrderIndexes.set(bird.name, index);
    }

    if (bird.alien === true) {
      birdOrderIndexes.set(getBirdDisplayName(bird), index);
    }
  });

  return birdOrder;
}

function getInputBirdNames() {
  return birdSortInput.value
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);
}

function sortBirdLinesByAppOrder(lines) {
  return lines
    .map((line, originalIndex) => ({
      line,
      sortName: getBirdNameForSort(line),
      originalIndex
    }))
    .sort((a, b) => {
      const aOrder = birdOrderIndexes.has(a.sortName) ? birdOrderIndexes.get(a.sortName) : Number.POSITIVE_INFINITY;
      const bOrder = birdOrderIndexes.has(b.sortName) ? birdOrderIndexes.get(b.sortName) : Number.POSITIVE_INFINITY;

      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.originalIndex - b.originalIndex;
    })
    .map(item => item.line);
}

async function sortBirds() {
  try {
    await loadBirdOrder();
    const sortedLines = sortBirdLinesByAppOrder(getInputBirdNames());
    birdSortOutput.textContent = sortedLines.join("\n");
  } catch (error) {
    birdSortOutput.textContent = error.message;
  }
}

if (sortBirdsBtn) {
  sortBirdsBtn.addEventListener("click", sortBirds);
}

if (copySortedBirdsBtn) {
  copySortedBirdsBtn.addEventListener("click", () => {
    const text = birdSortOutput.textContent;

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
