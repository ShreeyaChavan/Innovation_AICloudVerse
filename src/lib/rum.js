// src/lib/rum.js
import { AwsRum } from 'aws-rum-web';

console.log('🟡 Initializing CloudWatch RUM...');

try {
  // Tumhara diya hua config - bilkul same
  const config = {
    sessionSampleRate: 1,  // 100% sessions track honge
    endpoint: "https://dataplane.rum.ap-south-1.amazonaws.com",
    telemetries: ["performance", "errors", "http"],
    allowCookies: true,
    enableXRay: false,
    signing: true
  };

  const APPLICATION_ID = '5d6c5342-2394-4b82-8010-2aa2fc387b38';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'ap-south-1';

  // RUM client initialize karo
  const awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
  
  // Global variable mein store karo taaki anywhere use kar sako
  window._awsRumClient = awsRum;
  
  console.log('✅ CloudWatch RUM initialized successfully!');
  console.log('📊 Application ID:', APPLICATION_ID);
  console.log('🌍 Region:', APPLICATION_REGION);
  
} catch (error) {
  console.error('❌ CloudWatch RUM initialization failed:', error);
  console.error('Error details:', error.message);
}
