import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm";
import { useContext } from "react";
import { scholarshipContext } from "../../Component/ScholarshipContext/ScholarshipProvider";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

    const {scholarshipId} = useContext(scholarshipContext)

    return (
        <div className="container mx-auto px-3 lg:px-12">
            <div className="pt-4 lg:pt-32 pb-5 text-center text-3xl lg:text-4xl font-medium"><h2>Payment Gateway</h2></div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm scholarshipId={scholarshipId}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;