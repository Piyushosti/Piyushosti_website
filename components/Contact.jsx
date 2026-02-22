// "use client";
// import { useState } from 'react';
// import { createClient } from '@supabase/supabase-js';

// // Accessing environment variables from .env.local
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export default function Contact() {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     const formData = new FormData(e.target);
//     const name = formData.get('name');
//     const email = formData.get('email');
//     const msg = formData.get('message');

//     // Inserting data - Notice we DON'T send 'id' or 'created_at'
//     // The database handles those automatically!
//     const { error } = await supabase
//       .from('contacts')
//       .insert([{ name, email, message: msg }]);

//     setLoading(false);

//     if (error) {
//       console.error(error);
//       setMessage("❌ Error saving to database.");
//     } else {
//       setMessage("✅ Success! Your message is in the cloud database.");
//       e.target.reset();
//     }
//   };

//   return (
//     <section id="contact" className="contact">
//       <div className="container">
//         <h2 className="section-title">Get In Touch</h2>
//         <form onSubmit={handleSubmit} className="contact-form">
//           <input type="text" name="name" placeholder="Your Name" required className="form-input" />
//           <input type="email" name="email" placeholder="Your Email" required className="form-input" />
//           <textarea name="message" placeholder="How can I help you?" required className="form-textarea"></textarea>
          
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? "Sending..." : "Send Message"}
//           </button>
          
//           {message && <p className="status-msg">{message}</p>}
//         </form>
//       </div>
//     </section>
//   );
// }


"use client";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const msg = formData.get('message');

    const { error } = await supabase
      .from('contacts')
      .insert([{ name, email, message: msg }]);

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage("❌ Error saving to database.");
    } else {
      setMessage("✅ Success! Your message is in the cloud database.");
      e.target.reset();
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">

        <h2 className="section-heading">Get In Touch</h2>
        <p className="section-subheading">
          Ready to discuss cloud solutions? Let's connect!
        </p>

        {/* Info Pills */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {[
            { icon: "📍", text: "Kathmandu, Nepal" },
            { icon: "💼", text: "Open to Opportunities" },
            { icon: "⚡", text: "Quick Response" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-full)", padding: "0.5rem 1.25rem", fontSize: "0.88rem", fontWeight: "500", color: "var(--color-text-muted)", boxShadow: "var(--shadow-sm)" }}>
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="form-field"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="form-field"
            />

            <textarea
              name="message"
              placeholder="How can I help you?"
              required
              className="form-field form-textarea"
              rows={5}
            />

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
              style={{ opacity: loading ? 0.75 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {message && (
              <p className={`status-msg ${message.startsWith("✅") ? "success" : "error"}`}>
                {message}
              </p>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}