"use client"

import { FilmPreviewProps } from "@/data/types/film-preview";
import { useAppSelector } from "@/lib/storeHooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const FilmPreview: React.FC<FilmPreviewProps> = ({data}) => {
  return (
    <article>
      <div>{data.Title}</div>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert ml-5"
        src={data.Poster}
        alt={`${data.Title} poster`}
        width={50}
        height={50}
        priority
      />
    </article>
  );
};

export default FilmPreview;