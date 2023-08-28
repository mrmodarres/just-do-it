'use client'
import { useBoardStore } from '@/store/BoardStore'
import { useEffect } from 'react'
import {DragDropContext,Droppable} from 'react-beautiful-dnd'
function Board() {
    const getBoard = useBoardStore((state) => state.getBoard);
    useEffect(() => {
        getBoard()
        console.log("Board useEffect");
    }, [getBoard])
    

  return (
    <h1>Hello</h1>
    // <DragDropContext>
    //     <Droppable droppableId='board' direction='horizontal' type='column' >
    //         {
    //             provided =>(
    //                 <div>
    //                     {/* rendiering all columns */}
                        
    //                 </div>
    //             )
    //         }
    //     </Droppable>
    // </DragDropContext>
  )
}

export default Board