import { Route, Routes } from "react-router-dom";
import { Tab, Tabs } from '@mui/material';
import { Stack, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import styles from './Switch.module.css';
import { DocumentCentre } from "./DocumentCentre";
import { SendDocuments } from "./SendDocuments";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContexts";
import { Viewer } from "./Docs/DocumentViewer";

export const Switch = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
// test
    const location = window.location.href.split('/');
    const endRef = location[location.length - 1];
    if (endRef === "home") {
      setTitle('Document Centre')
    } else if (endRef === "send") {
      setTitle('Send Documents')
    } else {
      setTitle('Document')
    }
  }, [])
  
  const switchPage = (href) => {
    if (href === "/home") {
      setTitle("Document Centre");
    } else if (href === "/home/send") {
      setTitle("Send Documents");
    } else {
      setTitle("Document");
    }
    navigate(href);
  }


  return (
    <Stack>
      <div className={styles.topText}>
        <Typography variant='h3'>{title}</Typography>
      </div>
      <Routes>
        <Route path='/' element={<DocumentCentre switchPage={switchPage} />}/>
        <Route exact path='/send' Component={SendDocuments} />
        <Route path="/viewer" element={<Viewer pdfUrl={"https://www.mta.ca/~rrosebru/oldcourse/263114/Dsa.pdf"}/>} />
      </Routes>
      <Tabs className={styles.navTab}>
        <Tab className={[styles.singleTab, styles.leftTab]} icon={<DocumentScannerIcon className={styles.tabIcon}/>} onClick={() => {switchPage('/home')}}/>
        <Tab className={styles.singleTab} icon={<SendIcon className={styles.tabIcon}/>} onClick={() => {switchPage('/home/send')}}/>
      </Tabs>
    </Stack>

  )
}
