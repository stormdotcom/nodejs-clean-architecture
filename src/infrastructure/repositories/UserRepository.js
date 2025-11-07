import { eq } from "drizzle-orm";
import { users } from "../db/schema.js";

export class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async create(data) {
    const [user] = await this.db.insert(users).values(data).returning();
    return user;
  }

  async findAll() {
    return this.db.select().from(users);
  }

  async findById(id) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async findByEmail(email) {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async update(id, data) {
    const [user] = await this.db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
  }

  async delete(id) {
    await this.db.delete(users).where(eq(users.id, id));
    return { message: "Deleted successfully" };
  }
}
