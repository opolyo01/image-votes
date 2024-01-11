import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

interface ImageData {
  id: string;
  filename: string;
  description: string;
  thumbsUp: number;
  thumbsDown: number;
}

const HomePage: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('http://image-votes-service-1eca53db7d66.herokuapp.com/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const fetchedImages: ImageData[] = await response.json();
        setImages(fetchedImages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
      await fetch(`http://image-votes-service-1eca53db7d66.herokuapp.com/images/${id}/thumbs-up`, {
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
      await fetch(`http://image-votes-service-1eca53db7d66.herokuapp.com/images/${id}/thumbs-down`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error with thumbs-down:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://image-votes-service-1eca53db7d66.herokuapp.com/images/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="gallery-container">
      <h1>Image Gallery</h1>
      {loading && <p>Loading images...</p>}
      {!loading && images.length === 0 ? (
        <div>
          <p>No images available. Please go to the <Link to="/admin">Admin</Link> page to upload images.</p>
        </div>
      ) : (
        <div className="image-container">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <img
                src={`http://image-votes-service-1eca53db7d66.herokuapp.com/uploads/${image.filename}`}
                alt={image.description}
                className="image-preview"
              />
              <div className="image-info">
                <p className="description">{image.description}</p>
                <div className="button-group">
                  <button onClick={() => handleThumbsUp(image.id)} className="thumbs-up">
                    Thumbs Up {image.thumbsUp ? '👍' : ''} ({image.thumbsUp})
                  </button>
                  <button onClick={() => handleThumbsDown(image.id)} className="thumbs-down">
                    Thumbs Down {image.thumbsDown ? '👎' : ''} ({image.thumbsDown})
                  </button>
                  <button onClick={() => handleDelete(image.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>)}
    </div>

  );
};

export default HomePage;
