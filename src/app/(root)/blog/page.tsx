"use client";

import { blogMain } from "../../../config/blogs/main";
import { postData } from "../../../config/blogs/post";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "../../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar";

export default function BlogPage() {
  const data = blogMain;

  return (
    <div className="min-h-screen h-full pt-10">
      <div className="flex justify-center flex-row">
        <div className="lg:w-[768px] w-fit p-6 space-y-6 dark:text-white">
          <section>
            <h1 className="text-6xl font-bold">{data.blog.title}</h1>
          </section>
          <h2 className="text-2xl font-semibold">{data.blog.desc}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {postData.post.map((post) => (
              <Link href={"/blog/" + post.content} key={post.id}>
                <Card className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image
                      src={post.preview}
                      alt={post.title}
                      width={10}
                      height={10}
                      draggable="false"
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="https://i.imgur.com/ikXg6UW.png" alt={post.poster} />
                          <AvatarFallback>{post.poster[0]}</AvatarFallback>
                        </Avatar>
                        <span>{post.poster}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 text-sm text-gray-500">
                    {post.postdate}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
