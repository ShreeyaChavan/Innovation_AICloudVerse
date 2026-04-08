// src/aws-exports.js
const awsConfig = {
  Auth: {
    region: 'ap-south-1',           // your Cognito region
    userPoolId: 'ap-south-1_jj3UR1fJZ',    // from your screenshot
    userPoolWebClientId: '6mbclsppc44vgo379vkia3115n', // create an app client in Cognito
    mandatorySignIn: false,
    authenticationFlowType: 'USER_SRP_AUTH'
  }
};

export default awsConfig;
