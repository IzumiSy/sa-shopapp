const stripe = Stripe("pk_test_46zswMCbz39W2KAqKj43vDRu");

const clientSecret = document.querySelector("#client-secret");
const elements = stripe.elements({
  clientSecret: clientSecret.value,
});

// Create and mount the Payment Element
const paymentElement = elements.create("payment");
paymentElement.mount("#payment-element");
