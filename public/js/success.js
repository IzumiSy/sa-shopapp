const stripe = Stripe("pk_test_46zswMCbz39W2KAqKj43vDRu");

const clientSecret = new URLSearchParams(window.location.search).get(
  "payment_intent_client_secret"
);

stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  const paymentDetail = document.querySelector("#payment-detail");

  if (paymentIntent.status == "succeeded") {
    paymentDetail.innerText = `Payment amount: ${paymentIntent.amount}`;
  } else {
    // todo: showing error here...
  }
});
