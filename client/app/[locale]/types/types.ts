const isString = (value: unknown): value is string => {
  // (value is string ) This is a type predicate, which means that if the function returns true, the value is considered to be of type string.
  return typeof value === "string";
};

// explanation: here i don't know what's the type coming
// if it's string randomly
//  it will return true
//   but here i make it
// return the string instead of true
// this return happens because of the line (value is string)

export { isString };
