exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  // Data can come from anywhere, but for now create it manually
  const myData = {
    key: 123,
    foo: `The foo field of 123`,
    bar: `Baz`
  }
  const myData1 = {
    key: 1234,
    foo: `The foo field of 1234`,
    bar: `Baz1`
  }

  const parent = {
    id: createNodeId("parent"),
    name: "general information",
    internal: {
      type: "generalInformation",
      contentDigest: createContentDigest("parent-node")
    },
    children: []
  }


  const nodeContent = JSON.stringify(myData)

  const nodeMeta = {
    id: createNodeId(`my-data-${myData.key}`),
    parent: parent.id,
    children: [],
    internal: {
      type: "Type1",
      mediaType: `text/html`,
      content: nodeContent,
      contentDigest: createContentDigest(myData)
    }
  }


  const nodeContent1 = JSON.stringify(myData1)


  const nodeMeta1 = {
    id: createNodeId(`my-data-${myData1.key}`),
    parent: parent.id,
    children: [],
    internal: {
      type: "Type1",
      mediaType: `text/html`,
      content: nodeContent1,
      contentDigest: createContentDigest(myData1)
    }
  }
  const child = Object.assign({}, myData, nodeMeta)
  const child1 = Object.assign({}, myData1, nodeMeta1)



  actions.createNode(parent)
  actions.createNode(child)
  actions.createNode(child1)
  actions.createParentChildLink({ parent, child })
  actions.createParentChildLink({ parent, child: child1 })

}


const jsYaml = require(`js-yaml`)
const _ = require(`lodash`)

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  function transformObject(obj, id, type) {
    const yamlNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    }
    createNode(yamlNode)
    createParentChildLink({ parent: node, child: yamlNode })
  }
  const { createNode, createParentChildLink } = actions

  if (node.internal.mediaType !== `text/yaml`) {
    return
  }

  const content = await loadNodeContent(node)
  const parsedContent = jsYaml.load(content)
  parsedContent.forEach((obj, i) => {
    transformObject(
      obj,
      obj.id ? obj.id : createNodeId(`${node.id} [${i}] >>> YAML`),
      _.upperFirst(_.camelCase(`${node.name} Yaml`))
    )
  })
}

exports.onCreateNode = onCreateNode