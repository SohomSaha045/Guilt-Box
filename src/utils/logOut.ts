// 'use server';
import { cookies } from 'next/headers'
import { navigateToLogin } from './actions';
export async function  LogOut() {
//   console.log(window);
// window.Co
document.cookie='UserToken' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  navigateToLogin();
}
