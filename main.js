
const API_Key = "6b1cd422-e33f-4bf6-9245-e4d69decfd2d";

const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2&api_key=${API_Key}`;

const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites/?limit=2&api_key=${API_Key}`;

const btnReload = document.getElementById('Reload');
const spanError = document.getElementById('error');

const loadRandomMichis = async()=>{
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    console.log(data);

    if(response.status !== 200){
        spanError.innerHTML= "Hubo un error: " + response.status;
    }else{
        const img1 = document.getElementById('imgCat1');
        const img2 = document.getElementById('imgCat2');
        img1.src=data[0].url;
        img2.src=data[1].url;
    }
   
}

const loadFavoritesMichis = async()=>{
    const response = await fetch(API_URL_FAVORITES);
    const data = await response.json();
    console.log(data);
    if(response.status !== 200){
        spanError.innerHTML= "Hubo un error: " + response.status + " "+ data.message;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadRandomMichis();
    loadFavoritesMichis();
});

btnReload.onclick = () =>{
    loadRandomMichis();
}