"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, excerpt, tags, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Blog fetch error:", error);
        setError(error.message);
      } else {
        setBlogs(data || []);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <main style={{ paddingTop: "64px", minHeight: "100vh", background: "var(--color-bg)" }}>
      <div className="container" style={{ paddingBlock: "4rem" }}>

        {/* Header */}
        <h1 className="section-heading">Blog</h1>
        <p className="section-subheading">
          Thoughts on Cloud, DevOps, and AWS architecture
        </p>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--color-text-muted)" }}>
            Loading posts...
          </div>
        )}

        {/* Error — shows exact error so you can debug */}
        {error && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p style={{ color: "#ef4444", fontWeight: "600" }}>Failed to load blogs</p>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
              {error}
            </p>
            <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
              👉 Check your Supabase RLS policy allows anon SELECT where published = true
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && blogs.length === 0 && (
          <div className="card" style={{ textAlign: "center", maxWidth: "500px", margin: "3rem auto", padding: "3rem" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>✍️</span>
            <h3 style={{ fontWeight: "700", marginBottom: "0.5rem" }}>No posts yet</h3>
            <p style={{ color: "var(--color-text-muted)" }}>
              Check back soon — blog posts coming shortly!
            </p>
          </div>
        )}

        {/* Blog grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid-3" style={{ marginTop: "2rem" }}>
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ height: "100%", cursor: "pointer", textAlign: "left" }}>

                  {/* Date */}
                  <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>

                  {/* Title */}
                  <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--color-text)", marginBottom: "0.75rem", lineHeight: "1.4" }}>
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  {blog.excerpt && (
                    <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: "1.65", marginBottom: "1rem" }}>
                      {blog.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {blog.tags?.length > 0 && (
                    <div className="tag-list" style={{ justifyContent: "flex-start" }}>
                      {blog.tags.map((tag) => (
                        <span key={tag} className="tag" style={{ fontSize: "0.72rem" }}>{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Read more */}
                  <p style={{ marginTop: "1.25rem", color: "var(--color-primary)", fontWeight: "600", fontSize: "0.9rem" }}>
                    Read more →
                  </p>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}