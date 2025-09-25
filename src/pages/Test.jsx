//@ts-nocheck
import PaymentIndex from "../components/Stripe/PaymentIndex";
import { useState } from "react";
const Test = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handlePaymentClick = () => {
        setSelectedProduct({
            name: "Premium Subscription",
            price: 29.99,
        });
        setShowModal(true);
    };

    return (
        <div >
            <h1 className="mb-4">Payment test page</h1>
            <button
                onClick={handlePaymentClick}
                className=" px-6 py-2 bg-red-300 text-white rounded"
            >
                Pay Now test
            </button>

            <PaymentIndex
                show={showModal}
                onClose={() => setShowModal(false)}
                product={selectedProduct}
            />
        </div>
    );
};

export default Test;