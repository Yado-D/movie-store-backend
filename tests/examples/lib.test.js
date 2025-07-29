const lib = require("./lib");
const db = require("./db");
const testDebugger = require("debug")("app:test");
const mail = require("./mail");

describe("Absolute - ", () => {
  it("should return a positive number if input is positive. ", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a negative number if input is negative. ", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return a 0 number if input is 0. ", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("Greet - ", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Yared");
    expect(result).toMatch(/Yared/);
  });
});

describe("Get currencies - ", () => {
  it("should return supported currencies ", () => {
    const result = lib.getCurrencies();

    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    expect(result).toContain("USD");

    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("Get Product - ", () => {
  const result = lib.getProduct(1);
  expect(result).toEqual({ id: 1, price: 10 });
});

describe("Register User -", () => {
  it("should throw if the user name have error or falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should reteurn user object if valid username is passed", () => {
    const result = lib.registerUser("Yared");
    expect(result).toMatchObject({ username: "Yared" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("Applay Discount -", () => {
  it("should apply 10% discount if customer has more than 10 point", () => {
    db.getCustomerSync = function (customerId) {
      testDebugger("Fake reading customer ...");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);

    expect(order.totalPrice).toBe(9);
  });
});

describe("Notify Customer - ", () => {
  it("should send an email to the customer", () => {

    db.getCustomerSync = jest.fn().mockReturnValue({ email: "yared@gmail.com" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
  });
});
