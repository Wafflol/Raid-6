import { Route, Routes } from "react-router-dom";
import { Tab, Tabs } from '@mui/material';
import { Stack, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import styles from './Switch.module.css';
import { DocumentCentre } from "./DocumentCentre";

export const Switch = () => {
  return (
    <Stack>
      <div className={styles.topText}>
        <Typography variant='h3'>Document Centre</Typography>
      </div>
      <Routes>
        <Route path='/' Component={DocumentCentre}/>
      </Routes>
      <Tabs className={styles.navTab}>
        <Tab className={[styles.singleTab, styles.leftTab]} icon={<DocumentScannerIcon className={styles.tabIcon}/>}/>
        <Tab className={styles.singleTab} icon={<SendIcon className={styles.tabIcon}/>}></Tab>
      </Tabs>
    </Stack>

  )
}
