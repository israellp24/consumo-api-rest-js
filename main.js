
const API_Key = "6b1cd422-e33f-4bf6-9245-e4d69decfd2d";

const api = axios.create({
    baseURL:  'https://api.thecatapi.com/v1',
    timeout: 1000,
    headers: {'X-API-KEY':API_Key}
});

const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2`;

const API_URL_Favourites = `https://api.thecatapi.com/v1/favourites/`;

const API_URL_Favourites_delete = (id)=>`https://api.thecatapi.com/v1/favourites/${id}`;

const API_URL_Favourites_upload = `https://api.thecatapi.com/v1/images/upload`;

const btnReload = document.getElementById('Reload');
const spanError = document.getElementById('error');

const loadRandomMichis = async()=>{
    const response = await fetch(API_URL_RANDOM,{
        headers:{
            'X-API-KEY': API_Key,
        }
    });
    const data = await response.json();
    console.log(data);

    if(response.status !== 200){
        spanError.innerHTML= "Hubo un error: " + response.status;
    }else{
        const img1 = document.getElementById('imgCat1');
        const btn1 = document.getElementById('btn1');
        const img2 = document.getElementById('imgCat2');
        const btn2 = document.getElementById('btn2');
        img1.src=data[0].url;
        img2.src=data[1].url;

        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
    }
   
}

const loadFavouritesMichis = async()=>{
    const response = await fetch(API_URL_Favourites,{
        headers:{
            'X-API-KEY': API_Key,
        }
    });
    const data = await response.json();
    console.log(data);
    if(response.status !== 200){
        spanError.innerHTML= "Hubo un error: " + response.status + " "+ data.message;
    }else{
        const section = document.getElementById('favoritesMichis');
        section.innerHTML=""
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritos');

            img.src=michi.image.url;
            img.width= 150
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteMichi(michi.id)
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
            
        });
    }
}

const saveFavouriteMichi = async(id)=>{
    const {data,status} = await api.post('/favourites',{
        image_id: id,

    });
    /*
    const rest =await fetch(API_URL_Favourites,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_Key,
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await rest.json();*/

    console.log('Save');

    if(status !== 200){
        spanError.innerHTML= "Hubo un error: " + status + " "+ data.message;
    }else{
        console.log("Michi guardado en favoritos");
        loadFavouritesMichis();
    }
}

const deleteFavouriteMichi = async(id) =>{
    const rest = await fetch(API_URL_Favourites_delete(id),{
        method: 'DELETE',
        headers:{
            'X-API-KEY': API_Key,
        }
    });
    const data = await rest.json();

    if(rest.status !== 200){
        spanError.innerHTML= "Hubo un error: " + rest.status + " "+ data.message;
    }else{
        console.log("Michi eliminado en favoritos");
        loadFavouritesMichis();
    }
}

const uploadMichiPhoto = async ()=>{
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const rest = await fetch(API_URL_Favourites_upload,{
        method: 'POST',
        headers: {
            //'Content-Type': 'multipar/form-data',
            'X-API-KEY': API_Key,
        },
        body: formData,
    });

    const data = await rest.json();

    if(rest.status !== 200){
        spanError.innerHTML= "Hubo un error: " + rest.status + " "+ data.message;
    }else{
        console.log("Michi subido en favoritos");
        console.log({data});
        console.log(data.url)
    }
}

function miniatura() {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form)
	//usamos el FileReader para sacar la información del archivo del formData
    const reader = new FileReader();

//Este código es para borrar la miniatura anterior al actualizar el form.
    if (form.children.length === 3) {
        const preview = document.getElementById("preview")
        form.removeChild(preview)
    }
//aquí sucede la magia, el reader lee los datos del form.
    reader.readAsDataURL(formData.get('file'))

//Éste código es para cuando termine de leer la info de la form, cree una imagen miniatura de lo que leyó el form.
    reader.onload = () => {
        const previewImage = document.createElement('img')
        previewImage.id = "preview"
        previewImage.width = 50
        previewImage.src = reader.result
        form.appendChild(previewImage);
    }

}

document.addEventListener('DOMContentLoaded', (event) => {
    loadRandomMichis();
    loadFavouritesMichis();
});

btnReload.onclick = () =>{
    loadRandomMichis();
}