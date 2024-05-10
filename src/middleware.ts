import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
   const path=request.nextUrl.pathname;
   const isPublicPath = path === '/login' || path === '/';
   const token =request.cookies.get('UserToken')?.value||'';
   if(isPublicPath && token ){
    return NextResponse.redirect(new URL('/messages',request.nextUrl));
   }
   if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/',request.url));
   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/messages',
    '/write',
    '/login',
    '/messages/:id*'

],
}