import { NextResponse } from "next/server";

const LANGUAGE_MAP = {
  my: "Burmese",
  zh: "Chinese",
  en: "English",
};

export async function POST(request) {

  try {
    const { text, sourceLang, targetLang } = await request.json();

    if (
      typeof text !== "string" ||
      !text.trim() ||
      !LANGUAGE_MAP[sourceLang] ||
      !LANGUAGE_MAP[targetLang]
    ) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 },
      );
    }

    if (sourceLang === targetLang) {
      return NextResponse.json(
        { error: "Source and target languages must differ." },
        { status: 400 },
      );
    }

    //const apiKey = process.env.SILICONFLOW_API_KEY;
    const apiKey = "sk-uvihinxfgzneonmruqqkspilpqtpsyoqojyblzfxonsbddfa"
    if (!apiKey) {
      return NextResponse.json(
        { error: "Translation service not configured." },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://api.siliconflow.cn/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Qwen/Qwen3-8B",
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content:
                "You are a precise translation engine for Chinese, Burmese, and English. Respond with the translation only, keeping the tone natural and respectful.",
            },
            {
              role: "user",
              content: `Translate the following text from ${LANGUAGE_MAP[sourceLang]} to ${LANGUAGE_MAP[targetLang]}. Reply with the translation only.\n\n${text.trim()}`,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SiliconFlow API error:", errorText);
      return NextResponse.json(
        { error: "Translation request failed." },
        { status: response.status },
      );
    }

    const data = await response.json();
    const translation = data?.choices?.[0]?.message?.content?.trim();

    if (!translation) {
      return NextResponse.json(
        { error: "No translation returned by the model." },
        { status: 502 },
      );
    }

    return NextResponse.json({ translation });
  } catch (error) {
    console.error("Translation route error:", error);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 },
    );
  }
}
