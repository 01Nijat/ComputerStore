function onLogin(){
    window.location.href = "login.html";
}


let myComputersButton = document.getElementById("my-computers-button");
myComputersButton.addEventListener('click', function(){
    window.location.href = 'computers.html';
});

var myShoppingButton = document.getElementById('my-shopping-button');
myShoppingButton.addEventListener('click', function(){
    window.location.href = 'computerShopping.html';
});

var loginButton = document.getElementById('login-button');
var logoutButton = document.getElementById('logout-button');
var clearDataButton = document.getElementById('clear-data-button');

var users = [];
var categories = [];
var computers = [];

var userLoggedIn = false;
var loggedInUserId = localStorage.getItem('logged-in-user-id');
if(loggedInUserId == null){
    userLoggedIn = false;
}else{
    userLoggedIn = true;
}



var showSuccessLoginMessage = localStorage.getItem('show-success-login-message');
if(showSuccessLoginMessage == null){

}else{
    document.getElementById('success-login-alert').style.display = 'block';
    localStorage.removeItem('show-success-login-message');
    setTimeout(() => {
        document.getElementById('success-login-alert').style.display = 'none';
    }, 1000);
}

function showButton(){
    if(userLoggedIn){
        loginButton.style.display = 'none';
        myComputersButton.style.display = 'inline-block';
        clearDataButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';
        myShoppingButton.style.display = 'inline-block';
    } else{
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        myComputersButton.style.display ='none';
        myShoppingButton.style.display = 'none';
        clearDataButton.style.display = 'none';
    }
}

showButton();

function onLogout(){
    setTimeout(() => {
        userLoggedIn = false;
        localStorage.removeItem('logged-in-user-id');
        localStorage.removeItem('logged-in-user-name');
        showButton();
        document.getElementById('success-logout-alert').style.display = 'block';
        showUsername();
        setTimeout(() => {
            document.getElementById('success-logout-alert').style.display = 'none';
        }, 500);
    }, 1000);
}

function addObjects(){
    // Add users
    users.push({id:1, name: 'User-1', phone: '055-333-44-55', username: 'u1', password: 'p1'});
    users.push({id:2, name: 'User-2', phone: '055-333-44-55', username: 'u2', password: 'p2'});
    users.push({id:3, name: 'User-3', phone: '055-333-44-55', username: 'u3', password: 'p3'});
    users.push({id:4, name: 'User-4', phone: '055-333-44-55', username: 'u4', password: 'p4'});
    users.push({id:5, name: 'User-5', phone: '055-333-44-55', username: 'u5', password: 'p5'});

    // Add categories 

    categories.push({id:1, name: 'Acer'});
    categories.push({id:2, name: 'HP'});
    categories.push({id:3, name: 'Asus'});
    categories.push({id:4, name: 'Dell'});
    categories.push({id:5, name: 'Lenovo'});
    categories.push({id:6, name: 'LG'});
    categories.push({id:7, name: 'Casper'});
    categories.push({id:8, name: 'Fujitsu'});
    categories.push({id:9, name: 'Nexus'});
    categories.push({id:10, name: 'Samsung'});
    categories.push({id:11, name: 'Toshiba'});
    categories.push({id:12, name: 'Macbook'});

    // Add computers 

    computers.push({
        id: 1,
        name: 'Acer-1',
        price: 500,
        description: 'Acer-1 desc',
        isNew: true,
        imagePath: 'images/acer.jpg',
        userId: 1,
        categoryId: 1
    });

    computers.push({
        id: 2,
        name: 'Acer-2',
        price: 500,
        description: 'Acer-2 desc',
        isNew: true,
        imagePath: 'images/acer.jpg',
        userId: 1,
        categoryId: 1
    });

    computers.push({
        id: 3,
        name: 'Acer-3',
        price: 500,
        description: 'Acer-3 desc',
        isNew: true,
        imagePath: 'images/acer.jpg',
        userId: 1,
        categoryId: 1
    });

    computers.push({
        id: 4,
        name: 'Acer-4',
        price: 500,
        description: 'Acer-4 desc',
        isNew: true,
        imagePath: 'images/acer.jpg',
        userId: 1,
        categoryId: 1
    });

    computers.push({
        id: 5,
        name: 'Acer-5',
        price: 500,
        description: 'Acer-5 desc',
        isNew: true,
        imagePath: 'images/acer.jpg',
        userId: 1,
        categoryId: 1
    });

    computers.push({
        id: 6,
        name: 'Acer-6',
        price: 500,
        description: 'Acer-6 desc',
        isNew: true,
        imagePath: 'images/acer.jpg',
        userId: 1,
        categoryId: 1
    });

    computers.push({
        id: 7,
        name: 'Acer-7',
        price: 500,
        description: 'Acer-7 desc',
        isNew: true,
        imagePath: 'images/acer.jpg',
        userId: 1,
        categoryId: 1
    });

    // Acer computer elave etme
    var idCounter = 40;
    for(let i = 0; i < 40; i++){
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Acer-'+idCounter,
            price: computers[i].price,
            description: 'Acer-'+idCounter+' desc',
            isNew: computers[i].isNew,
            imagePath: 'images/acer.jpg',
            userId: computers[i].userId,
            categoryId: 1
        })
    }

    // HP Computer elave et

    for(let i = 0; i < 100; i++){
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'HP-'+idCounter,
            price: computers[i].price,
            description: 'HP-'+idCounter+' desc',
            isNew: computers[i].isNew,
            imagePath: 'images/hp.jpg',
            userId: computers[i].userId,
            categoryId: 2
        })
    }

    // Asus komputer elave et
    for(let i = 0; i < 100; i++){
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Asus-'+idCounter,
            price: computers[i].price,
            description: 'Asus-'+idCounter+' desc',
            isNew: computers[i].isNew,
            imagePath: 'images/asus.jpg',
            userId: computers[i].userId,
            categoryId: 3
        })
    }

    // Dell komputer elave et
    for(let i = 0; i < 100; i++){
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Dell-'+idCounter,
            price: computers[i].price,
            description: 'Dell-'+idCounter+' desc',
            isNew: computers[i].isNew,
            imagePath: 'images/dell.jpg',
            userId: computers[i].userId,
            categoryId: 4
        })
    }

    // Lenovo komputer elave et
    for(let i = 0; i < 100; i++){
        idCounter++;
        computers.push({
            id: idCounter,
            name: 'Lenovo-'+idCounter,
            price: computers[i].price,
            description: 'Lenovo-'+idCounter+' desc',
            isNew: computers[i].isNew,
            imagePath: 'images/lenovo.jpg',
            userId: computers[i].userId,
            categoryId: 5
        })
    }

    for(let i = 0; i < computers.length;i++){
        const c = computers[i];
        c.ram = 8;
        c.cpu = 'Core i 9';
        c.drive = 500;
        c.driveType = (i%2 == 0) ? 'hdd' : 'ssd';  // ternar operatoru
        c.os = 'Windows 10';
        c.videoCard = 3;
    }
}

// Butun komputerleri elave etmek 
addObjects();

function loadDataFromLocalStorage(){
    var userString = localStorage.getItem('users');
    var categoriesString = localStorage.getItem('categories');
    var computerString = localStorage.getItem('computers');

    if(userString == null){
        localStorage.setItem('users', JSON.stringify(users));
    }else{
        users = JSON.parse(userString);
    }

    if(categoriesString == null){
        localStorage.setItem('categories',JSON.stringify(categories));
    }else{
        categories = JSON.parse(categoriesString);
    }

    if(computerString == null){
        localStorage.setItem('computers',JSON.stringify(computers));
    }else{
        computers = JSON.parse(computerString);
    }
}

loadDataFromLocalStorage();

function onClearLocalStorage(){
    localStorage.removeItem('users');
    localStorage.removeItem('categories');
    localStorage.removeItem('computers');
    localStorage.removeItem('basketComputers');
    localStorage.removeItem('orders');
    localStorage.removeItem('customers');
    localStorage.removeItem('order-customer');
    localStorage.removeItem('logged-in-user-id');
    window.location.reload();
}

var customers = [];
customers.push({id: 1, name: 'Customer-1', address: 'Customer-1 address', phone: '055-234-55-66', email: 'customer1@gmail.com'});
customers.push({id: 2, name: 'Customer-2', address: 'Customer-2 address', phone: '055-234-55-66', email: 'customer2@gmail.com'});
customers.push({id: 3, name: 'Customer-3', address: 'Customer-3 address', phone: '055-234-55-66', email: 'customer3@gmail.com'});
customers.push({id: 4, name: 'Customer-4', address: 'Customer-4 address', phone: '055-234-55-66', email: 'customer4@gmail.com'});
customers.push({id: 5, name: 'Customer-5', address: 'Customer-5 address', phone: '055-234-55-66', email: 'customer5@gmail.com'});


var customerString = localStorage.getItem('customers');

if(customerString == null){
    localStorage.setItem('customers',JSON.stringify(customers));
}else{
    customers = JSON.parse(customerString);
}

var loggedInUserName = document.getElementById('logged-in-user-name');

function showUsername(){
    if(userLoggedIn){
        var username = '';
        for(let i = 0; i < users.length; i++){
            const user = users[i];
            if(user.id == loggedInUserId){
                username = user.username;
                break;
            }
        }

        loggedInUserName.innerHTML = username;

    }else{
        loggedInUserName.innerHTML = '';

    }

    console.log(username);
}

showUsername();