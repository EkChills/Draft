export { default } from "next-auth/middleware"

export const config = { matcher: ["/all-documents/:path*",'/pricing/:path*'] }