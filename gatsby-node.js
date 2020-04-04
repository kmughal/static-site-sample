exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {

  const { createNode } = actions

  // Data can come from anywhere, but for now create it manually
  const myData = {
    key: 123,
    foo: `The foo field of my node`,
    bar: `Baz`
  }
  const myData1 = {
    key: 1234,
    foo: `The foo field of my node`,
    bar: `Baz`
  }

  const nodeContent = JSON.stringify(myData)

  const nodeMeta = {
    id: createNodeId(`my-data-${myData.key}`),
    parent: null,
    children: [],
    internal: {
      type: `MyNodeType`,
      mediaType: `text/html`,
      content: nodeContent,
      contentDigest: createContentDigest(myData)
    }
  }

  const node = Object.assign({}, myData, nodeMeta)
  createNode(node)


  const nodeMeta1 = {
    id: createNodeId(`my-data-${myData1.key}`),
    parent: null,
    children: [],
    internal: {
      type: `MyNodeType1`,
      mediaType: `text/html`,
      content: nodeContent,
      contentDigest: createContentDigest(myData1)
    }
  }

  const node1 = Object.assign({}, myData1, nodeMeta1)
  createNode(node1)
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
  console.log("in")
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