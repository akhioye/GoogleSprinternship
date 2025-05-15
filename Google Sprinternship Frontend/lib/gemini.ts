// lib/gemini.ts
const API_KEY = "AIzaSyCPTIfFjLPpRetd9p_UZZqIYEBsiC1FVto"
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

export async function askGemini(question: string) {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: question }],
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch from Gemini")
  }

  const data = await response.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer found"
}
