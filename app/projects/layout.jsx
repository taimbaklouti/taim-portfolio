import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects | Taim Baklouti",
  description:
    "Explore projects by Taim Baklouti — from the AI-powered EduTounes learning platform to large-scale theater productions. Built with Next.js, Python, Gemini API, and more.",
};
export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
