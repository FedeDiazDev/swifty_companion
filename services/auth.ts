import * as AuthSession from 'expo-auth-session';

const redirectUri = AuthSession.makeRedirectUri({ scheme: 'swiftyproteins' });
console.log('Redirect URI:', redirectUri);