import { SafeStorage } from './SafeStorage'

export const SafeLocalStorage = new SafeStorage(localStorage)
export const SafeSessionStorage = new SafeStorage(sessionStorage)
