let cachedBirds = null;

async function loadBirds() {
  if (cachedBirds) return cachedBirds;

  const response = await fetch("app.js?v=33", { cache: "no-cache" });
  const appScript = await response.text();
  const birdsStart = appScript.indexOf("const birds = [");
  const birdsEnd = appScript.indexOf("\n];", birdsStart);

  if (birdsStart === -1 || birdsEnd === -1) {
    throw new Error("鳥データを読み込めませんでした。");
  }

  const birdsSource = appScript.slice(birdsStart, birdsEnd + 3);
  cachedBirds = Function(`${birdsSource}; return birds;`)();

  return cachedBirds;
}

function getBirdNameForSort(line) {
  return line.split(/[\s\u3000]+/)[0];
}
