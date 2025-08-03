import config from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // create account
  async createAccount({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        this.login({
          email,
          password,
        });
      } else {
        return userAccount;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Account creation failed:", error.message);
      }
      throw error;
    }
  }

  // login
  async login({ email, password }: { email: string; password: string }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service error :: getCurrentUser() ::", error);
    }
    return null;
  }

  //logout
  async logOut() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite service error :: getCurrentUser() ::", error);
    }
  }
}

const authService = new AuthService();
export default authService;
