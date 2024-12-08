import React, { useState, useEffect } from 'react';
import style from './DropPicModal.module.css'
import { uploadProfilePic } from '../../utils/async_functions/api_functions';
import { setLoading, employeeId, setError, error, language, setOpenModal, loading } from '../../utils/stores';
import Backdrop from './Backdrop';
import {Button} from '../../common_components';
import { MoonLoader } from 'react-spinners';

const MAX_FILE_SIZE = 2 * 256 * 256 // 130kb

const DropPicModal = () => {
    const [image, setImage] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const setLoadingAnimation = setLoading()
    const loadingAnimation = loading()
    const retrieveEmployeeId = employeeId()
    const text = language()
    const closeModal = setOpenModal()
    const setLocalError = setError()
    const localError = error()
    
  
    const validateFile = (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setLocalError('File size exceeds the 130kb limit.');
        alert(text.errors.file_size_too_big)
        return false;
      }
      if (!file.type.startsWith('image/')) {
        setLocalError('Only image files are allowed.');
        alert(text.errors.file_type_not_allowed)
        return false;
      }
      setLocalError(null); // Reset errors if the file is valid
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
          setLocalError(e.message)
          alert(e.message)
        }
        
    }


  return (
    <Backdrop>
        <div className={style.modal}>
            {loadingAnimation ? (<MoonLoader />) : (
              <form
                  onDragEnter={handleDrag}
                  onSubmit={(e) => e.preventDefault()}
                  className={style.dropfield}
            >
                        <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={style.invisibleInput}
                        />
              
              {dragActive && (
                <div
                  className={style.invisibleInputActive}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                />
              )}
              {localError && (
                <p style={{ color: 'red', marginTop: '10px' }}>{localError}</p>
              )}
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className={style.previewImage}
                />
              )}
              
                    </form>
            )}
    <p>{image ? text.ui.image_uploaded : text.ui.select_picture}</p>
    <div className={style.buttonContainer}>
    <Button text={text.ui.upload_picture} handler={handleUpload}/>
    <Button text={text.ui.cancel} handler={()=>closeModal(false)}/>
    </div>
        </div>
        </Backdrop>
  )
}

export default DropPicModal