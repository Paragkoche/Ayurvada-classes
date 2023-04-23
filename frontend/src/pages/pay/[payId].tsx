import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import React from "react";
import { URL } from "../../api";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import MainCard from "@/Components/MainCard";
import { Box, Button, CircularProgress, Snackbar } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
const stripePromise = loadStripe(
  "pk_test_51MuAQ2SCBZB96tIy8rqRyFAUvr0FsRO8vwLucNkCPTF8yN9TAOO3ouSN8AqpKbtQROQfok4iERCTUPa7VaTEP2gE00UCNT6hdB"
);

export default () => {
  const router = useRouter();
  const { payId } = router.query;
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [amout, setAmout] = React.useState(0);
  React.useEffect(() => {
    if (payId) {
      console.log(payId);

      // Create PaymentIntent as soon as the page loads
      fetch(URL + "/pay/strip/" + payId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setClientSecret(data.clientSecret);
            setAmout(data.amount);
          }
        });
    }
  }, [payId]);
  console.log(payId);
  const options = {
    clientSecret,
    // appearance:{
    //   theme: 'stripe',
    // },
  };
  //   const elements = useElements();
  return (
    clientSecret && (
      <Box px={10} py={10}>
        <MainCard title={`Payment ${amout}₹`}>
          <Elements
            options={{
              ...options,
              appearance: {
                theme: "flat",
              },
            }}
            stripe={stripePromise}
          >
            <From id={payId} />
          </Elements>
        </MainCard>
      </Box>
    )
  );
};
const From = ({ id }: { id: any }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isloading, setIsLoading] = React.useState(false);
  const [isOpan, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [d, { data, error }] = useMutation(gql`
    mutation connect_class($id: ID) {
      connect_class(id: $id) {
        name
      }
    }
  `);
  return (
    <form
      id="payment-form"
      onSubmit={async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page

            return_url: "http://localhost/",
            receipt_email: JSON.parse(localStorage.getItem("user") || "{}")
              .email,
          },
          redirect: "if_required",
        });
        if (error) {
          if (
            error?.type === "card_error" ||
            error?.type === "validation_error"
          ) {
            setMessage(error?.message || "");
            setIsOpen(true);
          } else {
            setMessage("An unexpected error occurred.");
            setIsOpen(true);
          }
        }

        d({
          variables: {
            id: id,
          },
        }).then(() => {
          router.push("/users");
        });

        setIsLoading(false);
      }}
    >
      <PaymentElement
        id="payment-element"
        options={{
          wallets: {
            applePay: "auto",
            googlePay: "auto",
          },
          layout: "accordion",
        }}
      />
      <Button type="submit" id="submit" sx={{ marginTop: "20px" }}>
        {isloading ? (
          <CircularProgress />
        ) : (
          <span id="button-text">Pay now</span>
        )}
      </Button>
      <Snackbar open={isOpan} autoHideDuration={5000} message={message} />
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
};
