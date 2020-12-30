export default function (markup, style) {
  const template = document.createElement('template')
  template.innerHTML = `${markup}<style type="text/css">${style}</style>`
  return template
}
