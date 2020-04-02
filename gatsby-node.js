exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    const pokemons = [
      { name: "Pikachu", type: "electric" },
      { name: "Squirtle", type: "water" },
    ]
  
    pokemons.forEach(pokemon => {
      const node = {
        name: pokemon.name,
        type: pokemon.type,
        id: createNodeId(`Pokemon-${pokemon.name}`),
        internal: {
          type: "Pokemon",
          contentDigest: createContentDigest(pokemon),
        },
      }
      actions.createNode(node)
    })
  }