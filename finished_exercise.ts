// Generics simple
function loggingIdentity<T>(arg: T): T {
  console.log(arg);
  return arg;
}

// Generics advanced + Overloading + index types
function get<T extends object, K1 extends keyof T>(obj: T, key1: K1): T[K1];
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1]>(
  obj: T,
  key1: K1,
  key2: K2
): T[K1][K2];
function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(obj: T, key1: K1, key2: K2, key3: K3): T[K1][K2][K3];
function get(obj: { [key: string]: any }, ...path: string[]) {
  return path.reduce(
    (prev, next) => (prev !== undefined ? prev[next] : undefined),
    obj
  );
}

// Utility types
function patch<T>(obj: T, patch: Partial<T>) {
  return {
    ...obj,
    ...patch
  };
}

function omit<T extends object, K extends (keyof T)[]>(
  obj: T,
  ...keys: K
): {
  [K2 in Exclude<keyof T, K[number]>]: T[K2];
} {
  const clone = { ...obj };
  keys.forEach(key => delete clone[key]);
  return clone;
}
function omit2<T extends object, K extends (keyof T)[]>(
  obj: T,
  ...keys: K
): Omit<T, K[number]> {
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

function isBird(animal: Bird | Cat): animal is Bird {
  return (animal as Bird).fly !== undefined;
}

if (isBird(pet)) {
  pet.fly();
} else {
  pet.walk();
}

// String/number literal types
async function animateMove(
  x: number,
  y: number,
  easing: "EaseOut" | "EaseIn" | "EaseInOut"
): Promise<void> {}

declare function createElement(tag: "img"): HTMLImageElement;
declare function createElement(tag: "iframe"): HTMLIFrameElement;
declare function createElement(tag: string): Element;

function dndDice(type) {
  return Math.ceil(Math.random() * type);
}

// Algebraic data types
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

// strictNullChecks
function area(s: Shape): number {
  // error: returns number | undefined
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
  }
}
