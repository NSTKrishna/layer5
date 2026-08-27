import React from "react";
import Slider from "react-slick";
import SoSpecialWrapper from "./so-special-style";

import Button from "../../../reusecore/Button";
import { graphql, useStaticQuery } from "gatsby";
import Image from "../../../components/image";
import useResponsiveSlider from "../../../utils/useResponsiveSlider";
// import { useStyledDarkMode } from "../../../theme/app/useStyledDarkMode";

const computeSlides = () => {
  const w =
    typeof window !== "undefined"
      ? window.innerWidth || document.documentElement.clientWidth
      : 1200;
  if (w <= 600) return 1;
  if (w <= 800) return 1.5;
  if (w <= 1024) return 2;
  if (w <= 1200) return 2.2;
  return 3;
};

const SoSpecial = () => {
  const {
    isClient,
    slidesToShow: slidesToShowState,
    sliderRef,
  } = useResponsiveSlider(computeSlides);
  const data = useStaticQuery(graphql`
    query newsList {
      allMdx(
        filter: {
          fields: { collection: { eq: "news" } }
          frontmatter: { published: { eq: true } }
        }
        sort: { frontmatter: { date: DESC } }
        limit: 8
      ) {
        nodes {
          id
          frontmatter {
            title
            author
            eurl
            thumbnail {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
              extension
              publicURL
            }
            thumbnail_svg {
              extension
              publicURL
            }
            darkthumbnail {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
              extension
              publicURL
            }
            darkthumbnail_svg {
              extension
              publicURL
            }
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  const settings = {
    dots: slidesToShowState <= 1,
    infinite: false,
    speed: 500,
    swipeToSlide: true,
    slidesToScroll: 1,
    arrows: slidesToShowState !== 1,
    slidesToShow: slidesToShowState ?? 2.5,
  };

  if (!isClient || slidesToShowState === null) return null;

  // const { isDark } = useStyledDarkMode();

  return (
    <SoSpecialWrapper>
      <div className="so-special-head">
        <p>LAYER5 IN THE NEWS</p>
        <h1>We're making a splash</h1>
      </div>
      <div className="special_carousel">
        <Slider
          {...settings}
          key={`review-slider-${slidesToShowState}`}
          ref={sliderRef}
        >
          {data.allMdx.nodes.map(({ id, frontmatter, fields }) => (
            <Button className="special-cont_btn" $url={fields.slug} key={id}>
              <div id="special-cont">
                <div id="special-cont_img">
                  {/* {console.log("Dark Thumbnail:", frontmatter.darkthumbnail)}
                    {console.log("Thumbnail:", frontmatter.thumbnail)} */}
                  <Image
                    {...(frontmatter.thumbnail || frontmatter.thumbnail_svg)}
                    imgStyle={{ objectFit: "contain" }}
                    alt={frontmatter.title}
                  />
                  {/* <Image
                      {...((isDark && frontmatter.darkthumbnail && frontmatter.darkthumbnail.publicURL) || frontmatter.thumbnail)}
                      imgStyle={{ objectFit: "contain" }}
                      alt={frontmatter.title}
                    /> */}
                </div>
                <div id="special-cont_content">
                  <p className="special-cont_para">{frontmatter.title}</p>
                </div>
              </div>
            </Button>
          ))}
        </Slider>
      </div>
      {/* <div className="so-special-foot">
        <p>Layer5 provides cloud native management for monoliths and <br></br>
                   microservices alike.</p>
        <Button className="so-special-foot-btn" $primary $url="/projects" title="Our Projects" />
      </div> */}
    </SoSpecialWrapper>
  );
};

export default SoSpecial;
