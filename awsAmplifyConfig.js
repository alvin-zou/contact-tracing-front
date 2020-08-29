import { Linking, Platform } from 'react-native';
import * as LinkingExpo from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import getEnvVars from './environment';

const {
  PoolId,
  AppClientId,
  AppClientSecret,
  Region,
  WebDomain,
} = getEnvVars();

const expoScheme = 'myapp://';

let redirectUrl = LinkingExpo.makeUrl();
console.log(redirectUrl);
// simulator on localhost and devices on LAN
if (redirectUrl.startsWith('exp://1')) {
  redirectUrl += '/--/';
} else if (redirectUrl === expoScheme) {
  // no change required
} else {
  // for expo client
  redirectUrl += '/';
}

const awsAmplifyConfig = {
  Auth: {
    region: Region, // COGNITO USER POOL REGION
    userPoolId: PoolId, // COGNITO USER POOL ID
    userPoolWebClientId: AppClientId, // YOUR APP CLIENT ID
    authenticationFlowType: 'USER_SRP_AUTH',
    oauth: {
      domain: WebDomain, // COGNITO DOMAIN
      scope: ['email', 'openid', 'profile'], // ARRAY OF SCOPES
      redirectSignIn: redirectUrl, // CALLBACK URL
      redirectSignOut: redirectUrl, // SIGN OUT URL
      // 'code' for Authorization code grant,
      // 'token' for Implicit grant
      // Note that REFRESH token will only be generated when the responseType is code
      responseType: 'code',
      urlOpener: urlOpenerExpo,
    },
  },
};

export { awsAmplifyConfig };

async function urlOpenerExpo(url, redirectUrl) {
  console.log('>>>>>>>>> in urlOpener');
  console.log('url', url);
  console.log('redirectUrl', redirectUrl);

  // On Expo, use WebBrowser.openAuthSessionAsync to open the Hosted UI pages.
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl,
    {
      showTitle: false,
      enableDefaultShare: false,
      enableBarCollapsing: true,
    }
  );

  console.log('Type');
  console.log(type);
  console.log('newUrl', newUrl);

  if (type === 'success') {
    await WebBrowser.dismissBrowser();

    // REVIEW: Do we need this conditional?
    if (Platform.OS === 'ios') {
      return Linking.openURL(newUrl);
    }
  }
}
