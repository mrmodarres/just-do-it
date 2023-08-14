import {DragDropContext,Droppable} from 'react-beautiful-dnd'
function Board() {
  return (
    <DragDropContext>
        <Droppable droppableId='board' direction='horizontal' type='column' >
            {
                provided =>(
                    <div>
                        {/* rendiering all columns */}
                        
                    </div>
                )
            }
        </Droppable>
    </DragDropContext>
  )
}

export default Board