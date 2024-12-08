import { uiStore } from "./uiStore"
import { userStore } from "./userStore"

export const setLoading = () => uiStore((state)=>state.setLoading)

export const setDisplayElement = () => uiStore((state)=>state.setDisplayElement)

export const setOpenModal = () => uiStore((state)=>state.setOpenModal)

export const loading = () => uiStore((state)=>state.loading)

export const displayElement = () => uiStore((state)=>state.displayElemet)

export const language = () => uiStore((state)=>state.language)

export const setError = () => uiStore((state)=>state.setError)

export const error = () => uiStore((state)=>state.error)

export const loggedIn  = () => userStore((state) => state.loggedIn);

export const employeeId  = () => userStore((state) => state.employeeId);

export const companyId  = () => userStore((state) => state.companyId);

export const employeeInfo = () => userStore((state) => state.employeeInfo);

export const role = () => userStore((state) => state.role);

export const storedPassword = () => userStore((state)=>state.storedPassword)

