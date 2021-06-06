import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';
import { useMemo } from 'react';

import { usersData } from './data';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '5px 0',
  },
  media: {
    height: 140,
  },
});

export default function TodoItem({ id, index, description, userId }) {
  const classes = useStyles();
  const user = useMemo(() => {
    return usersData.find(({ id }) => id === userId);
  }, [userId]);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {user?.name || ''}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
