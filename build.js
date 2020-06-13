const fs = require('fs');

const source = require('./source.json')

const surfaces = require('./source/surfaces.json')
const actionsBlocks = require('./source/actions-blocks.json')
const inputBlocks = require('./source/input-blocks.json')
const miscBlocks = require('./source/misc-blocks.json')
const sectionBlocks = require('./source/section-blocks.json')
const contextBlocks = require('./source/context-blocks.json')

const snippets = surfaces
  .concat(actionsBlocks)
  .concat(inputBlocks)
  .concat(miscBlocks)
  .concat(sectionBlocks)
  .concat(contextBlocks)


function createSnippetBody(inputBody) {
  const stringifiedBody = JSON.stringify(inputBody, null, 4)

  outputBody = []
  stringifiedBody.split("\n").forEach(line => {
    const formattedLine = line.replace(/"/g, '\"').replace(/    /g, "\t")
    outputBody.push(formattedLine)
  })
  return outputBody
}

const output = {}
snippets.forEach(snippet => {
  output[snippet.name] = {
    prefix: snippet.name.toLowerCase(),
    body: createSnippetBody(snippet.body)
  }
})



fs.writeFileSync('snippets.json', JSON.stringify(output, null, 4))

console.log("Build complete")
