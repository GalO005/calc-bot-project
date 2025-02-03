import { describe, expect, test } from "vitest";
import calculateExpression from "../services/CalculatorService";

describe("calculateExpression", () => {
  test("Basic operations", () => {
    expect(calculateExpression("2 + 3")).toBe(5);
    expect(calculateExpression("5 - 2")).toBe(3);
    expect(calculateExpression("4 * 2")).toBe(8);
    expect(calculateExpression("10 / 2")).toBe(5);
  });

  test("Order of operations", () => {
    expect(calculateExpression("2 + 3 * 4")).toBe(14);
    expect(calculateExpression("(2 + 3) * 4")).toBe(20);
    expect(calculateExpression("100 / (5 + 5)")).toBe(10);
  });

  test("Invalid expressions", () => {
    expect(calculateExpression("2 + + 3")).toBe("Invalid expression");
    expect(calculateExpression("abc + 2")).toBe("Invalid expression");
    expect(calculateExpression("2 * 3 blabla")).toBe("Invalid expression");
  });
});
