import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { LivePricing } from '@/components/icons/live-pricing';
import { LockIcon } from '@/components/icons/lock-icon';

export const defaultMenuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'Campaign',
    icon: <VoteIcon />,
    href: routes.campaign,
  },
];

export const adminMenuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'User',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'Campaign',
    icon: <VoteIcon />,
    href: routes.campaign,
    dropdownItems: [
      {
        name: 'Create Campaign',
        href: routes.createNft,
      },
      {
        name: 'List Campaign',
        href: routes.campaign,
      },
    ],
  },
];

export const campaignMenuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },

  {
    name: 'Campaign',
    icon: <VoteIcon />,
    href: routes.campaign,
    dropdownItems: [
      {
        name: 'Create Campaign',
        href: routes.createNft,
      },
      {
        name: 'List Campaign',
        href: routes.campaign,
      },
    ],
  },
];
export const otherPagesMenuItems = [];
