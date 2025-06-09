/** @format */

// src/app/api/create-payment-intent/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
// sk_test_51RDtTOIjJP5SAFomFQaTjQ0kxppZ8gONOYJrrAfCm3mvZSPI4MFefUov4m2X6J6fPfNOw70hkskgwI4sCkj5PgIe00K03bqcub
const stripe = new Stripe("123", {});

export async function POST(req: NextRequest) {
  const { amount /* в тенге */, currency = "KZT" } =
    await req.json();

  const amountTiyn = Math.round(amount * 100);

  if (amountTiyn < 50) {
    return NextResponse.json(
      { error: "Сумма слишком мала для платежа" },
      { status: 400 },
    );
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountTiyn,
    currency,
    automatic_payment_methods: { enabled: true },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
