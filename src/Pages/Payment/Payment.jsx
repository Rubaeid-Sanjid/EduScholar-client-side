// import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
    return (
        <div>
            {/* <SectionTitle className="mt-0" title={'Payment'}></SectionTitle> */}
            <div className="py-20"><h2>Payment</h2></div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;