'use client';

import cn from 'classnames';
import AuthorCard from '@/components/ui/author-card';
import Logo from '@/components/ui/logo';
import { MenuItem } from '@/components/ui/collapsible-menu';
// import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import { useDrawer } from '@/components/drawer-views/context';
import { Close } from '@/components/icons/close';
import {
  defaultMenuItems,
  adminMenuItems,
  campaignMenuItems,
  otherPagesMenuItems,
} from '@/layouts/sidebar/_menu-items';
import { LAYOUT_OPTIONS } from '@/lib/constants';
//images
import AuthorImage from '@/assets/images/author.jpg';
import React from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';

interface SidebarProps {
  className?: string;
  layoutOption?: string;
}

export default function Sidebar({
  className,
  layoutOption = '',
}: SidebarProps) {
  const { data: session } = useSession();
  let Menus;

  switch (session?.user.role) {
    case 'ADMIN':
      Menus = adminMenuItems;
      break;
    case 'CAMPAIGN_MANAGER':
      Menus = campaignMenuItems;
      break;
    default:
      Menus = defaultMenuItems;
  }

  const { closeDrawer } = useDrawer();
  const sideBarMenus = Menus?.map((item) => ({
    name: item.name,
    icon: item.icon,
    href:
      layoutOption +
      (layoutOption === `/${LAYOUT_OPTIONS.RETRO}` && item.href === '/'
        ? ''
        : item.href),
    ...(item.dropdownItems && {
      dropdownItems: item?.dropdownItems?.map((dropdownItem: any) => ({
        name: dropdownItem.name,
        ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
        href: layoutOption + dropdownItem.href,
      })),
    }),
  }));

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80',
        className
      )}
    >
      <div className="relative flex h-24 items-center justify-center overflow-hidden px-6 py-4 2xl:px-8">
        <Logo />
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <div className="custom-scrollbar grid h-[calc(100%-98px)] content-between">
        <div className="px-6 pb-5 2xl:px-8 ">
          <div className="mt-12">
            {sideBarMenus?.map((item, index) => (
              <MenuItem
                key={'default' + item.name + index}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
            {otherPagesMenuItems?.map((item, index) => (
              <MenuItem
                key={'default' + item.name + index}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
        </div>
        {session ? (
          <div className="px-6 pb-5 2xl:px-8 ">
            <div className="mb-8">
              <AuthorCard
                image={AuthorImage}
                name={session?.user?.fullname}
                role={
                  session?.user?.role === 'ADMIN' ? 'Admin' : 'Campaign Manager'
                }
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </aside>
  );
}
