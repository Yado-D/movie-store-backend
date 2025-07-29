class User {
  constructor(fullName, email, phone, password) {
    (this.fullName = fullName),
      (this.email = email),
      (this.phone = phone),
      (this.password = password);
  }

  toJson() {
    return {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phone: this.phone,
    };
  }

  static fromJson(json) {
    return new User(
      json["fullName"],
      json["email"],
      json["phone"],
      json["password"]
    );
  }
}

module.exports = User;
