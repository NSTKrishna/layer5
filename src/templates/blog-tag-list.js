import React from "react";
import usePaginatedSearch from "../utils/usePaginatedSearch";
import SEO from "../components/seo";
import BlogList from "../sections/Blog/Blog-list";
import { graphql } from "gatsby";

export const query = graphql`
  query BlogsByTags($tag: String!) {
    allMdx(
      sort: { fields: { dateForSort: DESC } }
      filter: {
        fields: { collection: { eq: "blog" } }
        frontmatter: { tags: { in: [$tag] }, published: { eq: true } }
      }
    ) {
      nodes {
        id
        frontmatter {
          title
          subtitle
          date(formatString: "MMMM Do, YYYY")
          author
          thumbnail {
            extension
            publicURL
            childImageSharp {
              gatsbyImageData(width: 480, layout: CONSTRAINED)
            }
          }
          darkthumbnail {
            extension
            publicURL
            childImageSharp {
              gatsbyImageData(width: 480, layout: CONSTRAINED)
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`;

const BlogListPage = ({ pageContext, data }) => {
  const {
    searchedPosts,
    queryResults,
    searchData,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    postsPerPage,
  } = usePaginatedSearch(data.allMdx.nodes);

  return (
    <>
      <BlogList
        data={data}
        pageContext={pageContext}
        searchedPosts={searchedPosts}
        setCurrentPage={setCurrentPage}
        postsPerPage={postsPerPage}
        searchData={searchData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        queryResults={queryResults}
      />
    </>
  );
};
export default BlogListPage;

export const Head = () => {
  return (
    <SEO
      title="Blog"
      description="The latest news and announcements about Layer5, our products, and our ecosystem, as well as voices from across our community."
      canonical="https://layer5.io/blog"
    />
  );
};
