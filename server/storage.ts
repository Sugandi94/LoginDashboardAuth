import { users, type User, type InsertUser } from "@shared/schema";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// File path for storing users
const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// Promisify fs functions
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, updateData: Partial<Omit<User, "id" | "password">>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  sessionStore: any; // session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: User[];
  currentId: number;
  sessionStore: any;

  constructor() {
    this.users = [];
    this.currentId = 1;
    this.loadUsers();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  private async loadUsers() {
    try {
      const data = await readFile(USERS_FILE, "utf8");
      this.users = JSON.parse(data);
      // Set the next ID based on the highest existing ID
      if (this.users.length > 0) {
        const maxId = Math.max(...this.users.map(user => user.id));
        this.currentId = maxId + 1;
      }
    } catch (error) {
      console.error("Error loading users:", error);
      this.users = [];
    }
  }

  private async saveUsers() {
    try {
      await writeFile(USERS_FILE, JSON.stringify(this.users, null, 2));
    } catch (error) {
      console.error("Error saving users:", error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const createdAt = new Date();
    
    const user: User = {
      ...insertUser,
      id,
      createdAt,
    };
    
    this.users.push(user);
    await this.saveUsers();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users];
  }
  
  async updateUser(id: number, updateData: Partial<Omit<User, "id" | "password">>): Promise<User | undefined> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return undefined;
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData
    };
    
    await this.saveUsers();
    return this.users[userIndex];
  }
  
  async deleteUser(id: number): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    
    if (initialLength !== this.users.length) {
      await this.saveUsers();
      return true;
    }
    
    return false;
  }
}

export const storage = new MemStorage();
