import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import LoadingAnimation from "../components/Loading";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, "articles", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setArticle(docSnap.data());
      } else {
        console.log("Tidak Ada Detail Artikel");
        alert("Tidak Ada Detail Artikel");
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <LoadingAnimation />;
  }

  const { thumbnail, author, title, content, createdAt } = article;

  return (
    <div className="article-detail">
      <img src={thumbnail} alt={title} className="article-detail__thumbnail" />
      <h1 className="article-detail__title">{title}</h1>
      <p className="article-detail__author">{author}</p>
      <p className="article-detail__createdAt">{createdAt}</p>
      <div className="article-detail__content">{content}</div>
    </div>
  );
}

export default ArticleDetail;
