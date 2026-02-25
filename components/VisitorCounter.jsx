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
    async function track() {
      // 1. CLEAR SESSION CHECK FOR TESTING: 
      // If you want to see it increment every refresh while testing, 
      // comment out the 'if (!hasVisited)' logic below.
      const hasVisited = sessionStorage.getItem("done_deal");

      if (!hasVisited) {
        console.log("Automatically triggering increment...");
        const { data, error } = await supabase.rpc("increment_visitor_count");
        
        if (error) {
          console.error("RPC failed automatically:", error.message);
          fetchOnly();
        } else {
          console.log("Automatic increment success! New count:", data);
          setCount(data);
          sessionStorage.setItem("done_deal", "true");
        }
      } else {
        console.log("User already counted this session. Fetching current total.");
        fetchOnly();
      }
    }

    async function fetchOnly() {
      const { data } = await supabase.from("visitors").select("count").eq("id", 1).single();
      if (data) setCount(data.count);
    }

    track();
  }, []);

  if (count === null) return null;

  return (
    <div style={{ padding: "10px", color: "#aaa", fontSize: "14px" }}>
      👁️ {Number(count).toLocaleString()} views
    </div>
  );
}