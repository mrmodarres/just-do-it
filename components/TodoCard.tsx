import getUrl from '@/lib/getUrl'
import { useBoardStore } from '@/store/BoardStore'
import { XCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
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
    const deleteTask = useBoardStore((state) => state.deleteTask);
    const [imageUrl, setImageUrl] = useState<string | null >(null)

    useEffect(() => {
      if(todo.image){
        const fetchImage = async() => {
            const url = await getUrl(todo.image!);
            if(url) {
                setImageUrl(url.toString());
            }
        }
        fetchImage()
      }
    }, [todo])
    

  return (
    <div
        ref={innerRef}
        {...draggableProps}
        {...draggHandleProps}
        className='bg-white rounded-md space-y-2 drop-shadow-md '
    >
        <div className='flex justify-between items-center p-5' >
            <p>{todo.title}</p>
            <button onClick={() => deleteTask(index, todo, id)} className='text-red-500 hover:text-red-600' >
                <XCircleIcon
                className='ml-5 h-8 w-8 ' />
            </button>
        </div>
        {/* Add Image here */}
        {imageUrl && (
            <div className="relative h-full w-full rounded-b-md">
                <Image  
                    src={imageUrl}
                    alt='Task image'
                    width={400}
                    height={200}
                    className='w-full object-contain rounded-b-md'
                />
            </div>
        ) }
    </div>
  )
}

export default TodoCard