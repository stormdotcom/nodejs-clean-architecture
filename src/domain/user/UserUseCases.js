export class UserUseCases {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async createUser({ name, email }) {
    if (!name || !email) throw new Error("Name and email are required");
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error("Email already exists");
    return this.userRepo.create({ name, email });
  }

  async getAllUsers() {
    return this.userRepo.findAll();
  }

  async getUserById(id) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateUser(id, data) {
    return this.userRepo.update(id, data);
  }

  async deleteUser(id) {
    return this.userRepo.delete(id);
  }
}
