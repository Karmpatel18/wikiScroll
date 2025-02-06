import { useState, useEffect, useRef, useCallback } from "react";
import { LiaShareSolid } from "react-icons/lia";
import Loader from "./Loader"; // Adjust the path as necessary


import axios from "axios";

const Card = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const fetchRandomArticle = async () => {
    try {
      const response = await axios.get("https://en.wikipedia.org/api/rest_v1/page/random/summary");
      return {
        title: response.data.title,
        extract: response.data.extract,
        content_urls: response.data.content_urls,
        thumbnail: response.data.thumbnail ? response.data.thumbnail.source : "https://via.placeholder.com/300"
      };
    } catch (error) {
      console.error("Error fetching random article:", error);
      return null;
    }
  };

  // const fetchTrendingArticles = async () => {
  //   try {
  //     const response = await axios.get("https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/1-day");
  //     if (!response.data.items || !response.data.items[0] || !response.data.items[0].articles) {
  //       return [];
  //     }
  //     return await Promise.all(response.data.items[0].articles.slice(0, 5).map(async article => {
  //       try {
  //         const summaryResponse = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${article.article}`);
  //         return {
  //           title: summaryResponse.data.title,
  //           extract: summaryResponse.data.extract,
  //           content_urls: summaryResponse.data.content_urls,
  //           thumbnail: summaryResponse.data.thumbnail ? summaryResponse.data.thumbnail.source : "https://via.placeholder.com/300"
  //         };
  //       } catch {
  //         return null;
  //       }
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching trending articles:", error);
  //     return [];
  //   }
  // };

  const loadArticles = async () => {
    setLoading(true);
    const randomArticle = await fetchRandomArticle();
    // const trendingArticles = (await fetchTrendingArticles()).filter(Boolean);
    setArticles(prev => [...prev,  randomArticle].filter(Boolean));
    setLoading(false);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const lastArticleRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadArticles();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  return (
    <div className=" flex max-w-3xl mx-auto ">

      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={index} ref={index === articles.length - 1 ? lastArticleRef : null} className="p-4 border-[1px] border-neutral-200 dark:border-neutral-200/10 dark:text-neutral-50 text-neutral-900 rounded-lg transition-all">
            {article.thumbnail && <img src={article.thumbnail} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
            <h2 className="text-lg font-semibold tracking-tight">{article.title}</h2>
            <p className="text-sm dark:text-neutral-500 tracking-tight">{article.extract}</p>
            <div className="mt-2 flex justify-between items-center">
              <a href={article.content_urls.desktop.page} target="_blank" rel="noopener noreferrer" className="text-green-500 duration-300 transition-all hover:underline">
                Read More
              </a>
              <button className="cursor-pointer flex gap-2 hover:bg-neutral-100 duration-500 dark:hover:bg-neutral-800 rounded-md px-3 py-2" onClick={() => navigator.share({ title: article.title, url: article.content_urls.desktop.page })}>
                <div> Share</div> <LiaShareSolid size={22} />
              </button>
            </div>
          </div>
        ))}
        {loading && <div className="flex w-full justify-center"><Loader/></div>  }
      </div>
    </div>
  );
};

export default Card;
