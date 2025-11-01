"use client";

import { useEffect, useMemo, useState } from "react";

const LANGUAGE_ORDER = [
  {
    code: "my",
    htmlLang: "my",
    names: { en: "Burmese", zh: "缅甸语", my: "မြန်မာ" },
  },
  {
    code: "zh",
    htmlLang: "zh-Hans",
    names: { en: "Chinese", zh: "中文", my: "တရုတ်" },
  },
  {
    code: "en",
    htmlLang: "en",
    names: { en: "English", zh: "英语", my: "အင်္ဂလိပ်" },
  },
];

const UI_STRINGS = {
  my: {
    heroTitle: "မြောက်ဘာသာပြန်",
    heroSubtitle:
      "တရုတ်၊ မြန်မာ၊ အင်္ဂလိပ် ဘာသာစကားများကို တိတိကျကျ ဖတ်ရှုအို့မြောက်စေသော အင်တာနက်အခြေပြု မျှော်မှန်းချက်ထားသောဝန်ဆောင်မှု။",
    siteLanguage: "ဝဘ်ဆိုဒ် ဘာသာ",
    sourceLabel: "မူလစာသား",
    targetLabel: "ဘာသာပြန်လိုသည့် ဘာသာ",
    swapLabel: "သို့ပြောင်းမည်",
    inputPlaceholder:
      "ဘာသာပြန်လိုသည့် စာသားကို ရိုက်ထည့်ပါ၊ အမြန်အကောင်းဆုံးဖြေရှင်းချက်ရရှိမည်။",
    translateAction: "ဘာသာပြန်မည်",
    translating: "ဘာသာပြန်နေသည်…",
    outputTitle: "ဘာသာပြန်ပြီးသောရလဒ်",
    outputEmpty: "ဘာသာပြန်ရလဒ်ကို ဤနေရာတွင် ပြသပါမည်။",
    copy: "ကူးယူမည်",
    copied: "ကူးယူပြီး!",
    errorMissingText: "ဘာသာပြန်ရန် စာသားထည့်ပါ။",
    errorSameLanguage: "မူလနှင့် ထွက်လာမည့် ဘာသာစကားကြားကွာခြားမှုရွေးချယ်ပါ။",
    errorGeneric: "ဆာဗာနှင့် ချိန်ညှိရန် မအောင်မြင်ပါ။ နောက်တစ်ကြိမ် ထပ်စမ်းပါ။",
    historyTitle: "လတ်တလော ဘာသာပြန်မှုများ",
    historyEmpty: "အသစ် ဘာသာပြန်ခြင်းစတင်ပါ၊ မှတ်တမ်း ပြသပေးပါမည်။",
  },
  zh: {
    heroTitle: "缅妙翻译",
    heroSubtitle: "为缅甸朋友打造的中缅英三语互译助手，助力生意、旅行与日常沟通。",
    siteLanguage: "站点语言",
    sourceLabel: "原始语言",
    targetLabel: "目标语言",
    swapLabel: "互换语言",
    inputPlaceholder: "请输入需要翻译的内容，我们会快速给出最贴切的译文。",
    translateAction: "开始翻译",
    translating: "翻译中…",
    outputTitle: "翻译结果",
    outputEmpty: "翻译内容将显示在这里。",
    copy: "复制",
    copied: "已复制！",
    errorMissingText: "请输入需要翻译的文本。",
    errorSameLanguage: "请选择不同的原始语言和目标语言。",
    errorGeneric: "翻译失败，请稍后重试。",
    historyTitle: "最近的翻译",
    historyEmpty: "完成一次翻译后，这里会显示历史记录。",
  },
  en: {
    heroTitle: "Myao Translate",
    heroSubtitle:
      "Culturally tuned translations across Chinese, Burmese, and English for business, travel, and daily chats.",
    siteLanguage: "Site language",
    sourceLabel: "Translate from",
    targetLabel: "Translate into",
    swapLabel: "Swap",
    inputPlaceholder:
      "Type what you need translated and we will deliver a natural result.",
    translateAction: "Translate",
    translating: "Translating…",
    outputTitle: "Translation",
    outputEmpty: "Your translation will appear here.",
    copy: "Copy",
    copied: "Copied!",
    errorMissingText: "Please enter text to translate.",
    errorSameLanguage: "Pick two different languages.",
    errorGeneric: "Translation failed. Please try again.",
    historyTitle: "Recent translations",
    historyEmpty: "Run your first translation to see it listed here.",
  },
};

const accentByLanguage = {
  my: "from-amber-100 via-rose-50 to-orange-100",
  zh: "from-red-100 via-amber-50 to-yellow-100",
  en: "from-blue-100 via-slate-50 to-sky-100",
};

function getLanguageName(code, uiLang) {
  const lang = LANGUAGE_ORDER.find((item) => item.code === code);
  return lang ? lang.names[uiLang] : code;
}

export default function Home() {
  const [siteLang, setSiteLang] = useState("my");
  const [sourceLang, setSourceLang] = useState("zh");
  const [targetLang, setTargetLang] = useState("my");
  const [inputText, setInputText] = useState("");
  const [translation, setTranslation] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const strings = useMemo(() => UI_STRINGS[siteLang], [siteLang]);

  useEffect(() => {
    const selected = LANGUAGE_ORDER.find((item) => item.code === siteLang);
    if (selected && typeof document !== "undefined") {
      document.documentElement.lang = selected.htmlLang;
    }
  }, [siteLang]);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setTranslation("");
  };

  const handleTranslate = async (event) => {
    event.preventDefault();
    const trimmed = inputText.trim();

    if (!trimmed) {
      setErrorMessage(strings.errorMissingText);
      return;
    }

    if (sourceLang === targetLang) {
      setErrorMessage(strings.errorSameLanguage);
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    setTranslation("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: trimmed,
          sourceLang,
          targetLang,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.translation) {
        throw new Error(payload?.error || "Unexpected response");
      }

      setTranslation(payload.translation);
      setHistory((prev) => [
        {
          id: Date.now(),
          input: trimmed,
          output: payload.translation,
          sourceLang,
          targetLang,
        },
        ...prev.slice(0, 4),
      ]);
    } catch (error) {
      console.error("Translation error:", error);
      setErrorMessage(strings.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!translation) return;
    try {
      await navigator.clipboard.writeText(translation);
      setCopied(true);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${accentByLanguage[siteLang]} text-slate-900 transition-colors`}
    >
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 py-8 sm:px-8 lg:px-16">
        <header className="rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-white/50 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                {strings.heroTitle}
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                {strings.heroSubtitle}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {strings.siteLanguage}
              </span>
              <div className="flex gap-2">
                {LANGUAGE_ORDER.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => setSiteLang(language.code)}
                    className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                      siteLang === language.code
                        ? "border-orange-400 bg-orange-500 text-white shadow-md"
                        : "border-slate-200 bg-white/70 text-slate-600 hover:border-orange-300 hover:text-orange-600"
                    }`}
                  >
                    {language.names[siteLang]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-8 lg:grid-cols-[2fr_1fr]">
          <section className="flex flex-col gap-6 rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-white/60 backdrop-blur">
            <form className="flex flex-col gap-6" onSubmit={handleTranslate}>
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-1">
                  <label
                    htmlFor="source-language"
                    className="text-sm font-semibold text-slate-600"
                  >
                    {strings.sourceLabel}
                  </label>
                  <select
                    id="source-language"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    value={sourceLang}
                    onChange={(event) => {
                      setSourceLang(event.target.value);
                      setTranslation("");
                    }}
                  >
                    {LANGUAGE_ORDER.map((language) => (
                      <option key={language.code} value={language.code}>
                        {getLanguageName(language.code, siteLang)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleSwapLanguages}
                  className="flex items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  {strings.swapLabel}
                </button>

                <div className="flex-1">
                  <label
                    htmlFor="target-language"
                    className="text-sm font-semibold text-slate-600"
                  >
                    {strings.targetLabel}
                  </label>
                  <select
                    id="target-language"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    value={targetLang}
                    onChange={(event) => {
                      setTargetLang(event.target.value);
                      setTranslation("");
                    }}
                  >
                    {LANGUAGE_ORDER.map((language) => (
                      <option key={language.code} value={language.code}>
                        {getLanguageName(language.code, siteLang)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="text-to-translate"
                  className="text-sm font-semibold text-slate-600"
                >
                  {strings.sourceLabel}
                </label>
                <textarea
                  id="text-to-translate"
                  className="mt-2 h-32 w-full resize-none rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base text-slate-700 shadow-inner focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder={strings.inputPlaceholder}
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                />
              </div>

              {errorMessage && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-rose-400 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:from-orange-600 hover:to-rose-500 focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading}
              >
                {isLoading ? strings.translating : strings.translateAction}
              </button>
            </form>

            <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-orange-700">
                  {strings.outputTitle}
                </h2>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-sm font-medium text-orange-600 transition hover:text-orange-700 disabled:text-orange-300"
                  disabled={!translation}
                >
                  {copied ? strings.copied : strings.copy}
                </button>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-slate-800">
                {translation || strings.outputEmpty}
              </p>
            </div>
          </section>

          <aside className="flex flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-white/60 backdrop-blur">
            <h2 className="text-base font-semibold text-slate-700">
              {strings.historyTitle}
            </h2>

            {history.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-white/80 px-4 py-6 text-sm leading-relaxed text-slate-500">
                {strings.historyEmpty}
              </p>
            ) : (
              <ul className="flex flex-col gap-4">
                {history.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm shadow-inner"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-wide text-orange-500">
                      <span>{getLanguageName(item.sourceLang, siteLang)}</span>
                      <span>→</span>
                      <span>{getLanguageName(item.targetLang, siteLang)}</span>
                    </div>
                    <p className="mb-2 max-h-14 overflow-hidden text-[13px] text-slate-500">
                      {item.input}
                    </p>
                    <p className="rounded-lg bg-orange-50 px-3 py-2 text-slate-700">
                      {item.output}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </main>
      </div>
    </div>
  );
}
