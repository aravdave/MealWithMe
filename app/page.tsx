"use client";
import Image from "next/image";
// import { Link } from "@chakra-ui/next-js";
import Link from "next/link";
import { Suspense } from "react";
import SignIn from "@/components/signIn";

export const runtime = "edge";
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-blue-600 to-slate-700 bg-clip-text text-center text-4xl font-medium text-transparent md:text-7xl">MealWithMe</h1>

      <SignIn />

      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
        <Link href="https://aravdave.com">Arav Dave</Link>
        <Link href="https://github.com/aravdave/MealWithMe" className="flex items-center space-x-2">
          <Image src="/github.svg" alt="GitHub Logo" width={24} height={24} priority />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
  );
}
