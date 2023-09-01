import Image from "next/image";
import * as React from "react";
import { motion } from "framer-motion";

interface MovieCardProps {
  title: string;
  imageUrl: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ title, imageUrl }) => {
  return (
    <motion.div
      className="flex flex-col gap-2 w-[150px]"
      layout
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={150}
        height={150}
        className="rounded-xl"
      />

      <h2 className="text-center">{title}</h2>
    </motion.div>
  );
};
