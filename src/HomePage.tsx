import React, { useEffect, useState } from 'react';

interface ImageData {
  id: string;
  filename: string;
  description: string;
  thumbsUp: number;
  thumbsDown: number;
}

const HomePage: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('http://localhost:5000/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const fetchedImages: ImageData[] = await response.json();
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, []);

  const handleThumbsUp = async (id: string) => {
    try {
      const updatedImages = images.map((image) => {
        if (image.id === id) {
          return { ...image, thumbsUp: image.thumbsUp + 1 };
        }
        return image;
      });
      setImages(updatedImages);

      // Send a POST request to update thumbs-up for the image
      await fetch(`http://localhost:5000/images/${id}/thumbs-up`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error with thumbs-up:', error);
      // Handle errors
    }
  };

  const handleThumbsDown = async (id: string) => {
    try {
      const updatedImages = images.map((image) => {
        if (image.id === id) {
          return { ...image, thumbsDown: image.thumbsDown + 1 };
        }
        return image;
      });
      setImages(updatedImages);

      // Send a POST request to update thumbs-down for the image
      await fetch(`http://localhost:5000/images/${id}/thumbs-down`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error with thumbs-down:', error);
    }
  };

  return (
    <div>
      <h1>Image Gallery</h1>
      <div className="image-container">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img
              src={`http://localhost:5000/uploads/${image.filename}`}
              alt={image.description}
              className="image-preview"
            />
            <p>{image.description}</p>
            <button onClick={() => handleThumbsUp(image.id)}>
              Thumbs Up {image.thumbsUp ? '✔' : ''} ({image.thumbsUp})
            </button>
            <button onClick={() => handleThumbsDown(image.id)}>
              Thumbs Down {image.thumbsDown ? '✔' : ''} ({image.thumbsDown})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
