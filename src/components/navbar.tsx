"use client";

import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || !isLoaded) {
    return (
      <div className='sticky top-0 z-30 border-b bg-background px-4 sm:px-6'>
        <div className='flex items-center justify-between mx-auto max-w-4xl h-16'>
          <div className='flex gap-4'>
            <Link href='/' className='flex items-center gap-2'>
              <ExternalLinkIcon className='h-6 w-6' />
              <span className='font-bold'>sharejson.</span>
            </Link>
          </div>
          <div className='w-20 h-8 bg-muted rounded animate-pulse'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='sticky top-0 z-30 border-b bg-background px-4 sm:px-6'>
      <div className='flex items-center justify-between mx-auto max-w-4xl h-16'>
        <div className='flex gap-4'>
          <Link href='/' className='flex items-center gap-2'>
            <ExternalLinkIcon className='h-6 w-6' />
            <span className='font-bold'>sharejson.</span>
          </Link>
          <nav className='flex gap-4'>
            <Link
              href='/dashboard'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
            >
              Dashboard
            </Link>
            <SignedIn>
              <Link
                href='/ai'
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                Ask AI
              </Link>
            </SignedIn>
          </nav>
        </div>
        <SignedOut>
          <SignInButton mode='modal'>
            <Button variant='outline'>Sign in</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
