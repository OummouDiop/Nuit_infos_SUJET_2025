// Nird.jsx - Entry point for the NIRD page
function Nird() {
  try {
    return <NirdPage />;
  } catch (error) {
    console.error('Nird entry component error:', error);
    return null;
  }
}