//Stripe API setup
const stripeAPI = require('../stripe');

//function to create a checkout session
async function createCheckoutSession(req, res) {
    //define domain URL
    const domainUrl = process.env.WEB_APP_URL; //currently localhost, but will be the live URL when deployed
    //define line_items and customer_email
    const { line_items, customer_email } = req.body;
    //return an error if either of line_items or customer_email is missing
    if(!line_items || !customer_email) {
        return res.status(400).json({ error: 'missing required session parameters' });
    }
    //declare session variable
    let session;
    //initialize session
    try {
        session = await stripeAPI.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainUrl}/canceled`,
            shipping_address_collection: {
                allowed_countries: ['GB', 'US']
            }
        });
        //return the initialized session id
        res.status(200).json({ sessionId: session.id });
    } catch(error) {
        //return an error message if error occurs
        res.status(400).json({ error: 'An error occurred, unable to create session.'});
    }
}

//export the createCheckoutSession function
module.exports = createCheckoutSession;