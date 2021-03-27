// deps
import React from 'react'
import { useHistory } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// model
import { IMenuDrawerItem } from '_/containers/Layout/types'
// helpers
import useStyles from './style'

interface IIndexProps {
  items: IMenuDrawerItem[]
}

const MenuDrawer: React.FC<IIndexProps> = ({ items }) => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <List className={classes.list}>
      {items.map((el) => (
        <ListItem button key={el.label} onClick={() => history.push(el.url)}>
          <ListItemIcon>{el.icon}</ListItemIcon>
          <ListItemText primary={el.label} />
        </ListItem>
      ))}
    </List>
  )
}

export default MenuDrawer
