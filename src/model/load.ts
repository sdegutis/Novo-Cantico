import { BlogPost, loadBlogPosts } from "./blog/post";

export let blogPosts: BlogPost[];

/** This lets us load and connect models in a specific order. */
export function loadModels() {
  blogPosts = loadBlogPosts();
}
