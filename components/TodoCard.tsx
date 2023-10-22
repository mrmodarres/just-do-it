import { XCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'

type Props ={
    todo:Todo,
    index:number,
    id:TypedColumns,
    innerRef:(element:HTMLElement |null) => void,
    draggableProps: DraggableProvidedDraggableProps,
    draggHandleProps:DraggableProvidedDragHandleProps | null | undefined,
}

function TodoCard({todo,index,id,draggHandleProps,innerRef,draggableProps}:Props) {
 
  return (
    <div
        ref={innerRef}
        {...draggableProps}
        {...draggHandleProps}
        className='bg-white rounded-md space-y-2 drop-shadow-md '
    >
        <div className='flex justify-between items-center p-5' >
            <p>{todo.title}</p>
            <button className='text-red-500 hover:text-red-600' >
                <XCircleIcon
                className='ml-5 h-8 w-8 ' />
            </button>
        </div>
        {/* Add Image here */}
    </div>
  )
}

export default TodoCard