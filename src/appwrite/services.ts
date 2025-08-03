import config from "../config/config";

import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //create post
  async creatPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId: string;
  }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Error :: createPost() failed :: ", error);
    }
  }

  //update post
  async updatePost(
    slug: string,
    {
      title,
      content,
      featuredImage,
      status,
    }: {
      title: string;
      content: string;
      featuredImage: string;
      status: string;
    }
  ) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("Error :: updatePost() failed :: ", error);
    }
  }

  //delete post
  async deletePost(slug: string) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Error :: deletePost() failed :: ", error);
    }
    return false;
  }

  //get post
  async getPost(slug: string) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error :: getPost() failed :: ", error);
    }
  }

  //list posts
  async getActivePosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Error :: getActivePosts() failed :: ", error);
    }
  }

  //file services

  //file upload
  async uploadFile(file: File) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error :: uploadFile() failed :: ", error);
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Error :: deleteFile() failed :: ", error);
    }
    return false;
  }

  async getFilePreview(fileId: string) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Error :: getFilePreview() failed :: ", error);
    }
  }
}

const service = new Service();

export default service;
