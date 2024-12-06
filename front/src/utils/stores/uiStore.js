import {create} from 'zustand';
import { es_text } from '../data/text';

export const uiStore = create((set) => ({
    loading: false,
    displayElement: '',
    language: es_text,
    openModal: false,
    error: '',
  
    setLoading: (status) => set({
      loading: status
    }),

    setDisplayElement: (element) => set({
        displayElement: element
    }),

    setOpenModal: (status) => set({
      openModal: status
      }),
    
      setError: (error) => set({
        error: error
        })
  
  }));