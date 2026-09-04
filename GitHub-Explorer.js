

const Search  = document.getElementById("Search");
const  UserName= document.getElementById("UserName");
const  result = document.getElementById("result");
const repostryContainer =  document.createElement('div');
repostryContainer.id = "repostryContainer";

Search.addEventListener('click',(e)=>{
    const UserNameValue= UserName.value;
   if (UserNameValue.trim() === "") {
    alert("PLEASE ENTER USERNAME FIRST");
    return;
}
result.innerHTML = "";
result.textContent = "loading";
console.log(UserNameValue);

async function GitHub_Explorer(){
try{
const  response = await fetch(`https://api.github.com/users/${UserNameValue}`);

if(!response.ok){
    if(response.status === 404){
        result.textContent = "UserName Not found 😤";
       }else if(response.status === 403){
        result.textContent = "API REQUEST REJECT";
       }else{
    result.textContent = "SOMETHING WENT WRONG";
}

    throw new Error ("DATA ARE NOT FOUND.");
}

const data = await response.json();
result.innerHTML = "";
repostryContainer.innerHTML = "";
console.log(data);

const image = document.createElement('img');
image.src  = data.avatar_url;

const name =  document.createElement('h2');
name.textContent =  "Name: " + data.login;

const followers = document.createElement('p');
followers.textContent = "Followers: " + data.followers;

const following = document.createElement('p');
following.textContent = "Following: " + data.following;


const repostries = document.createElement('p');
repostries.textContent ="Repostries: " + data.public_repos;


 const anchor = document.createElement('a');
 anchor.href = data.html_url;
 anchor.textContent = "Visit Profile";

result.append(image,name,followers,following,repostries,anchor);
repostry(data);
}

catch(error){
    console.log("ERROR :" , error);
    //    result.textContent = "UserName Not found 😤";
       

}



async function repostry(data) {
    try{
    const response2 = await fetch(data.repos_url);
    if(!response2.ok){
            if(response2.status === 404){
        result.textContent = "Repositories  Not found 😤";
       }else if(response2.status === 403){
        result.textContent = "API REQUEST REJECT";
       }else{
    result.textContent = "SOMETHING WENT WRONG";
}

    throw new Error ("DATA ARE NOT FOUND.");
}
       

    const data2 = await response2.json();
    console.log(data2);


    for(let i =0;i<data2.length;i++){

        const repostry_card = document.createElement('div');
        repostry_card.id = "repostry_card";

        const name1 = document.createElement('h2');
           name1.textContent="Repostry_Name: " + data2[i].name;

           const description = document.createElement('p');
             description.textContent = "Description: " + data2[i].description;

             const stargazers_count = document.createElement('p');
                stargazers_count.textContent= "Stargazers_Count: " +  data2[i].stargazers_count;

                const forks_count = document.createElement('p');
                 forks_count.textContent = "forks_count: "+ data2[i].forks_count;

                 const language = document.createElement('p');
                 language.textContent =  "Language: " +  data2[i].language;

                 const anchor = document.createElement('a');
                 anchor.href   =  data2[i].html_url;
                 anchor.textContent = "View Repostry";

                 repostry_card.append(name1 ,description , stargazers_count  ,forks_count ,language,anchor);
                 repostryContainer.append( repostry_card);
               

    }   
    result.append(repostryContainer);
}


catch(error){
    console.log("ERROR :" ,error);
}
}


}
GitHub_Explorer();




})


UserName.addEventListener('keyup' , (e)=>{
   if(e.key == "Enter"){
  Search.click();
   }
})




