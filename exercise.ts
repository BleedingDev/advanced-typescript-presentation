// Generics simple
function loggingIdentity(arg) {
  console.log(arg);
  return arg;
}

// Generics advanced + Overloading + index types
function get(obj, path) {
  return path.reduce(
    (prev, next) => (prev !== undefined ? prev[next] : undefined),
    obj
  );
}

// Utility types
function patch(obj, patch) {
  return {
    ...obj,
    ...patch
  };
}

function omit(obj, ...keys) {
  const clone = { ...obj };
  keys.forEach(key => delete clone[key]);
  return clone;
}

// Type guards
interface Bird {
  fly(): void;
}
interface Cat {
  walk(): void;
}
declare function getSmallPet(): Bird | Cat;

const pet = getSmallPet();

// String/number literal types
async function animateMove(x, y, easing) {}

function createElement(tag) {}

function dndDice(type) {
  return Math.ceil(Math.random() * type);
}

// Algebraic data types
