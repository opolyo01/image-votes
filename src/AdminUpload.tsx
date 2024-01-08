import React, { useState } from 'react';
import './AdminUpload.css';

const AdminUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(selectedFile.name.split('.')[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', file as Blob);
      formData.append('filename', filename);
      formData.append('description', description);

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      console.log('Image uploaded successfully');

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div>
          <label htmlFor="fileInput">Choose Image:</label>
          <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="filenameInput">Filename:</label>
          <input
            type="text"
            id="filenameInput"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="descriptionInput">Description:</label>
          <textarea
            id="descriptionInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AdminUpload;
