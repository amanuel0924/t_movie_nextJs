type FilterValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | number[]
  | Date[]
  | []

export const startsWith = (column: string, val: FilterValue, type: string) => {
  if (type === "number") {
    return { [column]: { startsWith: val.toString() } }
  } else {
    return { [column]: { startsWith: val, mode: "insensitive" } }
  }
}

export const endsWith = (column: string, val: FilterValue) => {
  return { [column]: { endsWith: val, mode: "insensitive" } }
}

export const contains = (column: string, val: FilterValue) => {
  return { [column]: { contains: val, mode: "insensitive" } }
}

export const fuzzy = (column: string, val: FilterValue) => {
  return { [column]: { contains: val, mode: "insensitive" } }
}

export const equals = (column: string, val: FilterValue, type: string) => {
  let value: FilterValue
  if (type === "number") {
    value = Number(val)
    return { [column]: value }
  } else if (type === "date") {
    value = new Date(val as Date)
    return { [column]: value }
  } else if (type === "checkbox") {
    value = val === "true"
    return { [column]: value }
  } else if (type === "multiSelect") {
    value = val
    if (Array.isArray(value)) {
      if (value.length >= 1) {
        return { [column]: { in: value } }
      }
    }
  } else {
    value = val
    return { [column]: { equals: value, mode: "insensitive" } }
  }
}

export const notEquals = (column: string, val: FilterValue, type: string) => {
  let value: FilterValue
  if (type === "number") {
    value = Number(val)
    return { [column]: { not: value } }
  } else if (type === "date") {
    value = new Date(val as Date)
    return { [column]: { not: value } }
  } else if (type === "checkbox") {
    value = val === "true"
    return { [column]: { not: value } }
  } else if (type === "multiSelect") {
    value = val
    if (Array.isArray(value)) {
      if (value.length >= 1) {
        return { [column]: { notIn: value } }
      }
    }
    return {}
  } else {
    value = val
    return { [column]: { not: value, mode: "insensitive" } }
  }
}

export const between = (column: string, val: FilterValue, type: string) => {
  if (Array.isArray(val)) {
    let value: FilterValue = val

    if (value[0] && value[1]) {
      if (type === "number") {
        value = val.map(Number) as [number, number]
        return { [column]: { gt: value[0], lt: value[1] } }
      } else if (type === "date") {
        value = val.map((date) => new Date(date)) as [Date, Date]
        return { [column]: { gt: value[0], lt: value[1] } }
      } else {
        return { [column]: { gt: value[0], lt: value[1], mode: "insensitive" } }
      }
    } else if (value[0]) {
      return greaterThan(column, value[0] as string, type)
    } else if (value[1]) {
      return lessThan(column, value[1] as string, type)
    }
  } else {
    return { [column]: {} }
  }
}

export const betweenInclusive = (
  column: string,
  val: FilterValue,
  type: string
) => {
  if (Array.isArray(val)) {
    let value: FilterValue = val

    if (value[0] && value[1]) {
      if (type === "number") {
        value = val.map(Number) as [number, number]
        return { [column]: { gte: value[0], lte: value[1] } }
      } else if (type === "date") {
        value = val.map((date) => new Date(date)) as [Date, Date]
        return { [column]: { gte: value[0], lte: value[1] } }
      } else {
        return {
          [column]: { gte: value[0], lte: value[1], mode: "insensitive" },
        }
      }
    } else if (value[0]) {
      return greaterThanOrEqualTo(column, value[0] as string, type)
    } else if (value[1]) {
      return lessThanOrEqualTo(column, value[1] as string, type)
    }
  } else {
    return { [column]: {} }
  }
}

export const lessThan = (column: string, val: FilterValue, type: string) => {
  let value: FilterValue
  if (type === "number") {
    value = Number(val)
    return { [column]: { lt: value } }
  } else if (type === "date") {
    value = new Date(val as string)
    return { [column]: { lt: value } }
  } else {
    return { [column]: { lt: val, mode: "insensitive" } }
  }
}

export const greaterThan = (column: string, val: FilterValue, type: string) => {
  let value: FilterValue
  if (type === "number") {
    value = Number(val)
    return { [column]: { gt: value } }
  } else if (type === "date") {
    value = new Date(val as string)
    return { [column]: { gt: value } }
  } else {
    return { [column]: { gt: val, mode: "insensitive" } }
  }
}

export const lessThanOrEqualTo = (
  column: string,
  val: FilterValue,
  type: string
) => {
  let value: FilterValue
  if (type === "number") {
    value = Number(val)
    return { [column]: { lte: value } }
  } else if (type === "date") {
    value = new Date(val as string)
    return { [column]: { lte: value } }
  } else {
    return { [column]: { lte: val, mode: "insensitive" } }
  }
}

export const greaterThanOrEqualTo = (
  column: string,
  val: FilterValue,
  type: string
) => {
  let value: FilterValue
  if (type === "number") {
    value = Number(val)
    return { [column]: { gte: value } }
  } else if (type === "date") {
    value = new Date(val as string)
    return { [column]: { gte: value } }
  } else {
    return { [column]: { gte: val, mode: "insensitive" } }
  }
}

export const empty = (column: string) => {
  return { [column]: null }
}

export const notEmpty = (column: string) => {
  return { [column]: { not: null } }
}

export const createFilterCondition = (
  column: string,
  value: FilterValue,
  mode: string,
  type: string
) => {
  switch (mode) {
    case "startsWith":
      return startsWith(column, value, type)
    case "contains":
      return contains(column, value)
    case "endsWith":
      return endsWith(column, value)
    case "fuzzy":
      return fuzzy(column, value)
    case "equals":
      return equals(column, value, type)
    case "notEquals":
      return notEquals(column, value, type)
    case "lessThan":
      return lessThan(column, value, type)
    case "greaterThan":
      return greaterThan(column, value, type)
    case "lessThanOrEqualTo":
      return lessThanOrEqualTo(column, value, type)
    case "greaterThanOrEqualTo":
      return greaterThanOrEqualTo(column, value, type)
    case "between":
      return between(column, value, type)
    case "betweenInclusive":
      return betweenInclusive(column, value, type)
    case "empty":
      return empty(column)
    case "notEmpty":
      return notEmpty(column)
    default:
      console.warn(`Unsupported filter mode: ${mode}`)
      return {}
  }
}
