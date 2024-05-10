'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate() {
  redirect(`/messages`)
}
export async function navigateToComments(id:string) {
  redirect(`/messages/${id}`)
}
export async function navigateToLogin(){
  redirect('/login');
}