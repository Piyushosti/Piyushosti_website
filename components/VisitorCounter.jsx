"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const trackVisit = async () => {
      // Increment counter by 1
      const { data, error } = await supabase.rpc("increment_visitor_count");
      if (!error && data) {
        setCount(data);
      } else {
        // Fallback: just read current count
        const { data: row } = await supabase
          .from("visitors")
          .select("count")
          .eq("id", 1)
          .single();
        if (row) setCount(row.count);
      }
    };
    trackVisit();
  }, []);

  if (count === null) return null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "var(--radius-full)",
        padding: "0.4rem 1rem",
        fontSize: "0.8rem",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      <span>👁️</span>
      <span>{Number(count).toLocaleString()} visitors</span>
    </div>
  );
}