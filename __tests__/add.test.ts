import { describe, it, expect } from "vitest";

function add(a: number, b: number): number {
  return a + b;
}

describe("add function", () => {
  it("should return the correct sum of two numbers", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("should handle negative numbers", () => {
    expect(add(-1, -2)).toBe(-3);
  });

  it("should handle a mix of positive and negative numbers", () => {
    expect(add(1, -2)).toBe(-1);
  });
});
