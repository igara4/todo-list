import React, { useState } from 'react';
import './styles.css';

function Todo() {
  const[todos,setTodos]=useState<any>([])
  const[newTodo,setNewTodo]=useState<any>({
    title:'',
    detail:''
  })
  const [filterText, setFilterText] = useState<string>('');
  const [filterStatus,setFilterStatus]=useState<any>('すべて')
  const [currentID,setCurrentID]=useState<number>(1)
  const [editingTodoId,setEditingTodoID]=useState<any>(null)
  const [editingTodo,setEditingTodo]=useState<any>({})

  const onClickAdd=()=>{
    if(newTodo.title===''){
      alert('タイトルを入力してください') 
      return
    }
    const newItem:any={
      id:currentID.toString(),
      title:newTodo.title,
      status:'未着手',
      detail:newTodo.detail
    }
    setTodos([...todos,newItem])
    setNewTodo({title:'',detail:''})
    setCurrentID(currentID+1)
  }

  const onClickDelete=(index:number)=>{
    const updatedTodos=[...todos]
    updatedTodos.splice(index,1)
    setTodos(updatedTodos)
  }

  const startEditing=(todo:any)=>{
    setEditingTodoID(todo.id)
    setEditingTodo(todo)
  }

  const saveEditedTodo=()=>{
    setTodos(todos.map((todo:any)=>todo.id===editingTodoId?{...todo,...editingTodo}:todo))
    setEditingTodoID(null)
    setEditingTodo({})
  }

  const filteredTodos=todos.filter((todo:any)=>{
    const matchesText=todo.id.includes(filterText)||todo.title.includes(filterText)
    const matchesStatus=filterStatus==='すべて'?true:todo.status===filterStatus
    return matchesText&&matchesStatus
  })

  return (
    <>
    <div className='title'>
    <h2>TODOリスト</h2>
    </div>
    <div className='input-area'>
      <input
        type='text' 
        name='title'
        placeholder='TODOタイトル'
        value={newTodo.title}
        onChange={(e)=>setNewTodo({...newTodo,title:e.target.value})}
        />
      <input
        type='text'
        name='detail'
        placeholder='詳細'
        value={newTodo.detail}
        onChange={(e)=>setNewTodo({...newTodo,detail:e.target.value})}/>
      <button onClick={onClickAdd}>追加</button>
    </div>
    <div className='filter-area'>
      <input
        type='text'
        placeholder='IDまたはタイトルで検索'
        value={filterText}
        onChange={(e)=>setFilterText(e.target.value)}
        />
      <select
        value={filterStatus}
        onChange={(e)=>setFilterStatus(e.target.value)} 
      >
        <option value='すべて'>すべて</option>
        <option value='未着手'>未着手</option>
        <option value='進行中'>進行中</option>
        <option value='完了'>完了</option>
      </select>
    </div>
    <div>
      <ul>
        {filteredTodos.map((todo:any,index:number)=>(
          <li key={todo.id}>
          {editingTodoId===todo.id?(
            <div className='editing-area'>
              <input 
                type='text'
                value={editingTodo.title??todo.title}
                onChange={(e)=>setEditingTodo({...editingTodo,title:e.target.value})}
                placeholder='タイトルを編集'
              />
              <select
                value={editingTodo.status??todo.status}
                onChange={(e)=>setEditingTodo({...editingTodo,status:e.target.value})}
              >
                <option value='未着手'>未着手</option>
                <option value='進行中'>進行中</option>
                <option value='完了'>完了</option>
              </select>
              <input
                type='text'
                value={editingTodo.detail??todo.detail}
                onChange={(e)=>setEditingTodo({...editingTodo,detail:e.target.value})}
                placeholder='詳細を編集'
              />
              <button onClick={saveEditedTodo}>保存</button>
              <button onClick={()=>setEditingTodoID(null)}>キャンセル</button>
            </div>
          ):(
            <div className='todo-area'>
              <p><strong>ID:</strong>{todo.id}</p>
              <p><strong>タイトル:</strong>{todo.title}</p>
              <p><strong>ステータス:</strong>{todo.status}</p>
              <p><strong>詳細:</strong>{todo.detail}</p>
              <button onClick={()=>onClickDelete(index)}>削除</button>
              <button onClick={()=>startEditing(todo)}>編集</button>
          </div>
          )}
          </li>
        ))}
      </ul>
    </div>
    </>
    
  );
}

export default Todo;
