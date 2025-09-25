// //@ts-nocheck
// import {
//     Elements,
//     PaymentElement,
//     useElements,
//     useStripe
// } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useState } from "react";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// function PaymentForm({ paymentIntentId, onSuccess, email }) {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [message, setMessage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         setIsLoading(true);
//         setMessage(null);

//         // Confirm payment without redirect
//         const { error, paymentIntent } = await stripe.confirmPayment({
//             elements,
//             redirect: "if_required", // This prevents automatic redirect
//             confirmParams: {
//                 receipt_email: email,
//             },
//         });

//         if (error) {
//             // Handle errors
//             if (error.type === "card_error" || error.type === "validation_error") {
//                 setMessage(error.message);
//             } else {
//                 setMessage("An unexpected error occurred. Please try again.");
//             }
//             setIsLoading(false);
//         } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//             // Payment succeeded
//             onSuccess(paymentIntentId);
//         } else if (paymentIntent && paymentIntent.status === 'processing') {
//             // Payment is processing
//             setMessage("Payment is processing. Please wait...");
//             // Poll for payment status
//             setTimeout(() => checkPaymentStatus(paymentIntentId), 3000);
//         }
//     };

//     const checkPaymentStatus = async (intentId) => {
//         try {
//             const response = await fetch(`http://localhost:3000/payments/status/${intentId}`);
//             const data = await response.json();
            
//             if (data.status === 'succeeded') {
//                 onSuccess(intentId);
//             } else if (data.status === 'processing') {
//                 setMessage("Payment is still processing...");
//                 setTimeout(() => checkPaymentStatus(intentId), 3000);
//             } else {
//                 setMessage("Payment failed. Please try again.");
//                 setIsLoading(false);
//             }
//         } catch (error) {
//             setMessage("Error checking payment status.");
//             setIsLoading(false);
//         }
//     };

//     const paymentElementOptions = {
//         layout: "tabs",
//         defaultValues: {
//             billingDetails: {
//                 email: email,
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6">

//             {/* Stripe Payment Element */}
//             <div className="stripe-payment-element-container">
//                 <PaymentElement
//                     options={paymentElementOptions}
//                     className="min-h-[180px]"
//                 />
//             </div>

//             {/* Error Message */}
//             {message && (
//                 <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
//                     <div className="flex items-start">
//                         <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                         </svg>
//                         <p className="text-sm font-medium text-red-800">{message}</p>
//                     </div>
//                 </div>
//             )}

//             {/* Submit Button */}
//             <button
//                 type="submit"
//                 disabled={isLoading || !stripe || !elements}
//                 className="w-full cursor-pointer px-4 py-4 bg-gray-900 text-white font-semibold rounded-xl 
//                          hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 
//                          focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed 
//                          transition-all duration-200 flex items-center justify-center text-[15px] tracking-tight"
//             >
//                 {isLoading ? (
//                     <>
//                         <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Processing payment...
//                     </>
//                 ) : (
//                     <>
//                         <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                         </svg>
//                         Complete Payment
//                     </>
//                 )}
//             </button>

//             {/* Security Notice */}
//             <div className="flex items-center justify-center text-xs text-gray-500 space-x-4">
//                 <div className="flex items-center">
//                     <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                     </svg>
//                     SSL Encrypted
//                 </div>
//                 <div className="h-3 w-px bg-gray-300"></div>
//                 <div className="flex items-center">
//                     <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     PCI Compliant
//                 </div>
//             </div>
//         </form>
//     );
// }

// export default function CheckoutForm({ clientSecret, paymentIntentId, onSuccess, email }) {
//     // Enhanced Stripe appearance with clean styling
//     const appearance = {
//         theme: 'stripe',
//         variables: {
//             colorPrimary: '#111827',
//             colorBackground: '#ffffff',
//             colorText: '#111827',
//             colorTextSecondary: '#6b7280',
//             colorTextPlaceholder: '#9ca3af',
//             borderRadius: '12px',
//             spacingUnit: '4px',
//             fontFamily: 'system-ui, sans-serif',
//         },
//         rules: {
//             '.Tab': {
//                 border: '1px solid #d1d5db',
//                 borderRadius: '8px',
//                 boxShadow: 'none',
//             },
//             '.Tab:hover': {
//                 boxShadow: 'none',
//             },
//             '.Tab:focus': {
//                 boxShadow: 'none',
//             },
//             '.Tab--selected': {
//                 border: '1px solid #111827',
//                 boxShadow: 'none',
//             },
//             '.Tab--selected:focus': {
//                 border: '1px solid #111827', // Dark border for selected
//                 boxShadow: 'none',
//             },
//             '.Input': {
//                 border: '1px solid #d1d5db',
//                 borderRadius: '8px',
//                 boxShadow: 'none',
//                 outline: 'none',
//             },
//             '.Input:focus': {
//                 border: '1px solid #111827',
//                 boxShadow: 'none',
//                 outline: 'none',
//             },
//             '.Label': {
//                 fontWeight: '500',
//                 fontSize: '14px',
//             },
//             '.Error': {
//                 fontSize: '13px',
//                 color: '#dc2626',
//             },
//             '.Block': {
//                 border: '1px solid #d1d5db',
//                 borderRadius: '12px',
//                 boxShadow: 'none',
//                 padding: '16px',
//             },
//         }
//     };

//     const options = {
//         clientSecret,
//         appearance,
//         loader: 'auto',
        
//     };

//     return (
//         <Elements stripe={stripePromise} options={options}>
//             <PaymentForm 
//                 paymentIntentId={paymentIntentId}
//                 onSuccess={onSuccess}
//                 email={email}
//             />
//         </Elements>
//     );
// }

//@ts-nocheck
import {
    Elements,
    ExpressCheckoutElement,
    PaymentElement,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentForm({ paymentIntentId, onSuccess, email, amount, productName }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [expressCheckoutError, setExpressCheckoutError] = useState(null);
    const [expressCheckoutAvailable, setExpressCheckoutAvailable] = useState(false);


useEffect(() => {
    const checkPaymentAvailability = async () => {
        if (!stripe) return;
        
        const { applePay, googlePay } = await stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: 'Total',
                amount: 1000,
            },
            requestPayerName: true,
            requestPayerEmail: true,
        }).canMakePayment() || {};
        
        console.log('Apple Pay available:', applePay);
        console.log('Google Pay available:', googlePay);
    };
    
    checkPaymentAvailability();
}, [stripe]);


    // Handle Express Checkout click
    const handleExpressCheckoutConfirm = async (event) => {
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        setMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href,
            },
            redirect: "if_required",
        });

        if (error) {
            setExpressCheckoutError(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess(paymentIntentId);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        setMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
            confirmParams: {
                receipt_email: email,
            },
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess(paymentIntentId);
        } else if (paymentIntent && paymentIntent.status === 'processing') {
            setMessage("Payment is processing. Please wait...");
            setTimeout(() => checkPaymentStatus(paymentIntentId), 3000);
        }
    };

    const checkPaymentStatus = async (intentId) => {
        try {
            const response = await fetch(`https://bizarre-faviola-unmethodized.ngrok-free.app/payments/status/${intentId}`);
            const data = await response.json();
            
            if (data.status === 'succeeded') {
                onSuccess(intentId);
            } else if (data.status === 'processing') {
                setMessage("Payment is still processing...");
                setTimeout(() => checkPaymentStatus(intentId), 3000);
            } else {
                setMessage("Payment failed. Please try again.");
                setIsLoading(false);
            }
        } catch (error) {
            setMessage("Error checking payment status.");
            setIsLoading(false);
        }
    };

    const paymentElementOptions = {
        layout: "tabs",
        defaultValues: {
            billingDetails: {
                email: email,
            }
        }
    };

    const expressCheckoutOptions = {
        buttonHeight: 48,
        paymentMethods: {
            applePay: 'always',
            googlePay: 'always',
            link: 'auto',
        },
        walletReturnUrl: window.location.href,
    };

    return (
        <div className="space-y-6">
            {/* Express Checkout Element */}
            <div className="express-checkout-container">
                <div className="relative">
                    <ExpressCheckoutElement
                        options={expressCheckoutOptions}
                        onConfirm={handleExpressCheckoutConfirm}
                        onReady={(event) => {
                            // Check if any express payment methods are available
                        if (event.availablePaymentMethods) {
                            setExpressCheckoutAvailable(true);
                            console.log('Available express payment methods:', event.availablePaymentMethods);
                        }
                        }}
                        onLoadError={(event) => {
                            setExpressCheckoutError("Express checkout is not available");
                        }}
                    />
                    {expressCheckoutError && (
                        <p className="text-xs text-red-600 mt-1">{expressCheckoutError}</p>
                    )}
                </div>

                {/* Only show divider if express checkout is available */}
                {expressCheckoutAvailable && (
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Or pay with card</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Regular Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="stripe-payment-element-container">
                    <PaymentElement
                        options={paymentElementOptions}
                        className="min-h-[180px]"
                    />
                </div>

                {message && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-medium text-red-800">{message}</p>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading || !stripe || !elements}
                    className="w-full cursor-pointer px-4 py-4 bg-gray-900 text-white font-semibold rounded-xl 
                             hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 
                             focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed 
                             transition-all duration-200 flex items-center justify-center text-[15px] tracking-tight"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing payment...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Complete Payment
                        </>
                    )}
                </button>

                <div className="flex items-center justify-center text-xs text-gray-500 space-x-4">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        SSL Encrypted
                    </div>
                    <div className="h-3 w-px bg-gray-300"></div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        PCI Compliant
                    </div>
                </div>
            </form>
        </div>
    );
}

export default function CheckoutForm({ clientSecret, paymentIntentId, onSuccess, email }) {
    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#111827',
            colorBackground: '#ffffff',
            colorText: '#111827',
            colorTextSecondary: '#6b7280',
            colorTextPlaceholder: '#9ca3af',
            borderRadius: '12px',
            spacingUnit: '4px',
            fontFamily: 'system-ui, sans-serif',
        },
        rules: {
            '.Tab': {
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                boxShadow: 'none',
            },
            '.Tab--selected': {
                border: '1px solid #111827',
                boxShadow: 'none',
            },
            '.Input': {
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                boxShadow: 'none',
                outline: 'none',
            },
            '.Input:focus': {
                border: '1px solid #111827',
                boxShadow: 'none',
                outline: 'none',
            },
        }
    };

    const options = {
        clientSecret,
        appearance,
        loader: 'auto',
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentForm 
                paymentIntentId={paymentIntentId}
                onSuccess={onSuccess}
                email={email}
            />
        </Elements>
    );
}
