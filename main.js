console.log("Hello word");

const URL = 'https://api.thecatapi.com/v1/images/search?limit=3';
const btnReload = document.getElementById('Reload');

/*
fetch(URL)
    .then(rest => rest.json())
    .then(data=>{
        const img = document.querySelector('img');
        img.src= data[0].url;
    });
*/

const getDataCats = async () =>{
    const response = await fetch(URL);
    const json = await response.json();
    return json;
}

const setImgCat = async()=>{
    const img1 = document.getElementById('imgCat1');
    const img2 = document.getElementById('imgCat2');
    const img3 = document.getElementById('imgCat3');
    const response = await getDataCats();
    console.log(response);
    img1.src=response[0].url;
    img2.src=response[1].url;
    img3.src=response[2].url;
}

document.addEventListener('DOMContentLoaded', (event) => {
    setImgCat();
});

btnReload.onclick = () =>{
    setImgCat();
}