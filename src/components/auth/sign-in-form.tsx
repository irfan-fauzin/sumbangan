'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import AnchorLink from '@/components/ui/links/anchor-link';

import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';

// import icons
import { EyeIcon } from '@/components/icons/eye';
import { EyeSlashIcon } from '@/components/icons/eyeslash';

import { signIn } from 'next-auth/react';

export default function SignInForm() {
  const [state, setState] = useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(event: any) {
    event.preventDefault();
    const result = await signIn('credentials', {
      redirect: true,
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
      callbackUrl: '/',
    });

    console.log(result);

    if (result?.error) {
      setIsLoading(false);
      console.log(result + 'salah');
    } else {
      await router.push('/');
      setIsLoading(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <Input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your username"
        inputClassName="focus:!ring-0 placeholder:text-[#6B7280]"
      />
      <div className="relative">
        <Input
          id="password"
          name="password"
          type={state ? 'text' : 'password'}
          placeholder="Password"
          inputClassName="focus:!ring-0 placeholder:text-[#6B7280]"
        />
        <span
          className="absolute bottom-3 right-4 cursor-pointer text-[#6B7280] rtl:left-4 rtl:right-auto sm:bottom-3.5"
          onClick={() => setState(!state)}
        >
          {state ? (
            <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <AnchorLink
          href="/"
          className="inline-block text-sm font-medium tracking-[0.5px] text-[#4B5563] underline dark:text-gray-300"
        >
          Forgot Password
        </AnchorLink>
      </div>
      <Button
        type="submit"
        className="mt-5 rounded-lg !text-sm uppercase tracking-[0.04em]"
      >
        {isLoading ? <>Tunggu Sebentar</> : 'Sign In'}
      </Button>
    </form>
  );
}
