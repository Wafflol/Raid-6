import { Route, Routes } from "react-router-dom";
import { Tab, Tabs } from '@mui/material';
import { Stack } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import styles from './Switch.module.css';

export const Switch = () => {
  return (
    <Stack>
      {/* <Routes> */}
        {/* <Route path='' Component={}/> */}
      {/* </Routes> */}
      <Tabs className={styles.navTab}>
        <Tab className={[styles.singleTab, styles.leftTab]} icon={<DocumentScannerIcon className={styles.tabIcon}/>}/>
        <Tab className={styles.singleTab} icon={<SendIcon className={styles.tabIcon}/>}></Tab>
      </Tabs>
    </Stack>

  )
}
