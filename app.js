/*
write your code here

list of all regions
externalService.getRegionsList();
list of all languages
externalService.getLanguagesList();
get countries list by language
externalService.getCountryListByLanguage()
get countries list by region
externalService.getCountryListByRegion()
*/

//CREATING HTML STRUCTURE----------------------------------------------------------
let app_root = document.getElementById('app-root');
let header = document.createElement('div');
header.id = 'header';
app_root.appendChild(header);

let h2 = document.createElement('h2');
h2.innerHTML = 'Countries Search';
header.appendChild(h2);

let options = document.createElement('div');
options.id = 'options';
header.appendChild(options);

let input = document.createElement('input');
let input2 = document.createElement('input');
let br = document.createElement('BR');
let label = document.createElement('label');
let label2 = document.createElement('label');
let br2 = document.createElement('BR');
let select = document.createElement('select');

function createRadioButtons(inp, val, lab, tex) {
  inp.type = 'radio';
  inp.name = 'radio';
  inp.value = val;
  lab.innerHTML = tex;
}

createRadioButtons(input, 'Reg', label, 'By Region');
createRadioButtons(input2, 'Lang', label2, 'By Language');
insertToPage();

function insertToPage() {
  let arr = [input, label, br, input2, label2, br2, select];
  for (let i = 0; i < arr.length; i++) {
    options.appendChild(arr[i]);
  }
}

let option = document.createElement('option');
option.innerHTML = 'Select Value';
select.append(option);
select.disabled = true;

let p = document.createElement('p');
p.innerHTML = 'Please choose type of search:';
header.appendChild(p);

let p2 = document.createElement('p');
p2.innerHTML = 'Please choose type search query:';
header.appendChild(p2);

let main_content = document.createElement('div');
main_content.id = 'main_content';
app_root.appendChild(main_content);

let warning_message = document.createElement('p');
warning_message.id = 'warning_message';
warning_message.innerHTML = 'No items, please chooose search query';

let table = document.createElement('table');
let thead = document.createElement('thead');
table.appendChild(thead);

let tr = document.createElement('tr');
thead.appendChild(tr);

let names = ['Country name', 'Capital', 'World Region', 'Languages', 'Area', 'Flag'];
for (let i = 0; i < 6; i++) {
  let td = document.createElement('td');
  td.innerHTML = names[i];
  if (names[i] === 'Country name') {
    td.innerHTML = names[i];
    let span = document.createElement('span');
    span.innerHTML = '↑';
    span.id = 'Country';
    span.onclick = changeSpanCountries;
    td.appendChild(span);
  } else if (names[i] === 'Area') {
    let span = document.createElement('span');
    span.innerHTML = '↕';
    span.id = 'Area';
    span.onclick = changeSpanAreas;
    td.appendChild(span);
  }
  tr.appendChild(td);
}

//FUNCTIONALITY FOR RADIOBUTTONS--------------------------------------------------------------------
function clickRadioButton(eventObj) {
  select.disabled ? select.disabled = false : clearSelectList();
  let val = [];
  eventObj.target.value === 'Reg' ? val = externalService.getRegionsList() : val = externalService.getLanguagesList();
  fillSelectList(val);
  table.remove();
  main_content.appendChild(warning_message);
}

function clearSelectList() {
  let opts = document.getElementsByTagName('option');
  let leng = opts.length;
  for (let i = 1; i < leng; i++) {
    opts[1].remove();
  }
}

function fillSelectList(val) {
  for (let i = 0; i < val.length; i++) {
    let newOption = document.createElement('option');
    newOption.innerHTML = val[i];
    select.append(newOption);
  }
}


let inputs = document.getElementsByTagName('input');
for (let i = 0; i < inputs.length; i++) {
  inputs[i].onclick = clickRadioButton;
}

//FUNCTIONALITY FOR SELECTLIST--------------------------------------------------------------------
function changeOption() {
  if (select.selectedIndex === 0) {
    main_content.appendChild(warning_message);
    table.remove();
  } else {
    warning_message.remove();
    creatingTable(0);
  }
}

select.addEventListener('change', changeOption);

//FUNCTIONALITY FOR Table--------------------------------------------------------------------

function creatingTable(num) {
  main_content.appendChild(table);
  if (input.checked) {
    let check = externalService.getCountryListByRegion(select.value);
    if (num === 0) {
      createRowsANDColumns(sorting(check, 'name'));
    } else if (num === 1) {
      createRowsANDColumns(sortingReverse(check, 'name'));
    } else if (num === 3) {
      createRowsANDColumns(sorting(check, 'area'));
    } else if (num === 2) {
      createRowsANDColumns(sortingReverse(check, 'area'));
    }
  } else {
    let check = externalService.getCountryListByLanguage(select.value);
    if (num === 0) {
      createRowsANDColumns(sorting(check, 'name'));
    } else if (num === 1) {
      createRowsANDColumns(sortingReverse(check, 'name'));
    } else if (num === 3) {
      createRowsANDColumns(sorting(check, 'area'));
    } else if (num === 2) {
      createRowsANDColumns(sortingReverse(check, 'area'));
    }
  }
}

function createRowsANDColumns(check) {
  if (document.getElementsByClassName('tbody')) {
    deleteColumnsANDRows()
  }
  let tbody = document.createElement('tbody');
  table.appendChild(tbody);
  for (let i = 0; i < check.length; i++) {
    let newTR = document.createElement('tr');
    newTR.setAttribute('class', 'newTR');
    tbody.appendChild(newTR);

    let newTD = document.createElement('td');
    newTD.innerHTML = check[i].name;
    newTD.setAttribute('class', 'newTD');
    newTR.appendChild(newTD);

    newTD = document.createElement('td');
    newTD.innerHTML = check[i].capital;
    newTD.setAttribute('class', 'newTD');
    newTR.appendChild(newTD);

    newTD = document.createElement('td');
    newTD.innerHTML = check[i].region;
    newTD.setAttribute('class', 'newTD');
    newTR.appendChild(newTD);

    newTD = document.createElement('td');
    newTD.innerHTML = Object.values(check[i].languages);
    newTD.setAttribute('class', 'newTD')
    newTR.appendChild(newTD);

    newTD = document.createElement('td');
    newTD.innerHTML = check[i].area;
    newTD.setAttribute('class', 'newTD');
    newTR.appendChild(newTD);

    img = document.createElement('img');
    // img.src = check[i].flagURL;
    img.alt = 'flag';
    newTD.setAttribute('class', 'img');
    newTR.appendChild(img);
  }
}

function deleteColumnsANDRows() {
  let tds = document.getElementsByClassName('newTD');
  for (i = 1; i = tds.length; i++) {
    tds[0].remove();
  }
  let trs = document.getElementsByClassName('newTR');
  for (i = 1; i = trs.length; i++) {
    trs[0].remove();
  }
}

//SORTING FUNCTIONALITY--------------------------------------------------------------------

function sorting(check, field) {
  return check.sort((a, b) => a[field] > b[field] ? 1 : -1);
}

function sortingReverse(check, field) {
  return check.sort((a, b) => a[field] > b[field] ? 1 : -1).reverse();
}

function changeSpanCountries() {
  let span = document.getElementById('Country');
  let span2 = document.getElementById('Area');
  span2.innerHTML = '↕';
  if (span.innerHTML === '↑') {
    span.innerHTML = '↓';
    creatingTable(1);
  } else if (span.innerHTML === '↓') {
    span.innerHTML = '↑';
    creatingTable(0);
  } else {
    span.innerHTML = '↑';
    creatingTable(0);
  }
}

function changeSpanAreas() {
  let span = document.getElementById('Area');
  let span2 = document.getElementById('Country');
  span2.innerHTML = '↕';
  if (span.innerHTML === '↑') {
    span.innerHTML = '↓';
    creatingTable(3);
  } else if (span.innerHTML === '↓') {
    span.innerHTML = '↑';
    creatingTable(2);
  } else {
    span.innerHTML = '↑';
    creatingTable(2);
  }
}
