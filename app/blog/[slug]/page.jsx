"use client";
import { use, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BlogPost({ params }) {
  const { slug } = use(params); // ← unwrap Promise with React.use()
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setBlog(data);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <main style={{ paddingTop: "64px", minHeight: "100vh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Loading post...</p>
      </main>
    );
  }

  if (notFound) {
    return (
      <main style={{ paddingTop: "64px", minHeight: "100vh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>😕</p>
          <h1 style={{ fontWeight: "800", marginBottom: "0.5rem" }}>Post not found</h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
            This post may have been removed or the link is incorrect.
          </p>
          <Link href="/blog" style={{ color: "var(--color-primary)", fontWeight: "600" }}>
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: "64px", minHeight: "100vh", background: "var(--color-bg)" }}>
      <div className="container" style={{ paddingBlock: "4rem", maxWidth: "800px" }}>

        {/* Back link */}
        <Link
          href="/blog"
          style={{ color: "var(--color-primary)", fontWeight: "600", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2rem" }}
        >
          ← Back to Blog
        </Link>

        <article className="card" style={{ padding: "3rem" }}>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="tag-list" style={{ justifyContent: "flex-start", marginBottom: "1rem" }}>
              {blog.tags.map((tag) => (
                <span key={tag} className="tag" style={{ fontSize: "0.72rem" }}>{tag}</span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: "800", color: "var(--color-text)", lineHeight: "1.2", marginBottom: "1rem" }}>
            {blog.title}
          </h1>

          {/* Date */}
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--color-border)" }}>
            Published on {new Date(blog.created_at).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </p>

          {/* Content */}
          <div
            style={{ lineHeight: "1.9", color: "var(--color-text)", fontSize: "1.02rem" }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

        </article>
      </div>
    </main>
  );
}