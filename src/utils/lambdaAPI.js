// src/utils/lambdaAPI.js
const LAMBDA_URL = 'https://8tddyzwpyd.execute-api.ap-south-1.amazonaws.com/prod';

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
