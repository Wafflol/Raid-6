import { Stack, Typography } from '@mui/material'
import styles from './DocumentCentre.module.css'
import ArticleIcon from '@mui/icons-material/Article';
import { useContext } from 'react';
import { AppContext } from '../context/appContexts';

export const DocumentCentre = (props) => {

  const {setAddSignButton, setDoc} = useContext(AppContext);

  const dummyArray = [];
  for (let i = 0; i < 16; i++) {
    dummyArray.push("Document " + (i + 1));
  }

  const handleNavigate = () => {
    setAddSignButton(true);
    setDoc("https://drive.google.com/file/d/1AXe6tiFhd1BjwcvkVDeqGWe4TUsYxsAT/preview")
    props.switchPage("/home/viewer");
  }

  return (
    <Stack spacing={4} className={styles.mainContainer}>
      <div className={styles.grid}>
        {dummyArray.map((doc, i) => {return (
          <Stack className={styles.gridItem}>
            <Typography>{doc}</Typography>
            <ArticleIcon style={{width: '70%', height: '100%'}} onClick={handleNavigate}/>
          </Stack>
        )})}
      </div>
    </Stack>
  )
}
