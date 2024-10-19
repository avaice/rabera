import { next } from '@vercel/edge'

export const config = {
  matcher: ['/((?!api|node_modules|@vite|src|favicon.ico).*)'],
}

export default function middleware(req: Request) {
  return next()
}
