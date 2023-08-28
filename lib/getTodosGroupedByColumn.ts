import { databases } from '@/appwrite'

export const getTodosGroupedByColumn = async() => {
    console.log("runing");
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    )
    
    console.log(data)
}

