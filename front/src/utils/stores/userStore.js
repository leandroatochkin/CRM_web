import {create} from 'zustand';

export const userStore = create((set) => ({
    loggedIn: false,
    employeeId: null,
    companyId: null,
    role: null,
  
  
    setLoginStatus: (status, employeeId, companyId, role) => set({
      loggedIn: status,
      employeeId: employeeId,
      companyId: companyId,
      role: role
    })
  
  }));