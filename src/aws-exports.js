const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-south-1_jj3UR1fJZ',
      userPoolClientId: '6mbclsppc44vgo379vkia3115n',
      region: 'ap-south-1',
      loginWith: {
        username: true,    // allow username/password login
        email: false,
        phone: false
      },
      signUpVerificationMethod: 'code',
      userAttributes: {}
    }
  }
};

export default awsConfig;
