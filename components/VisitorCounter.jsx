"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleTracking = async () => {
      // Check if user has already been counted in this session
      const hasVisited = sessionStorage.getItem("has_counted_visit");

      if (!hasVisited) {
        // 1. Increment and get new count
        const { data, error } = await supabase.rpc("increment_visitor_count");
        
        if (!error && data !== null) {
          setCount(data);
          sessionStorage.setItem("has_counted_visit", "true");
        } else {
          console.error("RPC Error:", error);
          fetchCurrentCount(); // Fallback if RPC fails
        }
      } else {
        // 2. Just fetch current count without incrementing
        fetchCurrentCount();
      }
    };

    const fetchCurrentCount = async () => {
      const { data, error } = await supabase
        .from("visitors")
        .select("count")
        .eq("id", 1)
        .single();
      
      if (!error && data) {
        setCount(data.count);
      }
    };

    handleTracking();
    // Fade in effect
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (count === null) return null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "50px",
        padding: "0.5rem 1.2rem",
        fontSize: "0.85rem",
        fontWeight: "500",
        color: "rgba(255, 255, 255, 0.8)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <span style={{ color: "#34d399" }}>●</span>
      <span>{Number(count).toLocaleString()} views</span>
    </div>
  );
}