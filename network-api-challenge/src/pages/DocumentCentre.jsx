import { Stack, Typography } from '@mui/material'
import styles from './DocumentCentre.module.css'
import ArticleIcon from '@mui/icons-material/Article';

export const DocumentCentre = (props) => {

  const dummyArray = Array(16).fill(0);

  return (
    <Stack spacing={4} className={styles.mainContainer}>
      <div className={styles.grid}>
        {dummyArray.map((i) => {return (
          <Stack className={styles.gridItem}>
            <Typography>Document 1</Typography>
            <ArticleIcon style={{width: '70%', height: '100%'}} onClick={(e) => {props.switchPage("/home/viewer")}}/>
          </Stack>
        )})}
      </div>
    </Stack>
  )
}
