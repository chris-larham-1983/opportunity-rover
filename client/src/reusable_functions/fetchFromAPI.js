//define API
const API = (process.env.NODE_ENV === 'production')? 'https://mars-imgs-ecommerce.herokuapp.com': 'http://localhost:5000'; //localhost / deployed website URL

export default async function fetchFromAPI(endpoint, opts) {
    //define method and body
    const { method, body } = { method: 'POST', body: null, ...opts };
    //communicate with ${API}/create-checkout-session to create a Stripe checkout session
    const createStripeSession = await fetch(`${API}/${endpoint}`, {
        //method = method: 'POST'; body = body: { line_items, customer_id }
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return createStripeSession.json();
}