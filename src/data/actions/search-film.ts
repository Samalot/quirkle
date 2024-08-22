"use server";

export async function searchFilmAction(prevState: any, formData: FormData) {
  const film = formData.get("film_name") as string;
  const omdbapiEndpoint = `http://www.omdbapi.com/?t=${encodeURI(film)}&apikey=${process.env.OMDB_API_KEY}`;
  const omdbResponse = await fetch(omdbapiEndpoint);
  const obmdbResult = await omdbResponse.json();

  return { 
    ...prevState,
    data : obmdbResult
  }
}