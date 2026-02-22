// "use client";
// import { useState, useEffect } from "react";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// // ── Simple password gate ──
// const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

// export default function AdminPage() {
//   const [authed, setAuthed] = useState(false);
//   const [pw, setPw] = useState("");
//   const [pwError, setPwError] = useState("");
//   const [activeTab, setActiveTab] = useState("overview");

//   // Data states
//   const [visitors, setVisitors] = useState(0);
//   const [contacts, setContacts] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Blog form state
//   const [blogForm, setBlogForm] = useState({
//     title: "", slug: "", excerpt: "", content: "", tags: "", published: false,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [blogMsg, setBlogMsg] = useState("");

//   // Load data after login
//   useEffect(() => {
//     if (!authed) return;
//     fetchAll();
//   }, [authed]);

//   const fetchAll = async () => {
//     setLoading(true);
//     const [v, c, b] = await Promise.all([
//       supabase.from("visitors").select("count").eq("id", 1).single(),
//       supabase.from("contacts").select("*").order("created_at", { ascending: false }),
//       supabase.from("blogs").select("*").order("created_at", { ascending: false }),
//     ]);
//     if (v.data) setVisitors(v.data.count);
//     if (c.data) setContacts(c.data);
//     if (b.data) setBlogs(b.data);
//     setLoading(false);
//   };

//   // ── Auth ──
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (pw === ADMIN_PASSWORD) {
//       setAuthed(true);
//       setPwError("");
//     } else {
//       setPwError("❌ Incorrect password.");
//     }
//   };

//   // ── Blog CRUD ──
//   const handleBlogSubmit = async (e) => {
//     e.preventDefault();
//     setBlogMsg("");
//     const payload = {
//       title: blogForm.title,
//       slug: blogForm.slug,
//       excerpt: blogForm.excerpt,
//       content: blogForm.content,
//       tags: blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
//       published: blogForm.published,
//       updated_at: new Date().toISOString(),
//     };

//     let error;
//     if (editingId) {
//       ({ error } = await supabase.from("blogs").update(payload).eq("id", editingId));
//     } else {
//       ({ error } = await supabase.from("blogs").insert([payload]));
//     }

//     if (error) {
//       setBlogMsg("❌ " + error.message);
//     } else {
//       setBlogMsg("✅ Blog saved successfully!");
//       setBlogForm({ title: "", slug: "", excerpt: "", content: "", tags: "", published: false });
//       setEditingId(null);
//       fetchAll();
//     }
//   };

//   const handleEdit = (blog) => {
//     setBlogForm({
//       title: blog.title,
//       slug: blog.slug,
//       excerpt: blog.excerpt || "",
//       content: blog.content,
//       tags: (blog.tags || []).join(", "),
//       published: blog.published,
//     });
//     setEditingId(blog.id);
//     setActiveTab("new-blog");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this blog post?")) return;
//     await supabase.from("blogs").delete().eq("id", id);
//     fetchAll();
//   };

//   const togglePublish = async (blog) => {
//     await supabase.from("blogs").update({ published: !blog.published }).eq("id", blog.id);
//     fetchAll();
//   };

//   const deleteContact = async (id) => {
//     if (!confirm("Delete this message?")) return;
//     await supabase.from("contacts").delete().eq("id", id);
//     fetchAll();
//   };

//   const slugify = (text) =>
//     text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

//   // ── Styles ──
//   const s = {
//     page: { minHeight: "100vh", background: "#0d1117", fontFamily: "Poppins, sans-serif", color: "#e6edf3" },
//     header: { background: "#161b22", borderBottom: "1px solid #30363d", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" },
//     logo: { fontSize: "1.2rem", fontWeight: "700", color: "#ff6b00" },
//     tabs: { display: "flex", gap: "0.5rem", padding: "1.5rem 2rem 0", borderBottom: "1px solid #30363d" },
//     tab: (active) => ({ padding: "0.6rem 1.25rem", borderRadius: "0.5rem 0.5rem 0 0", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.88rem", background: active ? "#ff6b00" : "transparent", color: active ? "#fff" : "#8b949e", transition: "all 0.2s" }),
//     content: { padding: "2rem" },
//     card: { background: "#161b22", border: "1px solid #30363d", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "1rem" },
//     statCard: { background: "#161b22", border: "1px solid #30363d", borderRadius: "0.75rem", padding: "1.75rem", textAlign: "center" },
//     statNum: { fontSize: "2.5rem", fontWeight: "800", color: "#ff6b00", lineHeight: 1 },
//     statLabel: { fontSize: "0.82rem", color: "#8b949e", marginTop: "0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" },
//     input: { width: "100%", padding: "0.75rem 1rem", background: "#0d1117", border: "1px solid #30363d", borderRadius: "0.5rem", color: "#e6edf3", fontSize: "0.95rem", fontFamily: "Poppins, sans-serif", outline: "none", marginBottom: "1rem" },
//     textarea: { width: "100%", padding: "0.75rem 1rem", background: "#0d1117", border: "1px solid #30363d", borderRadius: "0.5rem", color: "#e6edf3", fontSize: "0.95rem", fontFamily: "Poppins, sans-serif", outline: "none", marginBottom: "1rem", minHeight: "200px", resize: "vertical" },
//     label: { display: "block", fontSize: "0.82rem", color: "#8b949e", marginBottom: "0.35rem", fontWeight: "600" },
//     btn: { padding: "0.7rem 1.5rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem", fontFamily: "Poppins, sans-serif" },
//     btnPrimary: { background: "#ff6b00", color: "#fff" },
//     btnDanger: { background: "#da3633", color: "#fff" },
//     btnSuccess: { background: "#238636", color: "#fff" },
//     btnGhost: { background: "#21262d", color: "#e6edf3" },
//     badge: (pub) => ({ display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: "700", background: pub ? "rgba(35,134,54,0.2)" : "rgba(218,70,51,0.2)", color: pub ? "#3fb950" : "#f85149" }),
//     table: { width: "100%", borderCollapse: "collapse" },
//     th: { textAlign: "left", padding: "0.75rem", fontSize: "0.78rem", color: "#8b949e", borderBottom: "1px solid #30363d", textTransform: "uppercase" },
//     td: { padding: "0.75rem", borderBottom: "1px solid #21262d", fontSize: "0.88rem", verticalAlign: "top" },
//   };

//   // ── Login screen ──
//   if (!authed) {
//     return (
//       <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ ...s.card, width: "100%", maxWidth: "400px", textAlign: "center" }}>
//           <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔐</div>
//           <h1 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "0.5rem" }}>Admin Login</h1>
//           <p style={{ color: "#8b949e", fontSize: "0.88rem", marginBottom: "1.5rem" }}>Piyush Osti Portfolio Dashboard</p>
//           <form onSubmit={handleLogin}>
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={pw}
//               onChange={(e) => setPw(e.target.value)}
//               style={s.input}
//               required
//             />
//             {pwError && <p style={{ color: "#f85149", marginBottom: "1rem", fontSize: "0.88rem" }}>{pwError}</p>}
//             <button type="submit" style={{ ...s.btn, ...s.btnPrimary, width: "100%" }}>
//               Login →
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={s.page}>
//       {/* Header */}
//       <div style={s.header}>
//         <span style={s.logo}>⚙️ Admin Dashboard</span>
//         <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//           <span style={{ fontSize: "0.82rem", color: "#8b949e" }}>
//             👁️ {Number(visitors).toLocaleString()} visitors
//           </span>
//           <button onClick={() => setAuthed(false)} style={{ ...s.btn, ...s.btnGhost, padding: "0.4rem 1rem", fontSize: "0.82rem" }}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div style={s.tabs}>
//         {[["overview", "📊 Overview"], ["contacts", "📬 Messages"], ["blogs", "📝 Blogs"], ["new-blog", editingId ? "✏️ Edit Blog" : "➕ New Blog"]].map(([id, label]) => (
//           <button key={id} style={s.tab(activeTab === id)} onClick={() => { setActiveTab(id); setBlogMsg(""); if (id !== "new-blog") { setEditingId(null); setBlogForm({ title: "", slug: "", excerpt: "", content: "", tags: "", published: false }); } }}>
//             {label}
//           </button>
//         ))}
//         <button onClick={fetchAll} style={{ ...s.btn, ...s.btnGhost, marginLeft: "auto", fontSize: "0.8rem", padding: "0.4rem 1rem" }}>
//           🔄 Refresh
//         </button>
//       </div>

//       <div style={s.content}>
//         {loading && <p style={{ color: "#8b949e", textAlign: "center" }}>Loading...</p>}

//         {/* ── OVERVIEW ── */}
//         {activeTab === "overview" && (
//           <>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
//               <div style={s.statCard}>
//                 <div style={s.statNum}>{Number(visitors).toLocaleString()}</div>
//                 <div style={s.statLabel}>Total Visitors</div>
//               </div>
//               <div style={s.statCard}>
//                 <div style={s.statNum}>{contacts.length}</div>
//                 <div style={s.statLabel}>Messages</div>
//               </div>
//               <div style={s.statCard}>
//                 <div style={{ ...s.statNum, color: "#3fb950" }}>{blogs.filter(b => b.published).length}</div>
//                 <div style={s.statLabel}>Published Blogs</div>
//               </div>
//             </div>

//             {/* Recent messages */}
//             <div style={s.card}>
//               <h3 style={{ fontWeight: "700", marginBottom: "1rem", color: "#ff6b00" }}>📬 Recent Messages</h3>
//               {contacts.slice(0, 5).map((c) => (
//                 <div key={c.id} style={{ padding: "0.75rem 0", borderBottom: "1px solid #21262d" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between" }}>
//                     <span style={{ fontWeight: "600" }}>{c.name}</span>
//                     <span style={{ fontSize: "0.78rem", color: "#8b949e" }}>
//                       {new Date(c.created_at).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <div style={{ fontSize: "0.82rem", color: "#8b949e" }}>{c.email}</div>
//                   <div style={{ fontSize: "0.88rem", marginTop: "0.25rem" }}>{c.message?.slice(0, 100)}...</div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* ── CONTACTS ── */}
//         {activeTab === "contacts" && (
//           <div style={s.card}>
//             <h3 style={{ fontWeight: "700", marginBottom: "1.5rem", color: "#ff6b00" }}>
//               📬 All Messages ({contacts.length})
//             </h3>
//             {contacts.length === 0 ? (
//               <p style={{ color: "#8b949e", textAlign: "center", padding: "2rem" }}>No messages yet.</p>
//             ) : (
//               <table style={s.table}>
//                 <thead>
//                   <tr>
//                     <th style={s.th}>Name</th>
//                     <th style={s.th}>Email</th>
//                     <th style={s.th}>Message</th>
//                     <th style={s.th}>Date</th>
//                     <th style={s.th}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {contacts.map((c) => (
//                     <tr key={c.id}>
//                       <td style={s.td}><strong>{c.name}</strong></td>
//                       <td style={s.td}><a href={`mailto:${c.email}`} style={{ color: "#58a6ff" }}>{c.email}</a></td>
//                       <td style={{ ...s.td, maxWidth: "300px" }}>{c.message}</td>
//                       <td style={{ ...s.td, whiteSpace: "nowrap", color: "#8b949e", fontSize: "0.78rem" }}>
//                         {new Date(c.created_at).toLocaleDateString()}
//                       </td>
//                       <td style={s.td}>
//                         <button onClick={() => deleteContact(c.id)} style={{ ...s.btn, ...s.btnDanger, padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}>
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}

//         {/* ── BLOGS LIST ── */}
//         {activeTab === "blogs" && (
//           <div style={s.card}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
//               <h3 style={{ fontWeight: "700", color: "#ff6b00" }}>📝 All Blogs ({blogs.length})</h3>
//               <button onClick={() => setActiveTab("new-blog")} style={{ ...s.btn, ...s.btnPrimary }}>
//                 ➕ New Post
//               </button>
//             </div>
//             {blogs.length === 0 ? (
//               <p style={{ color: "#8b949e", textAlign: "center", padding: "2rem" }}>No blog posts yet.</p>
//             ) : (
//               blogs.map((blog) => (
//                 <div key={blog.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid #21262d", gap: "1rem" }}>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
//                       <span style={{ fontWeight: "600" }}>{blog.title}</span>
//                       <span style={s.badge(blog.published)}>{blog.published ? "Published" : "Draft"}</span>
//                     </div>
//                     <div style={{ fontSize: "0.78rem", color: "#8b949e" }}>
//                       /{blog.slug} · {new Date(blog.created_at).toLocaleDateString()}
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
//                     <button onClick={() => togglePublish(blog)} style={{ ...s.btn, ...(blog.published ? s.btnGhost : s.btnSuccess), padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}>
//                       {blog.published ? "Unpublish" : "Publish"}
//                     </button>
//                     <button onClick={() => handleEdit(blog)} style={{ ...s.btn, ...s.btnGhost, padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}>
//                       Edit
//                     </button>
//                     <button onClick={() => handleDelete(blog.id)} style={{ ...s.btn, ...s.btnDanger, padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}>
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {/* ── NEW / EDIT BLOG ── */}
//         {activeTab === "new-blog" && (
//           <div style={s.card}>
//             <h3 style={{ fontWeight: "700", marginBottom: "1.5rem", color: "#ff6b00" }}>
//               {editingId ? "✏️ Edit Blog Post" : "➕ New Blog Post"}
//             </h3>
//             <form onSubmit={handleBlogSubmit}>
//               <label style={s.label}>Title *</label>
//               <input
//                 style={s.input}
//                 placeholder="e.g. How to set up VPC on AWS"
//                 value={blogForm.title}
//                 onChange={(e) => {
//                   const title = e.target.value;
//                   setBlogForm((f) => ({ ...f, title, slug: f.slug || slugify(title) }));
//                 }}
//                 required
//               />

//               <label style={s.label}>Slug * (URL-friendly)</label>
//               <input
//                 style={s.input}
//                 placeholder="e.g. how-to-set-up-vpc-on-aws"
//                 value={blogForm.slug}
//                 onChange={(e) => setBlogForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
//                 required
//               />

//               <label style={s.label}>Excerpt (short description)</label>
//               <input
//                 style={s.input}
//                 placeholder="Brief summary shown on blog listing..."
//                 value={blogForm.excerpt}
//                 onChange={(e) => setBlogForm((f) => ({ ...f, excerpt: e.target.value }))}
//               />

//               <label style={s.label}>Tags (comma separated)</label>
//               <input
//                 style={s.input}
//                 placeholder="e.g. AWS, VPC, Networking, DevOps"
//                 value={blogForm.tags}
//                 onChange={(e) => setBlogForm((f) => ({ ...f, tags: e.target.value }))}
//               />

//               <label style={s.label}>Content * (HTML supported)</label>
//               <textarea
//                 style={s.textarea}
//                 placeholder="Write your blog content here... HTML tags like <h2>, <p>, <ul>, <code> are supported."
//                 value={blogForm.content}
//                 onChange={(e) => setBlogForm((f) => ({ ...f, content: e.target.value }))}
//                 required
//               />

//               <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", marginBottom: "1.5rem", color: "#e6edf3" }}>
//                 <input
//                   type="checkbox"
//                   checked={blogForm.published}
//                   onChange={(e) => setBlogForm((f) => ({ ...f, published: e.target.checked }))}
//                   style={{ width: "1rem", height: "1rem", accentColor: "#ff6b00" }}
//                 />
//                 <span style={{ fontWeight: "600" }}>Publish immediately</span>
//               </label>

//               <div style={{ display: "flex", gap: "1rem" }}>
//                 <button type="submit" style={{ ...s.btn, ...s.btnPrimary }}>
//                   {editingId ? "💾 Save Changes" : "🚀 Publish Post"}
//                 </button>
//                 {editingId && (
//                   <button
//                     type="button"
//                     style={{ ...s.btn, ...s.btnGhost }}
//                     onClick={() => { setEditingId(null); setBlogForm({ title: "", slug: "", excerpt: "", content: "", tags: "", published: false }); setBlogMsg(""); }}
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>

//               {blogMsg && (
//                 <p style={{ marginTop: "1rem", fontWeight: "600", color: blogMsg.startsWith("✅") ? "#3fb950" : "#f85149" }}>
//                   {blogMsg}
//                 </p>
//               )}
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── Simple password gate ──
const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Data states
  const [visitors, setVisitors] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: "", slug: "", excerpt: "", content: "", tags: "", published: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [blogMsg, setBlogMsg] = useState("");

  // Load data after login
  useEffect(() => {
    if (!authed) return;
    fetchAll();
  }, [authed]);

  const fetchAll = async () => {
    setLoading(true);
    const [v, c, b] = await Promise.all([
      supabase.from("visitors").select("count").eq("id", 1).single(),
      supabase.from("contacts").select("*").order("created_at", { ascending: false }),
      supabase.from("blogs").select("*").order("created_at", { ascending: false }),
    ]);
    if (v.data) setVisitors(v.data.count);
    if (c.data) setContacts(c.data);
    if (b.data) setBlogs(b.data);
    setLoading(false);
  };

  // ── Auth ──
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError("");
    } else if (username !== ADMIN_USERNAME) {
      setPwError("❌ Incorrect username.");
    } else {
      setPwError("❌ Incorrect password.");
    }
  };

  // ── Blog CRUD ──
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setBlogMsg("");
    const payload = {
      title: blogForm.title,
      slug: blogForm.slug,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      tags: blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      published: blogForm.published,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("blogs").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("blogs").insert([payload]));
    }

    if (error) {
      setBlogMsg("❌ " + error.message);
    } else {
      setBlogMsg("✅ Blog saved successfully!");
      setBlogForm({ title: "", slug: "", excerpt: "", content: "", tags: "", published: false });
      setEditingId(null);
      fetchAll();
    }
  };

  const handleEdit = (blog) => {
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content,
      tags: (blog.tags || []).join(", "),
      published: blog.published,
    });
    setEditingId(blog.id);
    setActiveTab("new-blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog post?")) return;
    await supabase.from("blogs").delete().eq("id", id);
    fetchAll();
  };

  const togglePublish = async (blog) => {
    await supabase.from("blogs").update({ published: !blog.published }).eq("id", blog.id);
    fetchAll();
  };

  const deleteContact = async (id) => {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contacts").delete().eq("id", id);
    fetchAll();
  };

  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // ── Styles ──
  const s = {
    page: { minHeight: "100vh", background: "#0d1117", fontFamily: "Poppins, sans-serif", color: "#e6edf3" },
    header: { background: "#161b22", borderBottom: "1px solid #30363d", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" },
    logo: { fontSize: "1.2rem", fontWeight: "700", color: "#ff6b00" },
    tabs: { display: "flex", gap: "0.5rem", padding: "1.5rem 2rem 0", borderBottom: "1px solid #30363d" },
    tab: (active) => ({ padding: "0.6rem 1.25rem", borderRadius: "0.5rem 0.5rem 0 0", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.88rem", background: active ? "#ff6b00" : "transparent", color: active ? "#fff" : "#8b949e", transition: "all 0.2s" }),
    content: { padding: "2rem" },
    card: { background: "#161b22", border: "1px solid #30363d", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "1rem" },
    statCard: { background: "#161b22", border: "1px solid #30363d", borderRadius: "0.75rem", padding: "1.75rem", textAlign: "center" },
    statNum: { fontSize: "2.5rem", fontWeight: "800", color: "#ff6b00", lineHeight: 1 },
    statLabel: { fontSize: "0.82rem", color: "#8b949e", marginTop: "0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" },
    input: { width: "100%", padding: "0.75rem 1rem", background: "#0d1117", border: "1px solid #30363d", borderRadius: "0.5rem", color: "#e6edf3", fontSize: "0.95rem", fontFamily: "Poppins, sans-serif", outline: "none", marginBottom: "1rem" },
    textarea: { width: "100%", padding: "0.75rem 1rem", background: "#0d1117", border: "1px solid #30363d", borderRadius: "0.5rem", color: "#e6edf3", fontSize: "0.95rem", fontFamily: "Poppins, sans-serif", outline: "none", marginBottom: "1rem", minHeight: "200px", resize: "vertical" },
    label: { display: "block", fontSize: "0.82rem", color: "#8b949e", marginBottom: "0.35rem", fontWeight: "600" },
    btn: { padding: "0.7rem 1.5rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem", fontFamily: "Poppins, sans-serif" },
    btnPrimary: { background: "#ff6b00", color: "#fff" },
    btnDanger: { background: "#da3633", color: "#fff" },
    btnSuccess: { background: "#238636", color: "#fff" },
    btnGhost: { background: "#21262d", color: "#e6edf3" },
    badge: (pub) => ({ display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: "700", background: pub ? "rgba(35,134,54,0.2)" : "rgba(218,70,51,0.2)", color: pub ? "#3fb950" : "#f85149" }),
    table: { width: "100%", borderCollapse: "collapse" },
    th: { textAlign: "left", padding: "0.75rem", fontSize: "0.78rem", color: "#8b949e", borderBottom: "1px solid #30363d", textTransform: "uppercase" },
    td: { padding: "0.75rem", borderBottom: "1px solid #21262d", fontSize: "0.88rem", verticalAlign: "top" },
  };

  // ── Login screen ──
  if (!authed) {
    return (
      <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...s.card, width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔐</div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "0.5rem" }}>Admin Login</h1>
          <p style={{ color: "#8b949e", fontSize: "0.88rem", marginBottom: "1.5rem" }}>Piyush Osti Portfolio Dashboard</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={s.input}
              required
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              style={s.input}
              required
              autoComplete="current-password"
            />
            {pwError && <p style={{ color: "#f85149", marginBottom: "1rem", fontSize: "0.88rem" }}>{pwError}</p>}
            <button type="submit" style={{ ...s.btn, ...s.btnPrimary, width: "100%" }}>
              Login →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <span style={s.logo}>⚙️ Admin Dashboard</span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.82rem", color: "#8b949e" }}>
            👁️ {Number(visitors).toLocaleString()} visitors
          </span>
          <button onClick={() => setAuthed(false)} style={{ ...s.btn, ...s.btnGhost, padding: "0.4rem 1rem", fontSize: "0.82rem" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {[["overview", "📊 Overview"], ["contacts", "📬 Messages"], ["blogs", "📝 Blogs"], ["new-blog", editingId ? "✏️ Edit Blog" : "➕ New Blog"]].map(([id, label]) => (
          <button key={id} style={s.tab(activeTab === id)} onClick={() => { setActiveTab(id); setBlogMsg(""); if (id !== "new-blog") { setEditingId(null); setBlogForm({ title: "", slug: "", excerpt: "", content: "", tags: "", published: false }); } }}>
            {label}
          </button>
        ))}
        <button onClick={fetchAll} style={{ ...s.btn, ...s.btnGhost, marginLeft: "auto", fontSize: "0.8rem", padding: "0.4rem 1rem" }}>
          🔄 Refresh
        </button>
      </div>

      <div style={s.content}>
        {loading && <p style={{ color: "#8b949e", textAlign: "center" }}>Loading...</p>}

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
              <div style={s.statCard}>
                <div style={s.statNum}>{Number(visitors).toLocaleString()}</div>
                <div style={s.statLabel}>Total Visitors</div>
              </div>
              <div style={s.statCard}>
                <div style={s.statNum}>{contacts.length}</div>
                <div style={s.statLabel}>Messages</div>
              </div>
              <div style={s.statCard}>
                <div style={{ ...s.statNum, color: "#3fb950" }}>{blogs.filter(b => b.published).length}</div>
                <div style={s.statLabel}>Published Blogs</div>
              </div>
            </div>

            {/* Recent messages */}
            <div style={s.card}>
              <h3 style={{ fontWeight: "700", marginBottom: "1rem", color: "#ff6b00" }}>📬 Recent Messages</h3>
              {contacts.slice(0, 5).map((c) => (
                <div key={c.id} style={{ padding: "0.75rem 0", borderBottom: "1px solid #21262d" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: "600" }}>{c.name}</span>
                    <span style={{ fontSize: "0.78rem", color: "#8b949e" }}>
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#8b949e" }}>{c.email}</div>
                  <div style={{ fontSize: "0.88rem", marginTop: "0.25rem" }}>{c.message?.slice(0, 100)}...</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── CONTACTS ── */}
        {activeTab === "contacts" && (
          <div style={s.card}>
            <h3 style={{ fontWeight: "700", marginBottom: "1.5rem", color: "#ff6b00" }}>
              📬 All Messages ({contacts.length})
            </h3>
            {contacts.length === 0 ? (
              <p style={{ color: "#8b949e", textAlign: "center", padding: "2rem" }}>No messages yet.</p>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Name</th>
                    <th style={s.th}>Email</th>
                    <th style={s.th}>Message</th>
                    <th style={s.th}>Date</th>
                    <th style={s.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id}>
                      <td style={s.td}><strong>{c.name}</strong></td>
                      <td style={s.td}><a href={`mailto:${c.email}`} style={{ color: "#58a6ff" }}>{c.email}</a></td>
                      <td style={{ ...s.td, maxWidth: "300px" }}>{c.message}</td>
                      <td style={{ ...s.td, whiteSpace: "nowrap", color: "#8b949e", fontSize: "0.78rem" }}>
                        {new Date(c.created_at).toLocaleDateString()}
                      </td>
                      <td style={s.td}>
                        <button onClick={() => deleteContact(c.id)} style={{ ...s.btn, ...s.btnDanger, padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── BLOGS LIST ── */}
        {activeTab === "blogs" && (
          <div style={s.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontWeight: "700", color: "#ff6b00" }}>📝 All Blogs ({blogs.length})</h3>
              <button onClick={() => setActiveTab("new-blog")} style={{ ...s.btn, ...s.btnPrimary }}>
                ➕ New Post
              </button>
            </div>
            {blogs.length === 0 ? (
              <p style={{ color: "#8b949e", textAlign: "center", padding: "2rem" }}>No blog posts yet.</p>
            ) : (
              blogs.map((blog) => (
                <div key={blog.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid #21262d", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                      <span style={{ fontWeight: "600" }}>{blog.title}</span>
                      <span style={s.badge(blog.published)}>{blog.published ? "Published" : "Draft"}</span>
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#8b949e" }}>
                      /{blog.slug} · {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <button onClick={() => togglePublish(blog)} style={{ ...s.btn, ...(blog.published ? s.btnGhost : s.btnSuccess), padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}>
                      {blog.published ? "Unpublish" : "Publish"}
                    </button>
                    <button onClick={() => handleEdit(blog)} style={{ ...s.btn, ...s.btnGhost, padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(blog.id)} style={{ ...s.btn, ...s.btnDanger, padding: "0.3rem 0.75rem", fontSize: "0.78rem" }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── NEW / EDIT BLOG ── */}
        {activeTab === "new-blog" && (
          <div style={s.card}>
            <h3 style={{ fontWeight: "700", marginBottom: "1.5rem", color: "#ff6b00" }}>
              {editingId ? "✏️ Edit Blog Post" : "➕ New Blog Post"}
            </h3>
            <form onSubmit={handleBlogSubmit}>
              <label style={s.label}>Title *</label>
              <input
                style={s.input}
                placeholder="e.g. How to set up VPC on AWS"
                value={blogForm.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setBlogForm((f) => ({ ...f, title, slug: f.slug || slugify(title) }));
                }}
                required
              />

              <label style={s.label}>Slug * (URL-friendly)</label>
              <input
                style={s.input}
                placeholder="e.g. how-to-set-up-vpc-on-aws"
                value={blogForm.slug}
                onChange={(e) => setBlogForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                required
              />

              <label style={s.label}>Excerpt (short description)</label>
              <input
                style={s.input}
                placeholder="Brief summary shown on blog listing..."
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm((f) => ({ ...f, excerpt: e.target.value }))}
              />

              <label style={s.label}>Tags (comma separated)</label>
              <input
                style={s.input}
                placeholder="e.g. AWS, VPC, Networking, DevOps"
                value={blogForm.tags}
                onChange={(e) => setBlogForm((f) => ({ ...f, tags: e.target.value }))}
              />

              <label style={s.label}>Content * (HTML supported)</label>
              <textarea
                style={s.textarea}
                placeholder="Write your blog content here... HTML tags like <h2>, <p>, <ul>, <code> are supported."
                value={blogForm.content}
                onChange={(e) => setBlogForm((f) => ({ ...f, content: e.target.value }))}
                required
              />

              <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", marginBottom: "1.5rem", color: "#e6edf3" }}>
                <input
                  type="checkbox"
                  checked={blogForm.published}
                  onChange={(e) => setBlogForm((f) => ({ ...f, published: e.target.checked }))}
                  style={{ width: "1rem", height: "1rem", accentColor: "#ff6b00" }}
                />
                <span style={{ fontWeight: "600" }}>Publish immediately</span>
              </label>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="submit" style={{ ...s.btn, ...s.btnPrimary }}>
                  {editingId ? "💾 Save Changes" : "🚀 Publish Post"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    style={{ ...s.btn, ...s.btnGhost }}
                    onClick={() => { setEditingId(null); setBlogForm({ title: "", slug: "", excerpt: "", content: "", tags: "", published: false }); setBlogMsg(""); }}
                  >
                    Cancel
                  </button>
                )}
              </div>

              {blogMsg && (
                <p style={{ marginTop: "1rem", fontWeight: "600", color: blogMsg.startsWith("✅") ? "#3fb950" : "#f85149" }}>
                  {blogMsg}
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}