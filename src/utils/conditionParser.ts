import Mustache from "mustache"

export function parseCondition(condition: any, data: any) {
  const template = Mustache.render(condition, { id: data })
  return JSON.parse(template)
}
