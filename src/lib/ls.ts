import { RepoProps } from "@/components/RepoTile";

export const saveFavourites = (repos: RepoProps[]) => {
  localStorage.setItem('favourites', JSON.stringify(repos));
};

export const getFavourites = (): RepoProps[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const favouritesJson = localStorage.getItem("favourites");
  
  if (!favouritesJson) {
    return [];
  }

  try {
    const favourites: RepoProps[] = JSON.parse(favouritesJson);
    return favourites;
  } catch (error) {
    return [];
  }
}