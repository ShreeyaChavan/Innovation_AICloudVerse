// src/utils/lambdaAPI.js
const LAMBDA_URL = 'https://4bchgpzp5gnf2zyvy4ruim64uu0rhyae.lambda-url.ap-south-1.on.aws/ ';

// Simple function to call Lambda
export const callLambda = async (page, data = null) => {
  try {
    const url = `${LAMBDA_URL}?page=${page}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(`Lambda Response (${page}):`, result);
    return result;
  } catch (error) {
    console.error('Lambda Error:', error);
    return null;
  }
};
