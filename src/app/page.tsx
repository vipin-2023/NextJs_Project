import Link from "next/link";
import { prisma } from "@/db";
import TodoItem from "@/components/todoItem";


async function getTodos() {
  return await prisma.todo.findMany()
}

async function toggleTodo(id:string,complete:boolean){
  'use server'
console.log(id,complete)
await prisma.todo.update({where:{id},data:{complete}})
}

export default async function Home() {

  const todos =await getTodos()
  
  // await prisma.todo.deleteMany({})
  return (
  <div>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-4xl">Todos</h1>
      <Link href="/new" className="border-slate-100 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline outline-2  outline-offset-2 ">New</Link>
    </header>

    <ul className='pl-4 text-white'>
     {todos.map(todo=>( 
      <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
     ))}
    </ul >


  </div>);
}