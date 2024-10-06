import { Route, Routes } from "react-router-dom";
import { Tab, Tabs } from '@mui/material';
import { Stack, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import styles from './Switch.module.css';
import { DocumentCentre } from "./DocumentCentre";
import { SendDocuments } from "./SendDocuments";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Switch = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("")

  useEffect(() => {
    const location = window.location.href.split('/');
    const endRef = location[location.length - 1];
    if (endRef === "home") {
      setTitle('Document Centre')
    } else {
      setTitle('Send Documents')
    }
  }, [])
  
  const switchPage = (href, newTitle) => {
    if (href === "/home") {
      setTitle("Document Centre");
    } else {
      setTitle("Send Documents");
    }
    navigate(href);
  }


  return (
    <Stack>
      <div className={styles.topText}>
        <Typography variant='h3'>{title}</Typography>
      </div>
      <Routes>
        <Route path='/' Component={DocumentCentre}/>
        <Route exact path='/send' Component={SendDocuments} />
      </Routes>
      <Tabs className={styles.navTab}>
        <Tab className={[styles.singleTab, styles.leftTab]} icon={<DocumentScannerIcon className={styles.tabIcon}/>} onClick={() => {switchPage('/home')}}/>
        <Tab className={styles.singleTab} icon={<SendIcon className={styles.tabIcon}/>} onClick={() => {switchPage('/home/send')}}/>
      </Tabs>
    </Stack>

  )
}
