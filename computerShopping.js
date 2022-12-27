var computerCategoriesElement = document.getElementById(
  "computer-categories-div"
);
var computersElement = document.getElementById("computers-div");
var computerLoading = document.getElementById("computers-loading");
var basketComputersCount = document.getElementById("basket-computers-count");
var openBasketButton = document.getElementById("open-basket-button");
var computerModalNameElement = document.getElementById("computer-modal-name");
var computerModalDescriptionElement = document.getElementById(
  "computer-modal-description"
);
var computerModalPriceElement = document.getElementById("computer-modal-price");
var computerModalPhoneElement = document.getElementById("computer-modal-phone");
var computerModalIsNewElement = document.getElementById("computer-modal-isNew");
var computerModalRamElement = document.getElementById("computer-modal-ram");
var computerModalCpuElement = document.getElementById("computer-modal-cpu");
var computerModalDriveElement = document.getElementById("computer-modal-drive");
var computerModalDriveTypeElement = document.getElementById(
  "computer-modal-drive-type"
);
var computerModalOSElement = document.getElementById("computer-modal-os");
var computerModalVideoCardElement = document.getElementById(
  "computer-modal-video-card"
);
var computersDetailsModal = document.getElementById("computers-details-modal");
var computersDetailsModalContent = document.getElementById(
  "computers-details-modal-content"
);
var basketModalElement = document.getElementById("basket-modal");
var basketModalContentElement = document.getElementById("basket-modal-content");
var basketModalCloseButton = document.getElementById(
  "basket-modal-close-button"
);
var basketComputersTableBodyElement = document.getElementById(
  "basket-computers-table-body"
);
var basketTotalPriceElement = document.getElementById(
  "basket-total-price-content"
);
var confirmOrderModalElement = document.getElementById("confirm-order-modal");
var confirmOrderModalContentElement = document.getElementById(
  "confirm-order-modal-content"
);
var customerNameElement = document.getElementById("customer-name");
var customerAddressElement = document.getElementById("customer-address");
var customerPhoneElement = document.getElementById("customer-phone");
var customerEmailElement = document.getElementById("customer-email");
var customerOrderNoteElement = document.getElementById("customer-order-note");
var computerSearchInputElement = document.getElementById(
  "computer-search-input"
);
var computerModalImageContainer = document.getElementById(
  "computer-modal-image-container"
);
var computersLoadingNext = document.getElementById("computers-loading-next");
var confirmOrderModalCloseButton = document.getElementById('confirm-order-modal-close-button');

var users = [];
var categories = [];
var categoriesGlobal = [];
var computers = [];
var computersGlobal = [];
var computersSelectedGlobal = [];
var computersSelectedGlobalForSearch = [];
var basketComputers = [];
var currentSelectedCategoryId = 0;

var allComputersLoaded = false;
var begin = 0;
var length = 25;
var allowScroll = false;

function loadDataFromLocalStorage() {
  var usersString = localStorage.getItem("users");
  var categoriesString = localStorage.getItem("categories");
  var computersString = localStorage.getItem("computers");

  if (usersString == null) {
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    users = JSON.parse(usersString);
  }

  if (categoriesString == null) {
    localStorage.setItem("categories", JSON.stringify(categories));
  } else {
    categories = JSON.parse(categoriesString);
    categoriesGlobal = categories.slice();
  }

  if (computersString == null) {
    localStorage.setItem("computers", JSON.stringify(computers));
  } else {
    computers = JSON.parse(computersString);
    computersGlobal = computers.slice();
  }

  var basketComputersString = localStorage.getItem("basketComputers");
  if (basketComputersString == null) {
    localStorage.setItem("basketComputers", "[]");
  } else {
    basketComputers = JSON.parse(basketComputersString);
  }

  showBasketComputersCount();
}

loadDataFromLocalStorage();

function showBasketComputersCount() {
  basketComputersCount.innerHTML = basketComputers.length;
}

var computerCategoriesElementHTML = "";

function loadComputerCategories() {
  computerCategoriesElementHTML = "<ul class = 'list-group' >";
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    computerCategoriesElementHTML += "<li class = 'list-group-item "+" list-group-item-action' id = 'computer-category-"+c.id+"' onclick = 'onCategorySelected("+c.id+")' >"+
    c.name+"</li>";
  }

  computerCategoriesElementHTML += "</ul>";
  computerCategoriesElement.innerHTML = computerCategoriesElementHTML;
}


loadComputerCategories();

function onCategorySelected(categoryId){
    if(currentSelectedCategoryId == categoryId){

    }else{
        currentSelectedCategoryId = categoryId;
        computerLoading.style.display = 'block';
        computersElement.innerHTML = '';
        computersElement.style.display = 'none';
        begin = 0;
        allComputersLoaded = false;
        allowScroll = false;
        for(let i = 0; i < categories.length; i++){
            const c = categories[i];
            if(c.id == categoryId){
                document.getElementById('computer-category-'+c.id).style.color = 'blue';
                document.getElementById('computer-category-'+c.id).style.fontWeight = 'bold';
            }else{
                document.getElementById('computer-category-'+c.id).style.color = 'black';
                document.getElementById('computer-category-'+c.id).style.fontWeight = 'normal';
            }

            setTimeout(() => {
                computerLoading.style.display = 'none';
                var computersSelected = [];
                for(let i = 0; i < computers.length;i++){
                    const c = computers[i];
                    if(c.categoryId === categoryId){
                        computersSelected.push(c);
                    }
                }

                for(let i = 0 ; i < computersSelected.length; i++){
                    const c = computersSelected[i];
                    for(let j = 0; j < users.length;j++){
                        const u = users[j];
                        if(u.id === c.userId){
                            c.phone = u.phone;
                            break;
                        }
                    }
                }

                computersSelectedGlobal = computersSelected.slice();
                computersSelectedGlobalForSearch = computersSelected.slice();
                var computersElementHTML = "";
                if(computersSelected.length <= length){
                    allComputersLoaded = true;
                }

                computersSelected = computersSelected.slice(begin, length);

                for(var i = 0 ; i < computersSelected.length; i++){
                    const c = computersSelected[i];
                    computersElementHTML += "<div class = 'computer-card-container' >"+
                    "<div class = 'computer-card' >"+
                    "<div class = 'computer-image' onclick = 'onComputerSelected("+c.id+")' style = 'background-image: url("+c.imagePath+");'></div>"+
                    "<div class = 'computer-data'><div class = 'computer-name' title = '"+c.name+"'>"+c.name+"</div>"+
                    "<div class = 'computer-description' title = '"+c.description+"'>"+c.description+"</div>"+
                    "<div class = 'computer-price' title = '"+c.price+" AZN' >"+c.price+" AZN</div>"+
                    "<div class = 'computer-isNew' >"+(c.isNew ? 'Beli' : 'Xeyr')+" </div>"+
                    "<div class = 'user-phone' title = '"+c.phone+"' >"+c.phone+" </div>"+
                    "<div class = 'add-to-basket-div'><button class = 'btn btn-primary' "+ " onclick = 'onAddToBasket("+c.id+")'>Sebete at</button></div> "+
                    "</div></div></div>"; 

                }

                computersElement.innerHTML = computersElementHTML;
                computersElement.style.display = 'block';
                if(computersSelected.length === 0){
                    computersElement.innerHTML = "<h2 class = 'not-found'>Bu kateqoriyada komputer yoxdur</h2> ";
                }
            }, 1000);
        }
    }
}

onCategorySelected(1); 

function onComputerSelected(computerId){
    computersDetailsModal.style.display = 'block';
    var selectedComputer = null;
    for(let i = 0; i < computers.length;i++){
      const c = computers[i];
      if(c.id === computerId){
        selectedComputer = c;
        break;
      }
    }

    computerModalImageContainer.style.backgroundImage = "url('"+selectedComputer.imagePath+"')";
    computerModalNameElement.innerHTML = "Name: "+ selectedComputer.name;
    computerModalDescriptionElement.innerHTML = "Description: " + selectedComputer.description;
    computerModalPriceElement.innerHTML = "Price: "+selectedComputer.price;
    computerModalPhoneElement.innerHTML = "Phone: "+selectedComputer.phone;
    computerModalIsNewElement.innerHTML = "IsNew: "+ (selectedComputer.isNew ? 'Beli' :' Xeyr');
    computerModalRamElement.innerHTML = "Ram: " +selectedComputer.ram +" GB";
    computerModalCpuElement.innerHTML = "CPU: "+selectedComputer.cpu;
    computerModalDriveElement.innerHTML = "Drive: "+selectedComputer.drive;
    computerModalDriveTypeElement.innerHTML = "Drive type: "  +  selectedComputer.driveType == 'hdd' ? 'HDD' : 'SSD';
    computerModalOSElement.innerHTML = "OS: "+selectedComputer.os ;
    computerModalVideoCardElement.innerHTML = "Video card:"+ selectedComputer.videoCard +" GB";
}

window.addEventListener('click', function(){
  if(event.target === computersDetailsModal){
    computersDetailsModal.style.display = 'none';
  }
});

function onAddToBasket(computerId){
    openBasketButton.style.display = 'none';
    setTimeout(() => {
       openBasketButton.style.display = 'inline-block';
       var existsInBasket = false;
       for(let i = 0; i < basketComputers.length; i++){
        const b = basketComputers[i];
        if(b.computer.id === computerId){
          b.count++;
          existsInBasket = true;
          break;
        }
       }

       if(existsInBasket){
          
       }else{
            var selectedComputer = null;
            for(let i = 0; i < computers.length;i++){
              const c = computers[i];
              if(c.id  === computerId){
                selectedComputer = c;
                break;
              }
            }

            basketComputers.push({count:1, computer: selectedComputer});
       }

       showBasketComputersCount();
       localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
    }, 1000);
}

var basketComputersTableBodyElementHTML = '';

function refreshComputersBasket(){
  basketComputersTableBodyElement.innerHTML = '';
  basketComputersTableBodyElementHTML = '';
  for(let i = 0 ; i < basketComputers.length; i++){
      const b = basketComputers[i];
      basketComputersTableBodyElementHTML += '<tr><td>' + b.computer.id;
      basketComputersTableBodyElementHTML += '</td><td><img class = "basket-computer-image" src="'+
      b.computer.imagePath+' "> ';
      basketComputersTableBodyElementHTML += '</td><td>'+b.computer.name;
      basketComputersTableBodyElementHTML += '</td><td>' +b.computer.price;
      basketComputersTableBodyElementHTML += ' AZN</td><td><input min="1" max="10000" type="number" value="'+
      b.count+'" '+ ' onchange = "computerCountChanged(this,'+b.computer.id+')" onkeypress="checkCount(event)" >';
      basketComputersTableBodyElementHTML += '</td><td id = "computer-total-price-'
      +b.computer.id+'">'+ (b.computer.price * b.count);
      basketComputersTableBodyElementHTML += ' AZN</td><td><button onclick = "deleteBasketComputer(' +
      b.computer.id+ ')" class = "btn btn-danger">Sil</button></td><tr>';  
  }

  basketComputersTableBodyElement.innerHTML = basketComputersTableBodyElementHTML;
}

function calculateBasketTotalPrice(){
  var totalPrice = 0;
  for(let i = 0; i < basketComputers.length; i++){
    const b = basketComputers[i];
    totalPrice += b.count * b.computer.price;
  }
  basketTotalPriceElement.innerHTML = totalPrice;
}

calculateBasketTotalPrice();

function onOpenBasket(){
  if(basketComputers.length === 0){
    showAlertMessage('Sebet Bosdur!', 1000);
  }else{
    basketModalElement.style.display = 'block';
    refreshComputersBasket();
    calculateBasketTotalPrice();
  }
}

function showAlertMessage(message, duration){
    var messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('alert-message');
    
    var fixedElements = document.getElementById('fixed-elements');
    fixedElements.appendChild(messageElement);
    messageElement.style.display = 'block';
    setTimeout(() => {
      messageElement.style.display = 'none';
      messageElement.remove();
    }, duration);
}

basketModalCloseButton.addEventListener('click', function(){
  setTimeout(() => {
    basketModalElement.style.display = 'none';
  }, 200);
});

function computerCountChanged(countInput, computerId){
    if(countInput.value == '' || countInput.value == '0'){
      countInput.value = '1';
    }

    for(let i = 0; i < basketComputers.length; i++){
      const b = basketComputers[i];
      if(b.computer.id === computerId){
        b.count = Number(countInput.value);
        document.getElementById('computer-total-price-'+b.computer.id).innerHTML = "" + (b.count * b.computer.price)+" AZN";
        break;
      }
    }

    localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
    calculateBasketTotalPrice();
}

function deleteBasketComputer(computerId){
    for(let i = 0; i < basketComputers.length; i++){
      const b = basketComputers[i];
      if(b.computer.id === computerId){
        basketComputers.splice(i,1);
        break;
      }
    }

    refreshComputersBasket();
    localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
    calculateBasketTotalPrice();
    hideAndShowBasketButton();
    if(basketComputers.length === 0){
      setTimeout(() => {
        basketModalElement.style.display = 'none';
      }, 200);
    }
}

function hideAndShowBasketButton(){
  openBasketButton.style.display = 'none';
  setTimeout(() => {
    openBasketButton.style.display = 'block';
    showBasketComputersCount();
  }, 200);
}

function clearBasket(){
    basketComputers.splice(0, basketComputers.length);
    refreshComputersBasket();
    localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
    calculateBasketTotalPrice();
    hideAndShowBasketButton();
    setTimeout(() => {
      basketModalElement.style.display = 'none';
    }, 500);
}

function fillCustomerInformation(){
  var customerString = localStorage.getItem('order-customer');
  var orderCustomer = {};
  if(customerString == null){

  }else{
    orderCustomer = JSON.parse(customerString);
    customerNameElement.value = orderCustomer.name;
    customerAddressElement.value = orderCustomer.address;
    customerPhoneElement.value = orderCustomer.phone;
    customerEmailElement.value = orderCustomer.email;
    customerOrderNoteElement.value = orderCustomer.orderNote;
  }
}

function openConfirmOrderModalPage(){
    confirmOrderModalElement.style.display = 'block';
    fillCustomerInformation();
}

function confirmOrder(){
  setTimeout(() => {
    basketModalElement.style.display = 'none';
  }, 200);

  setTimeout(() => {
    openConfirmOrderModalPage();
  }, 200);
}

confirmOrderModalCloseButton.addEventListener('click', function(){
  setTimeout(() => {
    confirmOrderModalElement.style.display = 'none';
  }, 200);
});


function onOrderSubmit(event){
  event.preventDefault();
  var orderObject = {};
  orderObject.note = customerOrderNoteElement.value ;
  orderObject.basketComputers = basketComputers;
  var customer = {};
  customer.name = customerNameElement.value;
  customer.address = customerAddressElement.value;
  customer.phone = customerPhoneElement.value;
  customer.email = customerEmailElement.value;
  orderObject.customer = customer;
  orderObject.register = new Date();
  var orders = [];
  var orderString = localStorage.getItem('orders');
  if(orderString == null){
    localStorage.setItem('orders','[]');
  }else{
    orders = JSON.parse(orderString);
  }

  var userIdList = [];
  for(let i = 0; i < orderObject.basketComputers.length;i++){
    const b = basketComputers[i];
    if(userIdList.includes(b.computer.userId)){

    }else{
      userIdList.push(b.computer.userId);
    }
  }

  var orderId = 0;
  for(let i = 0; i < orders.length;i++){
    const order = orders[i];
    if(order.id > orderId){
      orderId = order.id;
    }
  }

  for(let i = 0; i<userIdList.length;i++){
    var orderObjectLocal = {};
    orderId++;
    orderObjectLocal.id = orderId;
    orderObjectLocal.note = orderObject.note;
    orderObjectLocal.basketComputers = [];
    orderObjectLocal.userId = userIdList[i];
    for(let j = 0; j < orderObject.basketComputers.length; j++){
      const b = orderObject.basketComputers[i];
      if(b.computer.userId === userIdList[i]){
        orderObjectLocal.basketComputers.push(b);
      }
    }

    orderObjectLocal.customer = orderObject.customer;
    orderObjectLocal.register = orderObject.register;
    orderObjectLocal.totalPrice = calculateOrderTotalPrice(orderObjectLocal);
    orders.push(orderObjectLocal);
    }

    localStorage.setItem('orders', JSON.stringify(orders));
    customer.orderNote = orderObject.note;
    endOrderRegistration(customer);
}


function calculateOrderTotalPrice(order){
  var totalPrice = 0;
  for(let i = 0; i < order.basketComputers.length; i++){
    const b = order.basketComputers[i];
    totalPrice += b.count * b.computer.price;
  }

  return totalPrice;
}

function endOrderRegistration(customer){
    basketComputers.splice(0, basketComputers.length);
    localStorage.setItem('basketComputers', JSON.stringify(basketComputers));
    hideAndShowBasketButton();
    localStorage.setItem('order-customer', JSON.stringify(customer));
    setTimeout(() => {
      confirmOrderModalElement.style.display = 'none';
    }, 200);

    setTimeout(() => {
      showAlertMessage('Sifarisiniz qeyde alindi!', 2000);
    }, 1000);
}

var computersElementHTML = "";
function addComputersToPage(computersLocal){
  for (var i = 0; i < computersLocal.length; i++) {
		const c = computersLocal[i];
		computersElementHTML += "<div class='computer-card-container' >" +
			"<div class='computer-card' >" +
			"<div class='computer-image' onclick='onComputerSelected(" + c.id + ")' style='background-image:url(" + c.imagePath + ");'></div>" +
			"<div class='computer-data'><div class='computer-name' title='" +
			c.name + "'>" + c.name + "</div>" +
			"<div class='computer-description' title='" +
			c.description + "'>" + c.description + "</div>" +
			"<div class='computer-price' title='" + c.price + " AZN'>" +
			c.price + " AZN</div>" +
			"<div class='computer-new'>" + (c.isNew ? 'Bəli' : 'Xeyr') + "</div>" +
			"<div class='user-phone' title='" + c.phone + "'>" + c.phone + "</div>" +
			"<div class='add-to-basket-div'><button class='btn btn-primary' " +
			"onclick='onAddToBasket(" +
			c.id + ")'>Səbətə at</button></div>" +
			"</div></div></div>";
	}
	computersElement.innerHTML = computersElementHTML;
}

function onSearchKeyDown(event){
  if(event.keyCode == 13){
     begin = 0;
     allComputersLoaded = true;
     computersElement.innerHTML = '';
     computersElement.style.display = 'none';
     computersElement.style.display = 'block';
     setTimeout(() => {
      computerLoading.style.display = 'none';
      computersElementHTML = '';
      var searchValue = event.target.value.toLowerCase();
      searchValue = searchValue.trim();
      var findedComputers = [];
      // Eger butun komputerler axtaris edilerse
      computersSelectedGlobal = computers.slice();
      for(let i = 0; i < computersSelectedGlobal.length; i++){
        const c = computersSelectedGlobal[i];
        if(c.name.toLowerCase().includes(searchValue)){
          findedComputers.push(c);
        }
      }

      if(findedComputers.length <= length){
        allComputersLoaded = true;
      }

      console.log("Finded computers length: "+findedComputers.length);
      computersSelectedGlobal = findedComputers.slice();
      findedComputers = findedComputers.slice(begin,length);
      addComputersToPage(findedComputers);
      computersElement.style.display = 'block';
      if(findedComputers.length == 0){
        computersElement.innerHTML = '<h2 class = "not-found">Bu axtarisa uygun netice tapilmadi!</h2> ';
      }
     }, 500);
  }
}


// Kateqoriyaya gore axtaris elemek

function searchCategory(searchInput){
  var searchText = searchInput.value.trim();
  searchText = searchText.toLowerCase();
  categories = [];
  for(let i = 0; i < categoriesGlobal.length;i++){
    const c = categoriesGlobal[i];
    if(c.name.toLowerCase().includes(searchText)){
      categories.push(c);
    }
  }

  loadComputerCategories();
}

window.addEventListener('scroll',()=>{
  if(allComputersLoaded){
    console.log('Butun komputerler yuklenib')
  }else{
    if(allowScroll){
      const distanceToBottom = document.body.getBoundingClientRect().bottom;
      const clientHeight = document.documentElement.clientHeight;
      if(distanceToBottom < clientHeight + 150){
        allowScroll = false;

        computersLoadingNext.style.display = 'block';

        setTimeout(() => {
          if(computersSelectedGlobal.length <= (begin + length)){
            allComputersLoaded = true;
            computersLoadingNext.style.display = 'none';
          }else{
            begin += length;
            var nextComputers = computersSelectedGlobal.slice(begin,begin+length);
            addComputersToPage(nextComputers);
            computersLoadingNext.style.display = 'none';
          }

          allowScroll = true;
        }, 500);
      }
    }
  }
})

window.addEventListener('load',()=>{
  setTimeout(() => {
    allowScroll = true;
  }, 500);
})