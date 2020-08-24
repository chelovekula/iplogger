import getConfig from "next/config";
import React from "react";

import AppWrapper from "../components/AppWrapper";
import { Col } from "../components/Layout";

const { publicRuntimeConfig } = getConfig();

const TermsPage = () => (
  <AppWrapper>
    {/* TODO: better container */}
    <Col width={600} maxWidth="97%" alignItems="flex-start">
      <h3>{publicRuntimeConfig.SITE_NAME} Terms of Service</h3>
      <p>
        By accessing the website at{" "}
        <a href={`https://${publicRuntimeConfig.DEFAULT_DOMAIN}`}>
          https://{publicRuntimeConfig.DEFAULT_DOMAIN}
        </a>
        , you are agreeing to be bound by these terms of service, all applicable
        laws and regulations, and agree that you are responsible for compliance
        with any applicable local laws. If you do not agree with any of these
        terms, you are prohibited from using or accessing this site. The
        materials contained in this website are protected by applicable
        copyright and trademark law.
      </p>
    </Col>
  </AppWrapper>
);

export default TermsPage;
