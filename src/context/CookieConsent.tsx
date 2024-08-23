"use client";

import { Box, Button } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Cookie } from "lucide-react";
import { createContext, ReactNode, useContext, useState } from "react";

const COOKIE_CONSENT_NAME = "consentResponse";

export enum Consent {
  Yes = "yes",
  No = "no",
}

interface CookieConsentContextValue {
  cookieConsent: Consent | undefined;
  setConsent: (consent: Consent | undefined) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue>({
  cookieConsent: undefined,
  setConsent: () => null,
});

interface CookieConsentContextProps {
  children: ReactNode;
}

export const CookieConsentProvider = ({
  children,
}: CookieConsentContextProps) => {
  const consentVal = Cookies.get(COOKIE_CONSENT_NAME);
  const parseCookieVal = (val: string | undefined): Consent | undefined => {
    if (val === Consent.Yes) {
      return Consent.Yes;
    } else if (val === Consent.No) {
      return Consent.No;
    } else {
      return undefined;
    }
  };
  const [consent, setConsent] = useState<Consent | undefined>(
    parseCookieVal(consentVal)
  );

  const handleSetConsent = (consent: Consent | undefined) => {
    setConsent(consent);
    if (consent) {
      // Cookie expires after 6 months, ensuring the user is prompted regularly.
      Cookies.set(COOKIE_CONSENT_NAME, consent, { expires: 180 });
    } else {
      /*
       * Ensures stale consents are removed. Also, when the user asks to change
       * their consent, removing the cookie causes the modal to re-open.
       */
      Cookies.remove(COOKIE_CONSENT_NAME);
    }

    /*
     * Forcing a refresh ensures the data layer is cleared and the
     * script tag is added / removed, based on the users consent
     */
    window.location.reload();
  };

  return (
    <CookieConsentContext.Provider
      value={{ cookieConsent: consent, setConsent: handleSetConsent }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = (): CookieConsentContextValue => {
  return useContext(CookieConsentContext);
};

export const ClearCookieConsentButton = () => {
  const { setConsent } = useCookieConsent();

  const handleChangeConsent = () => {
    /*
     * When `consent` is undefined, Google Analytics is removed and the modal
     * re-opens, allowing the user to update their preferences.
     */
    setConsent(undefined);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Cookie size={16} />
      <Button
        variant="link"
        onClick={handleChangeConsent}
        color="text"
        fontSize="sm"
        fontWeight="normal"
      >
        Change Cookie Consent
      </Button>
    </Box>
  );
};
