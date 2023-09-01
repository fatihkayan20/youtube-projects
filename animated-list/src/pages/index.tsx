import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from "@/components/MovieCard";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        }
      )
      .then((res) => setMovies(res.data.results));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div
      className={`flex flex-row flex-wrap gap-10 justify-center items-start p-10`}
    >
      <Input
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <AnimatePresence>
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            imageUrl={`${process.env.NEXT_PUBLIC_IMAGE_URL_BASE}${movie.poster_path}`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
