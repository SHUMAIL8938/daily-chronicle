import { useState, useEffect } from "react";
import {
  cleanTitle,
  timeAgo,
  imgSrc,
  sourceName,
  FALLBACK_IMG,
} from "../utils/articleHelpers";
import styles from "./SportsSection.module.css";
const FOOTBALL_KEYWORDS = [
  "Premier League",
  "La Liga",
  "Champions League",
  "Europa League",
  "Bundesliga",
  "Serie A",
  "World Cup",
  "UEFA",
  "FIFA",
  "football",
  "soccer",
  "match",
  "goal",
  "club",
  "league",
  "transfer",
  "manager",
  "coach",
  "midfielder",
  "striker",
  "defender",
];
const TRUSTED_SOURCES = [
  "espn",
  "bbc",
  "sky",
  "goal",
  "cbs sports",
  "bleacher",
  "90min",
  "football london",
  "givemesport",
  "marca"
];
const BLOCKED =
  /NFL|American football|Super Bowl|touchdown|quarterback|NBA|cricket|tennis/i;
function SportsCard({ article, delay }) {
  return (
    <a
      className={styles.card}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={styles.imgWrap}>
        <img
          className={styles.img}
          src={imgSrc(article)}
          alt={cleanTitle(article.title)}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
        />
        <div className={styles.sportTag}>Football</div>
      </div>
      <div className={styles.body}>
        <div className={styles.kicker}>{sourceName(article)}</div>
        <div className={styles.title}>{cleanTitle(article.title)}</div>
        <div className={styles.desc}>{article.description || ""}</div>
        <div className={styles.meta}>{timeAgo(article.publishedAt)}</div>
      </div>
    </a>
  );
}

export default function SportsSection() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading");
  const tab = "football";
  const TABS = [
    {
      key: "football",
      label: "Football",
      query:
        'football OR soccer OR FIFA OR UEFA OR "Premier League" OR "Champions League" OR "World Cup" NOT NFL NOT "American football" NOT cricket NOT tennis NOT NBA',
    },
  ];

  useEffect(() => {
    async function fetchSports() {
      setStatus("loading");
      try {
        const current = TABS[0];
        const res = await fetch(
          `/api/news?q=${encodeURIComponent(current.query)}&sortBy=publishedAt&pageSize=6&language=en`,
        );
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const filtered = (data.articles || []).filter((a) => {
          if (!a.title || a.title === "[Removed]") return false;

          const text = (a.title || "").toLowerCase();
          const source = (a.source?.name || "").toLowerCase();
          const isTrusted = TRUSTED_SOURCES.some((s) =>
            source.includes(s.toLowerCase()),
          );

          const isFootball =
            /football|soccer|Premier League|Champions League|UEFA|transfer|club|manager/i.test(
              text,
            );

          const isBlocked =
            /NFL|American football|Super Bowl|NBA|cricket|tennis|election|government|conference|policy/i.test(
              text,
            );

          return isTrusted && isFootball && !isBlocked;
        });
        const fallback = (data.articles || []).filter((a) => {
          const text = (a.title || "").toLowerCase();

          return (
            /football|soccer|premier league|champions league|uefa|transfer/i.test(
              text,
            ) && !/nfl|american football|nba|cricket|tennis/i.test(text)
          );
        });
        const clean = [
          ...filtered,
          ...fallback.filter((a) => !filtered.includes(a)),
        ].slice(0, 6);
        setArticles(clean);
        setStatus("done");
      } catch {
        setStatus("error");
      }
    }
    fetchSports();
  }, []);

  if (status === "error") return null;

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.heading}>Sports Desk</h2>
        </div>
        <div className={styles.headerLine} />
      </div>

      {/* Grid */}
      {status === "loading" ? (
        <div className={styles.grid}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n}>
              <div className={`skel ${styles.skelImg}`} />
              <div className={`skel ${styles.skelLine}`} />
              <div
                className={`skel ${styles.skelLine}`}
                style={{ width: "65%" }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {articles.map((article, i) => (
            <SportsCard
              key={article.url + i}
              article={article}
              delay={i * 0.07}
            />
          ))}
        </div>
      )}
    </section>
  );
}
