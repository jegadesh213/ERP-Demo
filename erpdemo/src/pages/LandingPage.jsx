import Navbar from "../components/Navbar/Navbar";

export default function LandingPage({ onGetStarted }) {
  return (
    <div style={styles.page}>
      <Navbar onGetStarted={onGetStarted} />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at 20% 20%, #1a0533 0%, #0a0a0f 45%, #0a1628 100%)",
  },
};
