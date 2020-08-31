import { Box, Flex } from "reflexbox/styled-components";
import React, { useState, useEffect, FC } from "react";
import formatDate from "date-fns/format";
import { NextPage } from "next";
import Link from "next/link";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Text, { H1, H2, H4, Span } from "../components/Text";
import { errorMessage, getAxiosConfig, removeProtocol, withComma } from "../utils";
import { Button, NavButton } from "../components/Button";
import { Col, RowCenter, RowCenterV } from "../components/Layout";
import { Area, Bar, Pie, Map } from "../components/Charts";
import PageLoading from "../components/PageLoading";
import AppWrapper from "../components/AppWrapper";
import Divider from "../components/Divider";
import { APIv2, Colors } from "../consts";
import { useStoreActions, useStoreState } from "../store";
import ALink from "../components/ALink";
import Icon from "../components/Icon";
import Table from "../components/Table";
import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";
import { useFormState } from "react-use-form-state";
import ms from "ms";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";
import { useMessage } from "../hooks";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Animation from "../components/Animation";
import Tooltip from "../components/Tooltip";
import { Checkbox, TextInput } from "../components/Input";
import Modal from "../components/Modal";
import QRCode from "qrcode.react";
import { Link as LinkType } from "../store/links";

interface Props {
  id?: string;
}

const StatsVisitsPage: NextPage<Props> = ({ id }) => {
  const { isAuthenticated } = useStoreState(s => s.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [period, setPeriod] = useState("lastDay");

  const stats = data && data[period];

  useEffect(() => {
    if (!id || !isAuthenticated) return;
    axios
      .get(`${APIv2.Links}/${id}/visits`, getAxiosConfig())
      .then(({ data }) => {
        setLoading(false);
        setError(!data);
        setData(data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  let errorMessage;

  if (!isAuthenticated) {
    errorMessage = (
      <Flex mt={3}>
        <Icon name="x" size={32} mr={3} stroke={Colors.TrashIcon} />
        <H2>You need to login to view stats.</H2>
      </Flex>
    );
  }

  if (!id || error) {
    errorMessage = (
      <Flex mt={3}>
        <Icon name="x" size={32} mr={3} stroke={Colors.TrashIcon} />
        <H2>Couldn't get stats.</H2>
      </Flex>
    );
  }

  const loader = loading && <PageLoading />;

  const total = stats && stats.views.reduce((sum, view) => sum + view, 0);

  const Tr = styled(Flex).attrs({ as: "tr", px: [12, 12, 2] })``;
  const Th = styled(Flex)``;
  Th.defaultProps = {
    as: "th",
    flexBasis: 0,
    py: [12, 12, 3],
    px: [12, 12, 3]
  };

  const Td = styled(Flex)<{ withFade?: boolean }>`
    position: relative;
    white-space: nowrap;

    ${ifProp(
    "withFade",
    css`
        :after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 16px;
          background: linear-gradient(
            to left,
            white,
            rgba(255, 255, 255, 0.001)
          );
        }

        tr:hover &:after {
          background: linear-gradient(
            to left,
            ${Colors.TableRowHover},
            rgba(255, 255, 255, 0.001)
          );
        }
      `
  )}
  `;
  Td.defaultProps = {
    as: "td",
    fontSize: [15, 16],
    alignItems: "center",
    flexBasis: 0,
    py: [12, 12, 3],
    px: [12, 12, 3]
  };

  const EditContent = styled(Col)`
    border-bottom: 1px solid ${Colors.TableRowHover};
    background-color: #fafafa;
  `;

  interface RowProps {
    index: number;
    visit: any;
  }

  const ogLinkFlex = { flexGrow: [1, 3, 7], flexShrink: [1, 3, 7] };
  const createdFlex = { flexGrow: [1, 1, 2.5], flexShrink: [1, 1, 2.5] };
  const shortLinkFlex = { flexGrow: [1, 1, 3], flexShrink: [1, 1, 3] };
  const viewsFlex = {
    flexGrow: [0.5, 0.5, 1],
    flexShrink: [0.5, 0.5, 1],
    justifyContent: "flex-end"
  };

  const Row: FC<RowProps> = ({ index, visit }) => {

    return (
      <>
        <Tr key={visit.id}>
          <Td {...createdFlex} flexDirection="column" alignItems="flex-start">
            <Text>{formatDistanceToNow(new Date(visit.created_at))} ago</Text>
          </Td>
        </Tr>
      </>
    );
  };

  return (
    <Col>
      {errorMessage ||
      loader ||
      (data && (
        <Col width={1200} maxWidth="95%" alignItems="stretch" m="40px 0">
          <Flex justifyContent="space-between" alignItems="center" mb={3}>
            <H1 fontSize={[18, 20, 24]} light>
              Stats for:{" "}
              <ALink href={data.link} title="Short link">
                {removeProtocol(data.link)}
              </ALink>
            </H1>
            <Text fontSize={[13, 14]} textAlign="right">
              {data.target.length > 80
                ? `${data.target
                  .split("")
                  .slice(0, 80)
                  .join("")}...`
                : data.target}
            </Text>
          </Flex>
          <Col
            backgroundColor="white"
            style={{
              borderRadius: 12,
              boxShadow: "0 6px 15px hsla(200, 20%, 70%, 0.3)",
              overflow: "hidden"
            }}
          >
            <RowCenterV
              flex="1 1 auto"
              backgroundColor={Colors.TableHeadBg}
              justifyContent="space-between"
              py={[3, 3, 24]}
              px={[3, 4]}
            >
              <H4>
                Total clicks: <Span bold>{data.total}</Span>
              </H4>

            </RowCenterV>
            <Col p={[3, 4]}>
              <H2 mb={2} light>
                <Span
                  style={{
                    borderBottom: `1px dotted ${Colors.StatsTotalUnderline}`
                  }}
                  bold
                >
                  {total}
                </Span>{" "}
              </H2>
              <Text fontSize={[13, 14]} color={Colors.StatsLastUpdateText}>
                Last update in{" "}
                {formatDate(new Date(data.updated_at), "hh:mm aa")}
              </Text>
              <Flex width={1} mt={4}>
                {/*<Area data={stats.views} period={period} />*/}
              </Flex>
              {total > 0 && (
                <>
                  <Table scrollWidth="800px">
                    <tbody>
                    {!data.visits.length ? (
                      <Tr width={1} justifyContent="center">
                        <Td flex="1 1 auto" justifyContent="center">
                          {/*<Text fontSize={18} light>*/}
                          {/*  {links.loading*/}
                          {/*    ? "Loading links..."*/}
                          {/*    : tableMessage}*/}
                          {/*</Text>*/}
                        </Td>
                      </Tr>
                    ) : (
                      <>
                        {data.visits.items.map((visit, index) => (
                          <Row index={index}
                               visit={visit}
                               key={visit.id}
                          />
                        ))}
                      </>
                    )}
                    </tbody>
                  </Table>
                </>
              )}
            </Col>
          </Col>
          <Box alignSelf="center" my={64}>
            <Link href="/">
              <ALink href="/" title="Back to homepage" forButton>
                <Button>
                  <Icon name="arrowLeft" stroke="white" mr={2} />
                  Back to homepage
                </Button>
              </ALink>
            </Link>
          </Box>
        </Col>
      ))}
    </Col>
  );
};

StatsVisitsPage.getInitialProps = ({ query }) => {
  return Promise.resolve(query);
};

StatsVisitsPage.defaultProps = {
  id: ""
};

export default StatsVisitsPage;
