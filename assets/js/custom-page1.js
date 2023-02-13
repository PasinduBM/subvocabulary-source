var learningList = [];
var newList = [];
var knowList = [];
var saveButton;
var previousLearningList = [...learningList];
var previousNewList = [...newList];
var previousKnowList = [...knowList];

{

window.onload = function () {
  initLocalStorage();
  saveButton = document.getElementById('saveButton');
  knowList = localStorage.getItem('KnowWords').split(',').filter(function (element) {
    return element.trim() !== '';
  });
  newList = localStorage.getItem('NewWords').split(',').filter(function (element) {
    return element.trim() !== '';
  });
  learningList = localStorage.getItem('LearningWords').split(',').filter(function (element) {
    return element.trim() !== '';
  });
  


  //===============================================================================
  const columns = document.querySelectorAll('.column');
  columns.forEach((column, index) => {
    switch (index) {
      case 0:
        learningList.forEach(card => {
          const chip = document.createElement('div');
          chip.setAttribute('id', card.concat('-', '1'));
          chip.classList.add('card');
          chip.setAttribute('draggable', true);
          chip.textContent = card;
          chip.addEventListener('dragstart', dragStart);
          column.appendChild(chip);
        });
        break;
      case 1:
        newList.forEach(card => {
          const chip = document.createElement('div');
          chip.setAttribute('id', card.concat('-', '2'));
          chip.classList.add('card');
          chip.setAttribute('draggable', true);
          chip.textContent = card;
          chip.addEventListener('dragstart', dragStart);
          column.appendChild(chip);
        });
        break;
      case 2:
        knowList.forEach(card => {
          const chip = document.createElement('div');
          chip.setAttribute('id', card.concat('-', '3'));
          chip.classList.add('card');
          chip.setAttribute('draggable', true);
          chip.textContent = card;
          chip.addEventListener('dragstart', dragStart);
          column.appendChild(chip);
        });
        break;
    }

    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
  });
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.textContent);
  e.dataTransfer.setData('ColumnName', e.currentTarget.id);
}
var fromColumnNo = null;

function dragOver(e) {

  localStorage.setItem("SourceColumn", e.currentTarget.id);
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const word = e.dataTransfer.getData('text/plain');
  const colName = e.dataTransfer.getData('ColumnName');
  const sourceColDetails = colName.split("-");
  const sourceColName = sourceColDetails[0];
  const sourceColNo = sourceColDetails[1];

  var target = e.target;
  while (!target.classList.contains('column')) {
    target = target.parentNode;
  }

  const targetColNo = target.id.slice(-1);
  var chip = document.getElementById(colName);
  chip.setAttribute('id', sourceColName.concat('-', targetColNo));
  target.appendChild(chip);
  updateArrays(word, sourceColName, sourceColNo, targetColNo);
  checkDifference();
}

function updateArrays(word, sourceColName, sourceColNo, targetColNo) {

  const cardArray = [learningList, newList, knowList];
  targetColId = parseInt(targetColNo);
  sourceColNo = parseInt(sourceColNo);

  let oldArray, newArray;
  oldArray = cardArray[sourceColNo - 1];
  newArray = cardArray[targetColId - 1];
  const index = oldArray.indexOf(word);
  oldArray = oldArray.splice(index, 1);
  newArray.push(word);
}

function initLocalStorage() {
  let check = localStorage.getItem('RemoveWords');

  if (check) {
      console.log('Remove Words exists');
  } else {
      console.log('Remove Words Dont is not found');
      localStorage.setItem('RemoveWords', '')
  }

  check = localStorage.getItem('NewWords');

  if (check) {
      console.log('Remove Words exists');
  } else {
      console.log('New Words Dont is not found');
      localStorage.setItem('NewWords', '')
  }

  check = localStorage.getItem('KnowWords');

  if (check) {
      console.log('Remove Words exists');
  } else {
      console.log('Know words Dont is not found');
      localStorage.setItem('KnowWords', '')
  }

  check = localStorage.getItem('LearningWords');

  if (check) {
      console.log('Learning Words exists');
  } else {
      console.log('New Words Dont is not found');
      localStorage.setItem('LearningWords', '')
  }
}

}
function saveState() {
  previousLearningList = [...learningList];
  previousNewList = [...newList];
  previousKnowList = [...knowList];
  removeWordList = knowList + learningList;
  localStorage.setItem('RemoveWords', knowList.concat(learningList));
  localStorage.setItem('NewWords', newList);
  localStorage.setItem('KnowWords',knowList);
  localStorage.setItem('LearningWords',learningList);
  checkDifference();
}

function checkDifference() {
  if (JSON.stringify(learningList) !== JSON.stringify(previousLearningList) ||
    JSON.stringify(newList) !== JSON.stringify(previousNewList) ||
    JSON.stringify(knowList) !== JSON.stringify(previousKnowList)) {
    saveButton.classList.remove('btn-warning');
    saveButton.classList.add('btn-danger');
  } else {
    saveButton.classList.remove('btn-danger');
    saveButton.classList.add('btn-warning');
  }
}

function goScrolling() {
  let section2 = document.getElementById('lableHedings');
  section2.scrollIntoView({ behavior: 'smooth' });
}
