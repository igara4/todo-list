import React, { useState } from 'react';
import './styles.css';

function Todo() {
  const [todoText,setTodoText]=useState('')
  const [incompleteTodos,setIncompleteTodos]=useState<any>([])
  const [completeTodos,setCompleteTodos]=useState<any>([])
  const [deletedTodos,setDeletedTodos]=useState<any>([])
  const [statuses,setStatuses]= useState<any>(['全て','現在のタスク','完了したタスク','ゴミ箱'])

  const onChangeTodoText=(e:any)=>{
    setTodoText(e.target.value)
  }

  const onClickAdd=()=>{
    if (todoText === '') return;
    const newTodos:any=[...incompleteTodos,todoText]
    setIncompleteTodos(newTodos)
    setTodoText('')
  }

  const onClickComplete=(index:number)=>{
    const newIncompleteTodos=[...incompleteTodos]
    newIncompleteTodos.splice(index,1)
    const newCompleteTodos=[...completeTodos,incompleteTodos[index]]
    setIncompleteTodos(newIncompleteTodos)
    setCompleteTodos(newCompleteTodos)
  }

  const onClickDelete=(index:number)=>{
    const newIncompleteTodos=[...incompleteTodos]
    newIncompleteTodos.splice(index,1)
    const newDeletedTodos=[...deletedTodos,incompleteTodos[index]]
    setIncompleteTodos(newIncompleteTodos)
    setDeletedTodos(newDeletedTodos)
  }

  const onClickBack=(index:number)=>{
    const newCompleteTodos=[...completeTodos]
    newCompleteTodos.splice(index,1)
    const newIncompleteTodos=[...incompleteTodos,completeTodos[index]]
    setIncompleteTodos(newIncompleteTodos)
    setCompleteTodos(newCompleteTodos)
  }

  const onClickReturn=(index:number)=>{
    const newDeletedTodos=[...deletedTodos]
    newDeletedTodos.splice(index,1)
    const newIncompleteTodos=[...incompleteTodos,deletedTodos[index]]
    setIncompleteTodos(newIncompleteTodos)
    setDeletedTodos(newDeletedTodos)
  }

  
  return (
    <>
    <div>
    <p>TODOリスト</p>
    </div>
    <div className='InputArea'>
      <input placeholder='TODOを入力' value={todoText} onChange={onChangeTodoText}/>
      <button onClick={onClickAdd}>追加</button>
    </div>
    <select>
      {statuses.map((status:any)=>{
        return <option key='status'>{status}</option>})}
    </select>
    <div className='IncompleteArea'>
      <p className='title'>未完了のTODO</p>
      <ul>
        {incompleteTodos.map((todo:any,index:number)=>(
          <li key={todo}>
            <div className='listRow'>
              <p className='todoItem'>{todo}</p>
              <button onClick={()=>onClickComplete(index)}>完了</button>
              <button onClick={()=>onClickDelete(index)}>削除</button>
            </div>
            </li>
        ))}
      </ul>
    </div>
    <div className='CompleteArea'>
      <p className='title'>完了のTODO</p>
      <ul>
        {completeTodos.map((todo:any,index:number)=>(
          <li key={todo}>
            <div className='listRow'>
              <p className='todoItem'>{todo}</p>
              <button onClick={()=>onClickBack(index)}>戻す</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className='DeletedArea'>
      <p className='title'>ゴミ箱のTODO</p>
      <ul>
        {deletedTodos.map((todo:any,index:number)=>(
          <li key={todo}>
            <div className='listRow'>
              <p className='todoItem'>{todo}</p>
              <button onClick={()=>onClickReturn(index)}>戻す</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
    
  );
}

export default Todo;
