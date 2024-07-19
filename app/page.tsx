'use client'

import { useState, useEffect } from "react";

interface FlickrPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  // ... d'autres propriétés si nécessaire
}

function FlickrPhotos() {
  const [photos, setPhotos] = useState<FlickrPhoto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'c9f10f419c7ee17812798af5c75a7705'; // Remplacez par votre clé API Flickr
      const albumId = '72177720318950674'; // ID de l'album extrait de l'URL

      try {
        const response = await fetch(
          `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&format=json&nojsoncallback=1`
        );
        const data = await response.json();
        if(data){
          console.log('photos there')
        }else{
          console.log('no photos')
        }
        setPhotos(data.photoset.photo); // Utilisez la propriété 'photo' de la réponse
      } catch (error) {
        console.error("Erreur lors de la récupération des photos:", error);
      }
    };

    fetchData(); 
  }, []); 

  return (
    <div>
      <h2>Photos Flickr</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img
              src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`} // Utiliser la taille z par défaut
              alt={photo.title}
              width={200}
              height={150}
              onError={(e) => {
                console.error('Erreur de chargement de l\'image:', e);
                // Gérer l'erreur de chargement de l'image (par exemple, afficher un message d'erreur)
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlickrPhotos;