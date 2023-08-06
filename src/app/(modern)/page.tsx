import ModernScreen from '@/components/screens/modern-screen';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sumbangan Berbasis Blockchain',
  description: 'On Solana Network',
};

export default function IndexPageModern() {
  return <ModernScreen />;
}
