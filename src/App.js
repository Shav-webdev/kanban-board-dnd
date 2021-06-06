import { makeStyles, Paper, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { data } from './data';
import TodoItem from './TodoItem';
import { dndDataToMain, dragEnd, mainDataToDnD } from './utils';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 'calc(100vh - 16px)',
    width: '30vw',
    padding: '0 8px',
  },
  control: {
    padding: theme.spacing(2),
  },
  columnHeader: {
    textAlign: 'center',
  },
}));

function App() {
  const [dndData, setDndData] = useState({});
  const classes = useStyles();
  useEffect(() => {
    let d;
    if (localStorage.data) {
      d = JSON.parse(localStorage.data);
    } else {
      d = data;
    }
    setDndData(mainDataToDnD(d));
  }, []);

  const onDragEnd = (e) => {
    const { source, destination } = e;
    const result = dragEnd(dndData, source, destination);
    localStorage.data = JSON.stringify(dndDataToMain(result));
    setDndData(result);
  };
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(dndData).map((value) => (
              <Grid key={value} item>
                <Paper className={classes.paper}>
                  <Typography
                    className={classes.columnHeader}
                    color="primary"
                    variant="h4"
                    component="h4">
                    {value.toUpperCase()}
                  </Typography>
                  <Droppable droppableId={value}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={{
                          height: 'calc(100% - 50px)',
                          border: snapshot.isDraggingOver ? '1px solid blue' : 'none',
                        }}
                        {...provided.droppableProps}>
                        {dndData[value].map((el, index) => {
                          if (el.status === value) {
                            return (
                              <TodoItem
                                key={el.description}
                                description={el.description}
                                id={el.description}
                                index={index}
                                userId={el.user}
                              />
                            );
                          }
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            ))}
          </DragDropContext>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
