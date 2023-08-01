'use client';

import React from 'react';

const Test = async () => {
  const Xendit = require('xendit-node');
  const x = new Xendit({
    secretKey:
      'xnd_development_fPJNEPldMnNVQT0fmp6WA7pugfZgezZBPnTTXk6ciiOVLyyyhoJk9SCvkdY1G',
  });

  const { Invoice } = x;
  const i = new Invoice({});
  try {
    let invoice = await i.createInvoice({
      externalID: Date.now().toString(),
      payerEmail: 'irfanfauziin@gmail.com',
      description: 'Invoice for Shoes Purchase',
      amount: 100000,
      customer: {
        given_names: 'xen customer',
        email: 'irfanfauziin@gmail.com',
      },
      customerNotificationPreference: {
        invoice_created: ['email'],
      },
    });
    console.log('created invoice', invoice); // eslint-disable-line no-console
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
  return <>test</>;
};

export default Test;
