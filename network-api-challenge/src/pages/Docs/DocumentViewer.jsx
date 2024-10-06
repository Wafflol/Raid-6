import { Typography, Stack, TextField, Button } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './DocumentViewer.module.css';
import { Document, Page, pdfjs } from 'react-pdf';
import React, { useState, useMemo } from 'react';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js`;

export const Viewer = () => {
  const [numPages, setNumPages] = useState(null);

  // URL to your PDF (could be from local assets or external URL like S3)
  const pdfUrl = "https://rogershack24.s3.us-east-2.amazonaws.com/output.pdf";

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={600} />
        ))}
      </Document>
    </div>
  );
};
{/*
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const Viewer = ({ pdfUrl }) => {
    return (
        <div style={{ height: '600px' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}>
                <Viewer fileUrl={pdfUrl} />
            </Worker>
        </div>
    );
};

export default Viewer;
*/}