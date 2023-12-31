import { NextResponse } from "next/server";
export function middleware(request) {

  const path = request.nextUrl.pathname;
  const isAuthPath = path === "/login" || path === "/signup";
  const isPrivatePath = path === "/wishlist" || path === "/profile";
  const token = request.cookies.get("__Secure-next-auth.session-token")?.value || "";
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  try {
    if (!isAuthPath && !token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/error", request.nextUrl));
  }
}

export const config = {
  matcher: [
    // '/',
    // '/about',
    "/login",
    "/signup",
    // '/about'
    // 'profile',
    //     // 'wishlist',
    // ''
  ],
};
// next-auth.session-token
