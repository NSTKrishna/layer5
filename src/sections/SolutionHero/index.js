import React from "react";
import FeatureHeroWrapper from "./featureHero.style";
import { Container } from "../../reusecore/Layout";
import Button from "../../reusecore/Button";
import { FiDownloadCloud } from "@react-icons/all-files/fi/FiDownloadCloud";
import useScrollTiltEffect from "../../utils/useScrollTiltEffect";
const FeatureHero = (props) => {
  useScrollTiltEffect("whiteboard-svg");

  return (
    <FeatureHeroWrapper>
      <Container className={"heading-container"}>
        <div className={"section-title"}>
          <h1 className={"whiteboard-heading"}>{props.data.heading}</h1>
          <p className={"whiteboard-text"}>{props.data.sub_heading}</p>
          <Button
            $primary
            className="banner-btn two"
            title="See Meshery"
            $url="/cloud-native-management/meshery"
          >
            <FiDownloadCloud size={21} className="icon-left" />
          </Button>
        </div>
        <div className={"whiteboard-image"}>
          <img id={"whiteboard-svg"} src={props.data.image} alt={""} />
        </div>
      </Container>
    </FeatureHeroWrapper>
  );
};

export default FeatureHero;
