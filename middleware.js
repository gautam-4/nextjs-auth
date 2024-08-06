import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get("token")?.value || '';

    // If the path is `/`, redirect based on authentication status
    if (path === '/') {
        if (token) {
            return NextResponse.redirect(new URL('/profile', request.url));
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }


    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/login', '/signup', '/profile', '/profile/:path*', '/verifyemail']
}