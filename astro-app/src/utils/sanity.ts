import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getLatestPosts(): Promise<Post[]> {
	return await sanityClient.fetch(
		groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){title,_createdAt,slug}[0...6]`,
	);
}

export async function getAllPosts(): Promise<Post[]> {
	return await sanityClient.fetch(
		groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){title,_createdAt,excerpt,slug}`,
	);
}

export async function getPost(slug: string): Promise<Post> {
	return await sanityClient.fetch(groq`*[_type == "post" && slug.current == $slug][0]`, {
		slug,
	});
}

export interface Post {
	_type: "post";
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset & { alt?: string };
	body: PortableTextBlock[];
}
