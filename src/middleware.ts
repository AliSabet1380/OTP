import "server-only";
import { NextRequest, NextResponse } from "next/server";

import { verifySession } from "@/lib/jose";
import { checkActivity } from "@/lib/DAL";

const middleware = async (request: NextRequest) => {
  const publicRoutes = ["/sign-in", "/sign-up"];
  const privateRoutes = ["/dashboard"];
  const activeRoutes = ["/activate-account"];

  const userId = await verifySession();
  const pathname = request.nextUrl.pathname;

  if (publicRoutes.includes(pathname) && userId) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  if (privateRoutes.includes(pathname) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }
  if (privateRoutes.includes(pathname) && userId) {
    const isActive = await checkActivity(userId);

    if (!isActive)
      return NextResponse.redirect(
        new URL("/activate-account", request.nextUrl)
      );
  }
  if (activeRoutes.includes(pathname) && !userId) {
    return NextResponse.redirect(new URL("/sign-up", request.nextUrl));
  }
  if (activeRoutes.includes(pathname) && userId) {
    const isActive = await checkActivity(userId);
    if (isActive)
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
};

export default middleware;
