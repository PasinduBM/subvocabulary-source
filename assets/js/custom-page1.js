var card1 = ['Card1', 'Card2', 'Card3'];
var card2 = ['Card4', 'Card5', 'Card6'];
var card3 = ['Card7', 'Card8', 'Card9'];
window.onload = function() {
  const columns = document.querySelectorAll('.column');
  columns.forEach((column, index) => {
  switch (index) {
    case 0:
      card1.forEach(card => {
        const chip = document.createElement('div');
		chip.setAttribute('id',card.concat('-','1'));
        chip.classList.add('card');
        chip.setAttribute('draggable', true);
        chip.textContent = card;
        chip.addEventListener('dragstart', dragStart);
        column.appendChild(chip);
      });
      break;
    case 1:
      card2.forEach(card => {
        const chip = document.createElement('div');
		chip.setAttribute('id',card.concat('-','2'));
        chip.classList.add('card');
        chip.setAttribute('draggable', true);
        chip.textContent = card;
        chip.addEventListener('dragstart', dragStart);
        column.appendChild(chip);
      });
      break;
    case 2:
      card3.forEach(card => {
        const chip = document.createElement('div');
		chip.setAttribute('id',card.concat('-','3'));
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
var fromColumnNo=null;

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
    chip.setAttribute('id',sourceColName.concat('-',targetColNo));
    target.appendChild(chip);
    updateArrays(word,sourceColName,sourceColNo, targetColNo);
  }

function updateArrays(word,sourceColName,sourceColNo, targetColNo) {
	
  const cardArray = [card1, card2, card3];
  targetColId = parseInt(targetColNo);
  sourceColNo = parseInt(sourceColNo);
  
  let oldArray, newArray;
  oldArray = cardArray[sourceColNo-1];
  newArray = cardArray[targetColId-1];
  const index = oldArray.indexOf(word);
  oldArray = oldArray.splice(index, 1);
  newArray.push(word);
}
