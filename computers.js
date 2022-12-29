var computersTableElement = document.getElementById("computers-table");
var computersTableBodyElement = document.getElementById("computers-table-body");
var saveComputerModalElement = document.getElementById("save-computer-modal");
var saveComputerModalCloseButtonElement = document.getElementById(
  "save-computer-modal-close-button"
);
var computerImageElement = document.getElementById("computer-image");
var computerImageShowElement = document.getElementById("computer-image-show");
var computerCategoryElement = document.getElementById("computer-category");
var computerNameElement = document.getElementById("computer-name");
var computerPriceElement = document.getElementById("computer-price");
var computerIsNewElement = document.getElementById('computer-isNew');
var computerDescriptionElement = document.getElementById(
  "computer-description"
);
var computerRamElement = document.getElementById("computer-ram");
var computerCpuElement = document.getElementById("computer-cpu");
var computerDriveElement = document.getElementById("computer-drive");
var computerDriveTypeElement = document.getElementById("computer-drive-type");
var computerOsElement = document.getElementById("computer-os");
var computerVideoCardElement = document.getElementById("computer-video-card");
var computerLoadingElement = document.getElementById("computer-loading");
var computerImageModalElement = document.getElementById("computer-image-modal");
var computerImageModalShowElement = document.getElementById(
  "computer-modal-image-show"
);
var saveComputerHeaderMessageElement = document.getElementById(
  "save-computer-header-message"
);
var mainContentElement = document.getElementById("main-content");

var editMode = false;
var selectedComputerId = 0;
var computers = [];
var computersString = localStorage.getItem("computers");
if (computersString == null) {
} else {
  computers = JSON.parse(computersString);
}

var computersGlobal = computers.slice();

var loggedInUserId = localStorage.getItem("logged-in-user-id");
if (loggedInUserId == null) {
  computers = [];
  window.location.href = "index.html";
} else {
  mainContentElement.style.display = "block";
}

var userComputers = [];
for (let i = 0; i < computers.length; i++) {
  const c = computers[i];
  if (c.userId == loggedInUserId) {
    userComputers.push(c);
  }
}

computers = userComputers;

var usersString = localStorage.getItem("users");
var users = JSON.parse(usersString);

function onNewComputer() {
  editMode = false;
  selectedComputerId = 0;
  saveComputerModalElement.style.display = "block";
  saveComputerHeaderMessageElement.innerHTML = "Yeni";
}

var categories = [];
var categoriesString = localStorage.getItem("categories");
if (categoriesString == null) {
} else {
  categories = JSON.parse(categoriesString);
}

saveComputerModalCloseButtonElement.addEventListener("click", function (event) {
  saveComputerModalElement.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === computerImageModalElement) {
    computerImageModalElement.style.display = "none";
  }
});

computerCategoryElement.innerHTML = "";
var computerCategoryElementHTML = "";
for (let i = 0; i < categories.length; i++) {
  const c = categories[i];
  computerCategoryElementHTML +=
    "<option value = '" + c.id + "'>" + c.name + "</option>";
}

computerCategoryElement.innerHTML = computerCategoryElementHTML;

function refreshComputers() {
  computersTableBodyElement.innerHTML = '';
    var computersTableBodyElementHtml = '';
    for (let index = 0; index < computers.length; index++) {
        const computer = computers[index];
        computersTableBodyElementHtml += '<tr><td>' + computer.id;
        computersTableBodyElementHtml += '</td><td>' + computer.name;
        computersTableBodyElementHtml += '</td><td><img class="computer-image" src="' +
            computer.imagePath;
        computersTableBodyElementHtml += '" onclick="onImageSelected(\'' + computer.imagePath + '\')" /></td><td>' + computer.price;

        computersTableBodyElementHtml += ' AZN</td><td> <button class="btn btn-danger"' +
            ' onclick="onDeleteComputer(' + computer.id + ')" >Sil</button>  ' +
            '<button class="btn btn-primary" onclick="onEditComputer(' + computer.id +
            ')">Redaktə</button>  ';
        computersTableBodyElementHtml += '</td></tr>';
    }
    computersTableBodyElement.innerHTML = computersTableBodyElementHtml;
}

refreshComputers();


function onComputerImageChange(imageInputElement){
    var imageValue = imageInputElement.value ;
    imageValue = imageValue.trim();
    if(imageValue == ''){
        computerImageShowElement.style.display = 'none';
    }else{
        computerImageShowElement.style.display = 'block';
        computerImageShowElement.src = imageValue;
    }
}

function onSaveComputer(event){
    event.preventDefault();
    var computer = {};
    var computerId = 0;
    for(let i = 0; i < computersGlobal.length; i++){
        const c = computersGlobal[i];
        if(c.id > computerId){
            computerId = c.id;
        }
    }

    computerId++;
    computer.id = computerId;
    computer.name = computerNameElement.value;
    computer.price = Number(computerPriceElement.value);
    computer.imagePath = computerImageElement.value;
    computer.isNew = computerIsNewElement.value;
    computer.description = computerDescriptionElement.value;
    computer.ram = Number(computerRamElement.value);
    computer.cpu = computerCpuElement.value;
    computer.drive = Number(computerDriveElement.value);
    computer.driveType = computerDriveTypeElement.value;
    computer.os = computerOsElement.value;
    computer.videoCard = Number(computerVideoCardElement.value);
    computer.categoryId = Number(computerCategoryElement.value);
    computer.userId = Number(loggedInUserId);
    console.log(computer);

    for(let j = 0; j < users.length;j++){
        const u = users[j];
        if(u.id === computer.userId){
            computer.phone = u.phone;
            break;
        }
    }

    if(editMode){
        // SaveComputer
        computer.id = selectedComputerId;
        for(let i = 0; i < computersGlobal.length;i++){
            const c = computersGlobal[i];
            if(c.id == selectedComputerId){
                computersGlobal[i] = computer;
                break;
            }
        }

        alert('Komputer ugurla redakte olundu');
    }else{
        // Add computer
        computersGlobal.push(computer);
        alert('Komputer ugurla qeydiyyat olundu');
    }

    localStorage.setItem('computers', JSON.stringify(computersGlobal));
    window.location.reload();

    userComputers = [];
    for(let i = 0; i < computersGlobal.length;i++){
        const computer = computersGlobal[i];
        if(computer.userId == loggedInUserId){
            userComputers.push(computer);
        }
    }

    computers = userComputers;

    refreshComputers();
}


function onDeleteComputer(computerrId){
  var result = confirm('Komputeri silmeye eminsiniz?');
  if(result){
    for(let i = 0; i < computersGlobal.length; i++){
      const c = computersGlobal[i];
      if(c.id === computerrId){
        computersGlobal.splice(i,1);
        break;
      }
    }

    

    localStorage.setItem('computers',JSON.stringify(computersGlobal));
    userComputers = [];
    for(let i = 0; i < computersGlobal;i++){
      const computer = computersGlobal[i];
      if(computer.userId == loggedInUserId){
        userComputers.push(computer);
      }
    }

    computers = userComputers;
    alert('Komputer ugurla silindi');
    window.location.reload();
  }
}

function onEditComputer(computerId){
    editMode = true;
    selectedComputerId = computerId;
    saveComputerModalElement.style.display = 'block';
    saveComputerHeaderMessageElement.innerHTML = 'Redakte';
    setTimeout(() => {
      var selectedComputer = {};
      for(let i = 0 ; i < computersGlobal.length;i++){
         const computer = computersGlobal[i];
         if(computer.id == computerId){
          selectedComputer = computer;
          break;
         }
      }

      computerCategoryElement.value = selectedComputer.categoryId;
      computerNameElement.value = selectedComputer.name;
      computerPriceElement.value = selectedComputer.price;
      computerDescriptionElement.value = selectedComputer.description;
      computerIsNewElement.value = selectedComputer.isNew;
      computerImageElement.value = selectedComputer.imagePath;

      var imageValue = selectedComputer.imagePath;
      if(imageValue == ''){
        computerImageShowElement.style.display = 'none';
      }else{
        computerImageShowElement.style.display = 'block';
        computerImageShowElement.src = imageValue;
      }

      computerRamElement.value = selectedComputer.ram;
      computerCpuElement.value = selectedComputer.cpu;
      computerDriveElement.value = selectedComputer.drive;
      computerDriveTypeElement.value = selectedComputer.driveType;
      computerOsElement.value = selectedComputer.os;
      computerVideoCardElement.value = selectedComputer.videoCard;
    }, 1000);
}

function resetComputerForm(){
  computerImageShowElement.style.display = 'none';
}

var computersTableBodyElementHtml = '';
function addComputersToPage(computerLocal){
    for (let index = 0; index < computers.length; index++) {
      const computer = computers[index];
      computersTableBodyElementHtml += '<tr><td>' + computer.id;
      computersTableBodyElementHtml += '</td><td>' + computer.name;
      computersTableBodyElementHtml += '</td><td><img class="computer-image" src="' +
          computer.imagePath;
      computersTableBodyElementHtml += '" onclick="onImageSelected(\'' + computer.imagePath + '\')" /></td><td>' + computer.price;

      computersTableBodyElementHtml += ' AZN</td><td> <button class="btn btn-danger"' +
          ' onclick="onDeleteComputer(' + computer.id + ')" >Sil</button>  ' +
          '<button class="btn btn-primary" onclick="onEditComputer(' + computer.id +
          ')">Redaktə</button>  ';
      computersTableBodyElementHtml += '</td></tr>';
  }
   computersTableBodyElement.innerHTML = computersTableBodyElementHtml;
}


