'use client';

import * as React from 'react';

import SignInForm from '@/components/auth/sign-in-form';
import AnchorLink from '@/components/ui/links/anchor-link';

export default function LoginModal() {
  return (
    <div className="flex min-w-fit flex-col items-center justify-center rounded bg-white px-14 py-14 dark:bg-light-dark ">
      <div className="grid grid-cols-1 gap-4 px-4 ">
        <div className="mb-5 text-center lg:text-left">
          <h2 className="mb-2 text-xl font-medium uppercase dark:text-white lg:text-2xl">
            Welcome Back!
          </h2>
          <p className="text-sm text-[#4B5563] dark:text-gray-300">
            Please login account with your info
          </p>
        </div>

        <SignInForm />
        <p className="text-sm tracking-[0.5px] text-[#4B5563] dark:text-gray-300">
          Not member yet?{' '}
          <AnchorLink
            href=""
            className="font-medium underline hover:text-black/80 dark:text-gray-300"
          >
            Become campaigner
          </AnchorLink>
        </p>
      </div>
    </div>
  );
}
