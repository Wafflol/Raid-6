export const Viewer = ({ pdfUrl }) => {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}> {/* Overflow hidden on parent div */}
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        style={{ width: '100%', height: '100%', border: 'none' }} // Set border to none to avoid extra spacing
      />
    </div>
  );
};