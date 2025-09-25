//@ts-nocheck
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

export default function PaymentIndex({ show, onClose, product }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (!show) {
      // Reset state when modal closes
      setClientSecret(null);
      setPaymentIntentId(null);
      setError(null);
      setEmail("");
      setEmailError("");
      setPaymentSuccess(false);
      setPaymentDetails(null);
      setLoading(false);
    } else {
      // Modal opened - immediately create payment intent
      createPaymentIntent();
    }
  }, [show]);

  const createPaymentIntent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://bizarre-faviola-unmethodized.ngrok-free.app/payments/create-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: product.price,
            currency: "usd",
            productName: product.name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setClientSecret(data?.client_secret);
      setPaymentIntentId(data?.payment_intent_id);
    } catch (error) {
      console.error("There was an error with the request:", error);
      setError("Failed to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const response = await fetch(
        `https://bizarre-faviola-unmethodized.ngrok-free.app/payments/status/${paymentIntentId}`
      );
      const details = await response.json();
      setPaymentDetails(details);
      setPaymentSuccess(true);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      setPaymentSuccess(true); // Still show success even if details fetch fails
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all duration-300 scale-100">
            {/* <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"> */}
            {paymentSuccess ? (
              /* Success View */
              <div className="p-6">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Successful!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your purchase
                  </p>

                  {paymentDetails && (
                    <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Product:</span>
                          <span className="font-medium">{product.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium">
                            ${paymentDetails.amount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">
                            {paymentDetails.email}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium text-green-600">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={onClose}
                    className="w-full px-4 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                        Complete Payment
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Secure payment powered by Stripe
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-gray-400 cursor-pointer hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-50"
                      aria-label="Close modal"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="px-6 py-5 bg-gray-50/50 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Product
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        {product.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Amount
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="p-6">
                  {loading ? (
                    /* Loading State */
                    <div className="flex items-center justify-center py-8">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="animate-spin h-6 w-6 text-gray-900"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="text-gray-900 font-medium">
                          Initializing payment...
                        </span>
                      </div>
                    </div>
                  ) : error ? (
                    /* Error State */
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                      <button
                        onClick={createPaymentIntent}
                        className="w-full px-4 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : clientSecret ? (
                    /* Combined Email + Payment Form */
                    <div className="space-y-6">
                      {/* Email Input */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                          placeholder="your@email.com"
                        />
                        {emailError && (
                          <p className="mt-2 text-sm text-red-600">
                            {emailError}
                          </p>
                        )}
                      </div>

                      {/* Stripe Payment Form */}
                      <CheckoutForm
                        clientSecret={clientSecret}
                        paymentIntentId={paymentIntentId}
                        onSuccess={handlePaymentSuccess}
                        email={email}
                        validateEmail={validateEmail}
                        setEmailError={setEmailError}
                      />
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
