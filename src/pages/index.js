import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import catAndHumanIllustration from "../images/cat-and-human-illustration.svg";
import { graphql, useStaticQuery } from "gatsby"

function IndexPage() {

  const data = useStaticQuery(graphql`query MyQuery {
    exampleYaml {
      name
      bio
    }
  }
  `)
  const {name,bio} = data.exampleYaml
  return (
    <Layout>
      <SEO
        keywords={[`tfl`, `london travel`]}
        title="Home"
      />

      <section className="text-center">
        <img
          alt="Cat and human sitting on a couch"
          className="block mx-auto w-1/2"
          src={catAndHumanIllustration}
        />

        <h1>{name} is {bio}.</h1>

        <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
          COVD-19 Updates
        </h2>

        <p className="leading-loose">
          Please visit this link{` `}
          <a
            className="font-bold no-underline text-gray-900"
            href="https://tfl.gov.uk/"
          >
            Tfl.gov.uk
          </a>

        </p>
      </section>
    </Layout>
  );
}

export default IndexPage;

