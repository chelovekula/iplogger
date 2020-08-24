import React from "react";
import styled from "styled-components";
import { Flex } from "reflexbox/styled-components";

import FeaturesItem from "./FeaturesItem";
import { ColCenterH } from "./Layout";
import { Colors } from "../consts";
import Text, { H3 } from "./Text";

const Features = () => (
  <ColCenterH
    width={1}
    flex="0 0 auto"
    py={[64, 100]}
    backgroundColor={Colors.FeaturesBg}
  >
    <H3 fontSize={[26, 28]} mb={72} light>
      iploggering edge features.
    </H3>
    <Flex
      width={1200}
      maxWidth="100%"
      flex="1 1 auto"
      justifyContent="center"
      flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
    >
      <FeaturesItem title="One" icon="edit">
        Text
      </FeaturesItem>
      <FeaturesItem title="Two" icon="shuffle">
        Text
      </FeaturesItem>
      <FeaturesItem title="3" icon="zap">
        Text
      </FeaturesItem>
      <FeaturesItem title="Four" icon="heart">
        Text
      </FeaturesItem>
    </Flex>
  </ColCenterH>
);

export default Features;
