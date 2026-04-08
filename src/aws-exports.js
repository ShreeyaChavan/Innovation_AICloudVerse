// src/aws-exports.js
const awsConfig = {
  Auth: {
    region: 'ap-south-1',           // your Cognito region
    userPoolId: 'ap-south-1_jj3UR1fJZ',    // from your screenshot
    userPoolWebClientId: 'YOUR_APP_CLIENT_ID', // create an app client in Cognito
    mandatorySignIn: false,
    authenticationFlowType: 'USER_SRP_AUTH'
  }
};

export default awsConfig;