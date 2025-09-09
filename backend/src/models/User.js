// Simple in-memory user storage (replace with database in production)
const users = [];
let nextId = 1;

export class User {
  constructor(username, email, password, role = 'user') {
    this.id = nextId++;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
  }

  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static create(userData) {
    const user = new User(userData.username, userData.email, userData.password, userData.role);
    users.push(user);
    return user;
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}