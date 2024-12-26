import React from 'react';
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';
import styles from '../app/(root)/_components/assets/css/image-responsive.module.css'
import Image from 'next/image';

interface ArticleCardProps {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  poster: string;
  link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, date, description, imageUrl, poster, link }) => {
  return (
    <div className="dark:bg-black/20 bg-zinc-400 border-b-4 text-white p-6 rounded-lg shadow-md">
      <Link href={`blog/${link}`}>
        <Image src={imageUrl} alt={title} draggable="false" priority width={10} height={10} className={styles.articlecard} />
      </Link>
      <div className="flex flex-row items-start justify-start">
        <Badge variant="secondary">{poster}</Badge>&nbsp;
      </div>
      <p>{description}</p>
      <p className="text-sm text-accent-foreground mb-2">• {date}</p>
    </div>
  );
};

export default ArticleCard;
