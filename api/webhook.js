//stripe API
const stripeAPI = require('../stripe');
//fetch API
const fetch = require('node-fetch');

async function webhook(req, res) {
    //stripe signature
    const signature = req.headers['stripe-signature'];
    //event variable
    let event;

    try {
        //construct event
        event = stripeAPI.webhooks.constructEvent(
            req['rawBody'], signature, process.env.WEB_HOOK_SECRET
        );
        //end server call
        res.status(200).end();
    } catch(err) {
        //return error status and message if error occurs
        return res.status(400).send(`Webhook error: ${err.message}.`);
    }

    if(event.type === 'checkout.session.completed') {
        //access session data
        const session = event.data.object;
        //define variables for email confirmation
        const customerName = session['customer_details']['name'];
        const customerEmail = session['customer_details']['email'];
        const amountTotal = session['amount_total'];
        //create a body to send to the POST https://sharedsapience.website/sendConfirmationEmail.php endpoint
        const body = { customerName, customerEmail, amountTotal };
        //send body to endpoint
        try {
            const sendConfirmationEmail = await fetch('https://sharedsapience.website/sendConfirmationEmail.php', {
                method: 'POST',
                body: JSON.stringify(body)
            });
        } catch(ignore) {}
        //end the server call
        res.status(200).end();
    }
}

//export webhook
module.exports = webhook;