import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { language } = await request.json();

  const date = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));
  date.setHours(0,0,0,0);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const githubEndpoint = "https://api.github.com/search/repositories"
  const result = await fetch(`${githubEndpoint}?q=created:%3E${formattedDate}+language:${language}&sort=stars&order=desc`);

  if (result.status >= 400 && result.status < 600) {
    const error = await result.json();
    if (error.message.includes("limit exceeded")) {
      return NextResponse.json({ message: "API limit exceeded, please retry shortly" }, { status: result.status });
    }
    return NextResponse.json({ message: error.message }, { status: result.status });
  }

  const mappedRepos = (await result.json()).items.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    owner: repo.owner.login,
    url: repo.html_url,
    language: repo.language,
    stars: repo.stargazers_count
  }));

  return NextResponse.json(mappedRepos);
}