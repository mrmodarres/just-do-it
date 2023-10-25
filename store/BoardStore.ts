import { ID, databases, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import uploadImage from '@/lib/uploadImage';
import { create } from 'zustand'

interface BoardState {
    board:Board;
    getBoard:()=>void;
    setBoardState: (board:Board) => void;
    updateTodoInDB:(todo:Todo, columnId: TypedColumns) => void;
    newTaskInput: string;
    newTaskTyped: TypedColumns;
    image: File | null;
    setNewTaskInput: ( input : string ) => void;

    searchString:string;
    setSearchString:(searchString:string) => void;

    addTask: (todo: string, columnId: TypedColumns, image: File | null) => void;
    setNewTaskTyped: (columnId: TypedColumns) => void;
    deleteTask:(taskIndex:number, todo :Todo,id:TypedColumns) => void;
    setImage : (image: File | null) => void;

}

export const useBoardStore = create<BoardState>((set,get) => ({
  board: {
    columns:new Map<TypedColumns,Column>(),
  },
  newTaskInput:'',
  newTaskTyped:'todo',
  image: null,
  setNewTaskInput:(input) => set(({newTaskInput:input})),
  setNewTaskTyped : (columnId) => set(({newTaskTyped: columnId})),
  setImage: (image) => set(({image})),
  searchString:'',
  setSearchString:(searchString) => set({searchString}),
  getBoard:async() =>{
    const board = await getTodosGroupedByColumn();
    set({board})
  },
    deleteTask: async(taskIndex, todo, id) => {
    const newColumn = new Map(get().board.columns);
    
    // delete todoId from newColumn
    newColumn.get(id)?.todos.splice(taskIndex,1);
    set({board:{columns: newColumn} });

    if(todo.image){
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    )
  },
  setBoardState: (board) => set({board}),
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title:todo.title,
        status: columnId
      }
    )
  },
  addTask : async(todo, columnId, image) => {
    let file : Image | undefined;
    if (image) {
      const fileUploaded = await uploadImage(image);
      if(fileUploaded){
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        }
      }
    }
    const {$id} = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        // include image if it's exist
        ...(file&&{image:JSON.stringify(file)})
      }
    );
    set({newTaskInput:""});

    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo:Todo = {
        $id,
        $createdAt: new Date().toString(),
        title: todo,
        status: columnId,
        // include image if it exists
        ...(file && {image: file}),
      };

      const column = newColumns.get(columnId);
      if(!column){
        newColumns.set(columnId,{
          id:columnId,
          todos:[newTodo]
        });
      }else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns,
        }
      }

    })

  }


}))
