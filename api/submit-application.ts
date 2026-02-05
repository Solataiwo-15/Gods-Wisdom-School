// api/submit-application.ts

// These 'import' statements are for Node.js functions on Vercel.
// They define the types for the request and response objects.
import type { VercelRequest, VercelResponse } from '@vercel/node';

// This is the main function that will be executed when the URL is called.
export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // 1. We only want to accept POST requests for this function.
  //    A GET request would be someone just visiting the URL in their browser.
  if (request.method !== 'POST') {
    // If it's not a POST request, send a "Method Not Allowed" error.
    return response.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    // 2. The form data sent from our React app will be in the 'body' of the request.
    const formData = request.body;

    // 3. For now, we will log the received data to the Vercel server logs.
    //    This is how we'll check if it's working.
    console.log('--- APPLICATION DATA RECEIVED ON SERVER ---');
    console.log(formData);
    console.log('-----------------------------------------');

    // 4. Send a success response back to our React app.
    //    The status '200' means "OK".
    //    We also send a JSON object with a success message.
    response.status(200).json({
      message: 'Application submitted successfully!',
      receivedData: formData, // We can even send the data back for confirmation
    });

  } catch (error) {
    // 5. If anything goes wrong, log the error and send a server error response.
    console.error('Error processing request:', error);
    response.status(500).json({ message: 'An internal server error occurred.' });
  }
}