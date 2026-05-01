import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden text-white font-sans">
      {/* Immersive Background Image */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/404-error.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          filter: "blur(4px)",
          zIndex: 0
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)",
          zIndex: 1
        }}
      />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/404-error.png" 
            alt="404 Error" 
            style={{ 
              width: "100%", 
              maxWidth: "500px", 
              borderRadius: "20px", 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              marginBottom: "2rem",
              border: "1px solid rgba(255,255,255,0.1)"
            }} 
          />
          
          <h1 className="font-display" style={{ fontSize: "clamp(3rem, 10vw, 6rem)", color: "#E63946", lineHeight: 0.9, marginBottom: "1rem" }}>
            404
          </h1>
          <p style={{ color: "#aaa", fontSize: "1.2rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: "2.5rem" }}>
            Looks like you're lost in the clouds
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a 
              href="/"
              style={{
                display: "inline-block",
                background: "#E63946",
                color: "#fff",
                padding: "16px 32px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontSize: "0.85rem",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 20px rgba(230, 57, 70, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(230, 57, 70, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(230, 57, 70, 0.3)";
              }}
            >
              Back to Home
            </a>

            <a 
              href="/#menu"
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                padding: "16px 32px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontSize: "0.85rem",
                transition: "all 0.3s ease",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
            >
              View Menu
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur Splotch */}
      <div 
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(circle, rgba(230,57,70,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 1
        }}
      />
    </div>
  );
}
