import { NextResponse } from "next/server";


export async function POST(request:Request) {
    // todos in the body of the POST request
    const {todos} = await request.json();
    console.log(todos)
    
    // ommunicate with openAI GPT
    
}