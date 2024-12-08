import {create} from 'zustand';

export const userStore = create((set) => ({
    loggedIn: false,
    employeeId: null,
    companyId: null,
    employeeInfo: {},
    role: null,
  
  
    setLoginInfo: (status, employeeId, companyId, employeeInfo, role) => set({
      loggedIn: status,
      employeeId: employeeId,
      companyId: companyId,
      employeeInfo: employeeInfo,
      role: role,
    })
  
  }));