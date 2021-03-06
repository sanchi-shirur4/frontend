// @flow
import type { CurrentABTest, SignInGateVariant } from '../types';
import { componentName } from '../component';
import {
    hasUserDismissedGate,
    isNPageOrHigherPageView,
    isLoggedIn,
    isInvalidArticleType,
    isInvalidSection,
    isIOS9,
} from '../helper';

// pull in the show method from the design folder, which has the html template and and click handlers etc.
import { designShow } from './design/patientia';

// define the variant name here
const variant = 'patientia-variant-1';

// method which returns a boolean determining if this variant can be shown on the current pageview
const canShow: (name?: string) => boolean = (name = '') =>
    !hasUserDismissedGate({
        name,
        variant,
        componentName,
    }) &&
    isNPageOrHigherPageView(2) &&
    !isLoggedIn() &&
    !isInvalidArticleType() &&
    !isInvalidSection() &&
    !isIOS9();

// method which runs if the canShow method returns true, used to display the gate and logic associated with it
// it returns a boolean, since the sign in gate is based on a `Banner` type who's show method returns a Promise<boolean>
// in our case it returns true if the design ran successfully, and false if there were any problems encountered
const show: ({
    abTest: CurrentABTest,
    guUrl: string,
    signInUrl: string,
}) => boolean = ({ abTest, guUrl, signInUrl }) =>
    designShow({ abTest, guUrl, signInUrl });

// export the variant as a SignInGateVariant type
export const signInGateVariant: SignInGateVariant = {
    name: variant,
    canShow,
    show,
};
