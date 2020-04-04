import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from "prop-types";

function FakeComponent({pageContext}) {
    
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Contact"
      />
      <section>
        {pageContext.id} has {pageContext.foo}
      </section>
    </Layout>
  );
}
FakeComponent.propTypes = {
    pageContext : PropTypes.object.isRequired
}
export default FakeComponent;
