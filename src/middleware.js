import { clerkMiddleware } from "@clerk/nextjs/server";

export default function middleware(req, ev) {
  console.log('Middleware triggered for:', req.url);
  return clerkMiddleware()(req, ev);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

export function cors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://next-estate-zeta.vercel.app'); // Allow your frontend origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(204).end(); // End preflight request
    return true;
  }
  return false;
}