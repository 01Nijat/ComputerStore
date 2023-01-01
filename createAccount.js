
let err=document.getElementById('Error');
let success=document.getElementById('Success');

   let user=[]
   let userString=localStorage.getItem('users');

   if(userString==null){

   }else{
    user=JSON.parse(userString)
   }


   function CreateAccount(event){
       event.preventDefault();

let name=document.getElementById('Name')
let telnumber=document.getElementById('Tel')
let usernameElement=document.getElementById('userName')
let passwordElement=document.getElementById('password')

       var nameValue=name.value
       var telnumberValue=telnumber.value
       var usernameValue=usernameElement.value
       var passwordValue=passwordElement.value

       let userNameexists=false;

       for(let i=0;i<user.length;i++){
         const u=user[i];

         if(u.usernameValue==usernameValue){
            userNameexists=true
            break;
         }
       }

       if(userNameexists==true){
        err.style.display='block';
        err.innerHTML='Bu istifadəçi adı artıq mövcuddur'

        setTimeout(()=>{
            err.style.display='none';
        },3000)
       }else{
        let userId=0;
        for(let i=0;i<user.length;i++){
            const u=user[i];
            if(u.id>userId){
               userId=u.id
            }
        }
        userId++
        let used={}
        used.id=userId;
        used.name=nameValue;
        used.phone=telnumberValue;
        used.username=usernameValue;
        used.password=passwordValue

        user.push(used)

        localStorage.setItem('users',JSON.stringify(user))

        success.style.display='block';
        success.innerHTML='İstifadeçi uğurla yaradıldı'

        setInterval(()=>{
            success.style.display='none';
window.location.href='login.html'
        },3000) 

    
        
       }
       }


       