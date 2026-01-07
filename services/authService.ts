import { makeRedirectUri } from 'expo-auth-session';

// const redirectUri = AuthSession.makeRedirectUri({ scheme: 'swiftyproteins' });
// console.log('Redirect URI:', redirectUri);

export const intraEndpoints = {
  authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
  tokenEndpoint: 'https://api.intra.42.fr/oauth/token',
};

export const redirectUri = makeRedirectUri({
  scheme: 'swiftyproteins',
});


export const clientId = process.env.EXPO_PUBLIC_UID;
export const clientSecret = process.env.EXPO_PUBLIC_SECRET;

export async function exchangeCodeForToken(code: string) {
  const tokenRequest = {
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    redirect_uri: redirectUri,
  };

  // console.log("Exchanging code for token with redirectUri:", redirectUri);

  try {
    const response = await fetch(intraEndpoints.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenRequest),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Token exchange failed:", data);
      throw new Error(data.error_description || 'Failed to exchange token');
    }
    // console.log("Data: ", data);
    return data;
  } catch (error) {
    console.error("Error exchanging code for token", error);
    throw error;
  }
}

export async function refreshAccessToken(refreshToken: string) {
  const tokenRequest = {
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  };

  try {
    const response = await fetch(intraEndpoints.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenRequest),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Token refresh failed:", data);
      throw new Error(data.error_description || 'Failed to refresh token');
    }

    return data;
  } catch (error) {
    console.error("Error refreshing token", error);
    throw error;
  }
}