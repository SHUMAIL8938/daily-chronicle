import { useState } from "react";
import { useNews } from "./hooks/useNews";
import Masthead from "./components/Masthead";
import BreakingTicker from "./components/BreakingTicker";
import RefreshBar from "./components/RefreshBar";
import StatusBanner from "./components/StatusBanner";
import HeroArticle from "./components/HeroArticle";
import Sidebar from "./components/Sidebar";
import ArticleGrid from "./components/ArticleGrid";
import RegionalSection from "./components/RegionalSection";
import Skeleton from "./components/Skeleton";
import Footer from "./components/Footer";
import styles from "./App.module.css";

export default function App() {
  const [category, setCategory] = useState("general");
  const { articles, status, error, lastUpdated, refresh } = useNews(category);

  const hero = articles[0] ?? null;
  const sidebar = articles.slice(1, 6);
  const grid = articles.slice(6, 12);

  return (
    <div className={styles.pageWrap}>
      <Masthead activeCategory={category} onCategoryChange={setCategory} />

      <BreakingTicker articles={articles} />

      <StatusBanner status={status} error={error} />

      <RefreshBar
        status={status}
        lastUpdated={lastUpdated}
        onRefresh={refresh}
      />

      <main>
        {status === "loading" && !articles.length ? (
          <Skeleton />
        ) : (
          <>
            <div className={styles.frontGrid}>
              <HeroArticle article={hero} />
              <Sidebar articles={sidebar} />
            </div>
            <ArticleGrid articles={grid} />
            {category === "general" && <RegionalSection />}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
