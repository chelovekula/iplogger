import { Box, Flex } from "reflexbox/styled-components";
import React, { useState, useEffect } from "react";
import formatDate from "date-fns/format";
import { NextPage } from "next";
import Link from "next/link";
import axios from "axios";

import Text, { H1, H2, H4, Span } from "../components/Text";
import { getAxiosConfig, removeProtocol } from "../utils";
import { Button, NavButton } from "../components/Button";
import { Col, RowCenterV } from "../components/Layout";
import { Area, Bar, Pie, Map } from "../components/Charts";
import PageLoading from "../components/PageLoading";
import AppWrapper from "../components/AppWrapper";
import Divider from "../components/Divider";
import { APIv2, Colors } from "../consts";
import { useStoreState } from "../store";
import ALink from "../components/ALink";
import Icon from "../components/Icon";
import StatsSummaryPage from "./stats_summary";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


interface Props {
  id?: string;
}

const StatsPage: NextPage<Props> = ({ id }) => {

  return (
    <AppWrapper>
      <Tabs>
        <TabList>
          <Tab>Summary</Tab>
          <Tab>Visits</Tab>
          <Tab>Geo</Tab>
        </TabList>
        <TabPanel>
          <StatsSummaryPage id={id}></StatsSummaryPage>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </Tabs>
    </AppWrapper>
  );
};

StatsPage.getInitialProps = ({ query }) => {
  return Promise.resolve(query);
};

StatsPage.defaultProps = {
  id: ""
};

export default StatsPage;
