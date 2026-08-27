import React from "react";
import usePaginatedSearch from "../utils/usePaginatedSearch";
import SEO from "../components/seo";
import BlogList from "../sections/Blog/Blog-list";
import { graphql } from "gatsby";

export const query = graphql`
  query BlogsByCategory($category: String!) {
    allMdx(
      sort: { fields: { dateForSort: DESC } }
      filter: {
        fields: { collection: { eq: "blog" } }
        frontmatter: { category: { eq: $category }, published: { eq: true } }
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
      description="Articles on how to develop and operatate cloud native infrastucture and microservices."
      canonical="https://layer5.io/blog"
    />
  );
};
