import { NextResponse } from "next/server";
import catagories from "./catagories.json";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

const prompt = `
I am writing a puzzle where you are given the names of 4 people. 3 of which share a connection and the other is an outlier. 

also include a list of 4 clues that give progressivly more useful hints to the answer

the format is a json object in the form:
{
  connection: "description of connection",
  options: [
    { name: "name 1", description: "description 1", isOutlier: true or false },
    { name: "name 2", description: "description 2", isOutlier: true or false },
    { name: "name 3", description: "description 3", isOutlier: true or false },
    { name: "name 4", description: "description 4", isOutlier: true or false },
  ],
  clues: ["clue 1", "clue 2", "clue 3", "clue 4"]
}

give me one instance of the puzzle, the theme of this round is
`;

function extractJSONObject(str: any) {
  const jsonStart = str.indexOf('{');
  const jsonEnd = str.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1) {
    const jsonString = str.slice(jsonStart, jsonEnd + 1);
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON: ", error);
    }
  }
  return null;
}

export async function POST(request: Request) {
  const { } = await request.json();

  if (false) {
    return NextResponse.json({
      connection: "These inventors made significant contributions to the field of electricity and electromagnetism.",
      options: [
        { name: "Julius Caesar", description: "Expanded the Roman Republic through conquests and laid the foundation for the Roman Empire.", isOutlier: false },
        { name: "Genghis Khan", description: "Founded the Mongol Empire, the largest contiguous empire in history.", isOutlier: false },
        { name: "Alexander the Great", description: "Created one of the largest empires in history by the age of 30, spreading Greek culture across three continents.", isOutlier: false },
        { name: "Mahatma Gandhi", description: "Led India to independence through nonviolent civil disobedience, opposing imperial rule rather than building an empire.", isOutlier: true },
      ],
      clues: [
        "Clue 1: One of these directors is known for their strong female lead characters.",
        "Clue 2: One of these directors is known for their strong female lead characters.",
        "Clue 3: One of these directors is known for their strong female lead characters.",
        "Clue 4: One of these directors is known for their strong female lead characters."
      ]
    });
  } else {
    const catagory = catagories[Math.floor(Math.random() * catagories.length)];
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: prompt + catagory + " diffuclty out 100 = 90",
      }],
    });

    return NextResponse.json(extractJSONObject(completion.choices[0].message.content));
  }
}