import React from "react";
import FeatureHeroWrapper from "./featureHero.style";
import { Container } from "../../reusecore/Layout";
import Button from "../../reusecore/Button";
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
            title="Try Now!"
            $url="https://cloud.layer5.io"
            $external={true}
          />
        </div>
        <div className={"whiteboard-image"}>
          <img id={"whiteboard-svg"} src={props.data.image} alt={""} />
        </div>
      </Container>
    </FeatureHeroWrapper>
  );
};

export default FeatureHero;
