import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PropTypes from "prop-types";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import cardImg from "../../assets/images/credit_cards.jpg";
import ModalForm from "../ModalForm/ModalForm";

const CheckoutForm = ({ scholarshipId }) => {
  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();

  const [scholarships, setScholarships] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const axiosSecure = useAxiosPrivate();
  const axiosPublic = useAxiosPublic();

  const price = scholarships?.applicationFees.split("$")[1];

  useEffect(() => {
    axiosPublic.get(`/scholarshipDetails/${scholarshipId}`).then((res) => {
      setScholarships(res.data);
    });

    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosPublic, axiosSecure, scholarshipId, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log(paymentMethod);
      setError("");
      setIsModalOpen(true);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName || "anonymous",
            email: user.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error.");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const paymentInfo = {
          email: user.email,
          price: price,
          transactionId: paymentIntent.id,
          date: new Date(),
          scholarshipId: scholarships?._id,
          status: "pending",
        };

        const res = await axiosSecure.post("/payment", paymentInfo);

        if (res.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you, Payment successful.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card md:w-1/2 mx-auto bg-base-100 shadow-xl image-full">
          <figure>
            <img src={cardImg} alt="" />
          </figure>
          <div className="card-body mt-6 text-white justify-evenly">
            <div className="bg-base-300 py-6 px-3 rounded-2xl">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "18px",
                      color: "#333333",
                      "::placeholder": {
                        color: "#333333",
                      },
                    },
                    invalid: {
                      color: "#FF0000",
                    },
                  },
                }}
              ></CardElement>
            </div>
            <div className="card-actions">
              <button
                type="submit"
                className="btn w-full mt-6 bg-orange-400 text-white border-none"
                disabled={!stripe || !clientSecret}
              >
                Pay
              </button>
              <p className="text-red-600 my-1">{error}</p>
              {transactionId && (
                <p className="text-white my-3">
                  Your transaction ID: {transactionId}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
      <ModalForm
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        scholarships={scholarships}
      />
    </div>
  );
};

CheckoutForm.propTypes = {
  scholarshipId: PropTypes.string,
};
export default CheckoutForm;
