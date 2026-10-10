import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledJobsSection = styled.section`
  max-width: 1000px;
`;

const StyledJobList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--lightest-navy);
`;

const StyledJob = styled.li`
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-gap: 20px;
  padding: 35px 0;
  border-bottom: 1px solid var(--lightest-navy);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 10px;
    padding: 30px 0;
  }

  .range {
    margin: 4px 0 0;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  h3 {
    margin: 0 0 12px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .description {
    max-width: 600px;
    color: var(--slate);
    font-size: var(--fz-md);

    ul {
      ${({ theme }) => theme.mixins.fancyList};
      margin: 0;
    }

    p {
      margin: 0;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 20px 0 0;
    padding: 0;
    list-style: none;

    li {
      padding: 5px 12px;
      border: 1px solid var(--lightest-navy);
      border-radius: 999px;
      background-color: var(--light-navy);
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.5;
    }
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              range
              url
              tags
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  return (
    <StyledJobsSection id="jobs">
      <h2 className="numbered-heading">Where I’ve Worked</h2>

      <StyledJobList>
        {jobsData &&
          jobsData.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, url, company, range, tags } = frontmatter;

            return (
              <StyledJob key={i}>
                <p className="range">{range}</p>

                <div>
                  <h3>
                    {title} at{' '}
                    {url ? (
                      <a href={url} target="_blank" rel="noreferrer">
                        {company}
                      </a>
                    ) : (
                      company
                    )}
                  </h3>

                  <div className="description" dangerouslySetInnerHTML={{ __html: html }} />

                  {tags && tags.length > 0 && (
                    <ul className="tags">
                      {tags.map((tag, j) => (
                        <li key={j}>{tag}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </StyledJob>
            );
          })}
      </StyledJobList>
    </StyledJobsSection>
  );
};

export default Jobs;
