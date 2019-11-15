export const isEmpty = target => {
  if (Array.isArray(target)) {
    return target.length === 0
  }

  return typeof target === "undefined" ||
    target === null ||
    target === ""
}

export const isNotEmpty = target => (!isEmpty(target))

export const isNil = target => isEmpty(target)

export const isObject = target => (typeof target === "object" && isNotEmpty(target))

export const isNotObject = target => !isObject(target)

export const isObjectLiteral = target => (Object.getPrototypeOf(target) === Object.prototype)

export const isNotObjectLiteral = target => !isObjectLiteral(target)
