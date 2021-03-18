// v can either be a number or a string, such as "1px"
function setSize(v: number | string) {

    // Use type guards to narrow down to a more specific set
    // typeof, instanceof, ...
    if (typeof v === "number") {
        // TS infers that v: number
        return v + 1;
      }
      else {
        // TS infers that v: string
        return `${v} + 1`;
      }
}



interface Foo2 {
  type: "foo";
  foo: string;
}

interface Bar2 {
  type: "bar";
  bar: string;
}

function func(v: Foo2 | Bar2) {
  if (v.type === "foo") {
    // TS infers that v: Foo
    return v.foo;
  }
  else {
    // TS infers that v: Bar
    return v.bar;
  }
}