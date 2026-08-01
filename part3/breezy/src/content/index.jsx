import { createContext, useContext, useEffect, useState } from 'react';
import site from './site.json';
import features from './features.json';
import steps from './steps.json';
import tiers from './tiers.json';
import testimonials from './testimonials.json';
import faqs from './faqs.json';

const WP_SITE = 'breezydemo.wordpress.com';
const WP_POSTS_URL = `https://public-api.wordpress.com/wp/v2/sites/${WP_SITE}/posts?per_page=20&_fields=title,content`;

const htmlToText = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent.trim();
};

const bundled = { site, features, steps, tiers, testimonials, faqs };

const ContentContext = createContext(bundled);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(bundled);

  useEffect(() => {
    let cancelled = false;
    fetch(WP_POSTS_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((posts) => {
        const wpFaqs = posts
          .map((p) => ({
            q: htmlToText(p.title.rendered),
            a: htmlToText(p.content.rendered),
          }))
          .filter((f) => f.q && f.a && f.q.toLowerCase() !== 'hello world!');
        if (!cancelled && wpFaqs.length > 0) {
          setContent((prev) => ({ ...prev, faqs: wpFaqs, faqSource: 'wordpress' }));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
