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
    async function updateCounter() {
      const hasVisited = sessionStorage.getItem("page_visited");

      if (!hasVisited) {
        // Try to increment
        const { data, error } = await supabase.rpc("increment_visitor_count");
        
        if (error) {
          console.error("Increment Error:", error.message);
          // Fallback: just get the current number
          fetchCurrent();
        } else {
          setCount(data);
          sessionStorage.setItem("page_visited", "true");
        }
      } else {
        fetchCurrent();
      }
    }

    async function fetchCurrent() {
      const { data, error } = await supabase
        .from("visitors")
        .select("count")
        .eq("id", 1)
        .single();
      
      if (!error && data) setCount(data.count);
    }

    updateCounter();
  }, []);

  if (count === null) return null;

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 14px",
      borderRadius: "100px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#9ca3af",
      fontSize: "13px"
    }}>
      <span style={{ color: "#10b981", fontSize: "10px" }}>●</span>
      {Number(count).toLocaleString()} views
    </div>
  );
}

