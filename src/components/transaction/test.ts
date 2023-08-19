import * as borsh from '@project-serum/borsh';

export class Movie {
  campaign: string;
  donatur: string;
  amount: string;
  midtrans_payment_id: string;
  payment_method: string;
  notes: string;
  date: string;
  constructor(
    campaign: string,
    donatur: string,
    amount: string,
    midtrans_payment_id: string,
    payment_method: string,
    notes: string,
    date: string
  ) {
    this.campaign = campaign;
    this.donatur = donatur;
    this.amount = amount;
    this.midtrans_payment_id = midtrans_payment_id;
    this.payment_method = payment_method;
    this.notes = notes;
    this.date = date;
  }

  static borshAccountSchema = borsh.struct([
    borsh.str('campaign'),
    borsh.str('donatur'),
    borsh.str('amount'),
    borsh.str('midtrans_payment_id'),
    borsh.str('payment_method'),
    borsh.str('notes'),
    borsh.str('date'),
  ]);

  static deserialize(buffer?: Buffer): Movie | null {
    if (!buffer) {
      return null;
    }

    try {
      const {
        campaign,
        donatur,
        amount,
        midtrans_payment_id,
        payment_method,
        notes,
        date,
      } = this.borshAccountSchema.decode(buffer);
      return new Movie(
        campaign,
        donatur,
        amount,
        midtrans_payment_id,
        payment_method,
        notes,
        date
      );
    } catch (e) {
      console.log('Deserialization error:', e);
      return null;
    }
  }
}
