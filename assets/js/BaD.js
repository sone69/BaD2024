document.getElementById('fileInput').addEventListener('change', function (e) {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    const text = event.target.result;
    const numbers = text.split(/\s+/).filter((item) => item.length > 0);
    const result = findLargestPuzzle(numbers);
    document.getElementById('result').innerText = result;
  };

  reader.readAsText(file);
});

function findLargestPuzzle(numbers) {
  let result = numbers[0];

  let usedNumbers = [false];

  for (let i = 1; i < numbers.length; i++) {
    let currentMax = null;
    let currentIndex = -1;

    for (let j = 0; j < numbers.length; j++) {
      if (usedNumbers[j]) continue;

      let number = numbers[j];
      if (result.slice(-2) === number.slice(0, 2)) {
        if (!currentMax || number > currentMax) {
          currentMax = number;
          currentIndex = j;
        }
      }
    }

    if (currentIndex !== -1) {
      result += currentMax.slice(2);
      usedNumbers[currentIndex] = true;
    }
  }

  return result;
}

const numbers = readNumbersFromFile('source.txt');

const largestPuzzle = findLargestPuzzle(numbers);
console.log(largestPuzzle);
