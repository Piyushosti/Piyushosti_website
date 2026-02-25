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
      // 1. Check if we already counted this user in this session
      const hasVisited = sessionStorage.getItem("has_counted_visit");

      if (!hasVisited) {
        console.log("VisitorCounter: New session detected. Incrementing...");
        
        // 2. Call the SQL Function
        const { data, error } = await supabase.rpc("increment_visitor_count");

        if (error) {
          console.error("VisitorCounter Error (RPC):", error.message);
          // If RPC fails, try to just fetch the current number
          fetchCurrentOnly();
        } else {
          console.log("VisitorCounter: Success! New count is:", data);
          setCount(data);
          sessionStorage.setItem("has_counted_visit", "true");
        }
      } else {
        console.log("VisitorCounter: Session exists. Fetching current count only.");
        fetchCurrentOnly();
      }
    };

    const fetchCurrentOnly = async () => {
      const { data, error } = await supabase
        .from("visitors")
        .select("count")
        .eq("id", 1)
        .single();
      
      if (error) {
        console.error("VisitorCounter Error (Fetch):", error.message);
      } else if (data) {
        setCount(data.count);
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
        gap: "0.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        padding: "0.4rem 1rem",
        fontSize: "0.8rem",
        color: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <span style={{ color: "#10b981" }}>●</span>
      <span>{Number(count).toLocaleString()} views</span>
    </div>
  );
}