import Footer from "@/components/Footer";

export const metadata = {
  title: "About | Taim Baklouti",
  description:
    "Learn about Taim Baklouti — a Tunisian high school senior ranked #1 in class, creator of EduTounes AI learning platform, national basketball player, and aspiring Computer Science student.",
};
export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
