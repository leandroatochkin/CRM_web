import React, { useState, useEffect } from 'react';
import style from './DropPicModal.module.css'
import { uploadProfilePic } from '../../utils/async_functions/api_functions';
import { setLoading, employeeId, setError, error } from '../../utils/stores';
import {Button} from '../../common_components';

const MAX_FILE_SIZE = 2 * 256 * 256 // 130kb

const DropPicModal = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const setLoadingAnimation = setLoading()
    const retrieveEmployeeId = employeeId()
    
  
    const validateFile = (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds the 130kb limit.');
        return false;
      }
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed.');
        return false;
      }
      setError(null); // Reset errors if the file is valid
      return true;
    };
  
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
  
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (validateFile(file)) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setImage(event.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (validateFile(file)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleUpload = async() => {
        setLoadingAnimation(true)
        try{
            uploadProfilePic(image, retrieveEmployeeId)
            setLoadingAnimation(false)
            setImage(null)
        } catch(e){
            console.log(e)
            setError(e.message)
        }
        
    }


  return (
    <div className={style.backdrop}>
        <div className={style.modal}>
            {/* <input type='file' className={style.dropfield}/> */}
            <form
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      style={{
        border: '2px dashed #ccc',
        borderRadius: '5px',
        padding: '20px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{
          opacity: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
      />
      <p>{image ? 'Image Uploaded Successfully!' : 'Drag & Drop an image or click to select'}</p>
      {dragActive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 10,
          }}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        />
      )}
      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
      )}
      {image && !error && (
        <img
          src={image}
          alt="Preview"
          style={{
            marginTop: '10px',
            maxWidth: '100%',
            maxHeight: '200px',
            borderRadius: '5px',
          }}
        />
      )}
    </form>
    <Button text={'prueba'} handler={handleUpload}/>
        </div>
    </div>
  )
}

export default DropPicModal