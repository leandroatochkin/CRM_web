import {create} from 'zustand';

export const uiStore = create((set) => ({
    loading: false,
  
    setLoading: (status) => set({
      loading: status
    })
  
  }));