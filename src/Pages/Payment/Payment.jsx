// import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm";
import { useContext } from "react";
import { scholarshipContext } from "../../Component/ScholarshipContext/ScholarshipProvider";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

    const {scholarshipId} = useContext(scholarshipContext)

    return (
        <div>
            {/* <SectionTitle className="mt-0" title={'Payment'}></SectionTitle> */}
            <div className="py-20"><h2>Payment</h2></div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm scholarshipId={scholarshipId}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;