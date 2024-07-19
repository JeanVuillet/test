'use client'
import { useState, useEffect } from 'react';

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

interface FlickrAlbum {
  id: string;
  owner: string;
  username: string;
  primary: string;
  secret: string;
  server: string;
  farm: number;
  // ... d'autres propriétés si nécessaire
}

const FlickrPhotosByTitle = () => {
  const [photos, setPhotos] = useState<FlickrPhoto[]>([]);
  const [albums, setAlbums] = useState<FlickrAlbum[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = 'c9f10f419c7ee17812798af5c75a7705'; // Remplacez par votre clé API Flickr
    const userId = '201028164@N07'; // Remplacez par l'ID utilisateur Flickr

    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          `https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`
        );
        const data = await response.json();
        setAlbums(data.photosets.photoset);
      } catch (error) {
        console.error('Erreur lors de la récupération des albums:', error);
      }
    };

    const fetchPhotos = async () => {
      if (selectedAlbumId) {
        try {
          const response = await fetch(
            `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${selectedAlbumId}&format=json&nojsoncallback=1`
          );
          const data = await response.json();
          setPhotos(data.photoset.photo);
        } catch (error) {
          console.error('Erreur lors de la récupération des photos:', error);
        }
      }
    };

    fetchAlbums();
  }, []); 

  const handleAlbumSelect = (albumId: string) => {
    setSelectedAlbumId(albumId);
    fetchPhotos();
  };

  return (
    <div>
      <h2>Photos Flickr</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <button onClick={() => handleAlbumSelect(album.id)}>
              {album.title._content}
            </button>
          </li>
        ))}
      </ul>

      <h3>Photos de l'album:</h3>
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
    // il faut utiliser GETLIST
  );
};

export default FlickrPhotosByTitle;