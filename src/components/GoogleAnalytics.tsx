"use client";

import { Consent, useCookieConsent } from "@/context/CookieConsent";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Cookie } from "lucide-react";
import Script from "next/script";
import { useEffect } from "react";

interface ConsentModalProps {
  showModal: boolean;
  handleConsent: (consent: Consent) => void;
}

const ConsentModal = ({ showModal, handleConsent }: ConsentModalProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (showModal) {
      onOpen();
    }
  }, [showModal]);

  const handleAccept = () => {
    handleConsent(Consent.Yes);
    onClose();
  };

  const handleDecline = () => {
    handleConsent(Consent.No);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" alignItems="center" gap={3}>
          <Cookie /> Cookie Time! <Cookie />
        </ModalHeader>
        <ModalBody>
          <Stack spacing={3}>
            <Text>
              Hi there, welcome to Titans of Industry! We're thrilled to have
              you.
            </Text>
            <Text>
              To help us make our site even more awesome, we use cookies to see
              how you're interacting with it.
            </Text>
            <Text>
              Don't worry—these cookies are optional and just help us improve
              your experience. We use Google Analytics to track site activity,
              so we can keep things fun and engaging for everyone.
            </Text>
            <Text>
              The choice to accept cookies is entirely up to you. Enjoy your
              time with us!
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="teal" mr={3} onClick={handleAccept}>
            Yeah, that's fine!
          </Button>
          <Button variant="outline" colorScheme="teal" onClick={handleDecline}>
            No thanks.
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const GoogleAnalytics = () => {
  const ga_id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
  const { cookieConsent, setConsent } = useCookieConsent();

  const handleConsent = (consent: Consent) => {
    setConsent(consent);
  };

  return (
    <>
      <ConsentModal
        showModal={cookieConsent === undefined}
        handleConsent={handleConsent}
      />
      {ga_id && cookieConsent === Consent.Yes && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`}
          />
          <Script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga_id}');
              `,
            }}
          />
        </>
      )}
    </>
  );
};
