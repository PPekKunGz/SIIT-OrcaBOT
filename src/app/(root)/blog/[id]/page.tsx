"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { postData } from "../../../../config/blogs/post";

const BlogSession: React.FC = () => {
    const params = useParams();
    const { id } = params;
    const currentIndex = postData.post.findIndex((post) => post.content.toString() === id);
    const data = postData.post[currentIndex];
    const prevPost = currentIndex > 0 ? postData.post[currentIndex - 1] : null;
    const nextPost = currentIndex < postData.post.length - 1 ? postData.post[currentIndex + 1] : null;

    if (!data) {
        return (
            <div className="grid place-content-center min-h-screen h-full w-screen">
                <h1 className="text-3xl font-bold">Post not found...</h1>
            </div>
        );
    }

    const isEmpty = (value: string | null | undefined) => !value || value.trim() === "";

    return (
        <div className="min-h-screen h-full pt-10">
            <div className="flex justify-center flex-row">
                <div className="lg:w-[768px] w-fit p-6 space-y-6 dark:text-white">
                    <section>
                        {!isEmpty(data.postdate) && (
                            <span className="text-zinc-500/50 text-xs">{data.postdate}</span>
                        )}
                        {!isEmpty(data.title) && (
                            <h1 className="text-6xl font-bold">{data.title}</h1>
                        )}
                    </section>

                    {!isEmpty(data.description[0]) && (
                        <h2 className="text-2xl font-semibold -translate-y-4">{data.description[0]}</h2>
                    )}

                    <section className="">
                        {data.image[0] && (
                            <Image
                                src={data.image[0]}
                                alt={data.title}
                                width={500}
                                height={300}
                                draggable="false"
                                className="w-full h-48 object-cover rounded-md"
                            />
                        )}
                    </section>

                    <section className="">
                        {!isEmpty(data.description[1]) && (
                            <p className="mt-4">{data.description[1]}</p>
                        )}

                        {data.image[0] && (
                            <Image
                                src={data.image[0]}
                                alt={data.title}
                                width={10}
                                height={10}
                                draggable="false"
                                className="w-full h-96 object-cover rounded-md"
                            />
                        )}
                    </section>
                    <div className="flex justify-between mt-10">
                        {prevPost && (
                            <Link href={`/blog/${prevPost.content}`}>
                                <div className="text-blue-500 hover:underline">
                                    ← Previous: {prevPost.title}
                                </div>
                            </Link>
                        )}
                        {nextPost && (
                            <Link href={`/blog/${nextPost.content}`}>
                                <div className="text-blue-500 hover:underline">
                                    Next: {nextPost.title} →
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogSession;
