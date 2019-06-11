import React from 'react';
import {app} from '../base';

//This is Component Home, is the route of the todo list app
class Home1 extends React.Component {
  // instance db with the route of todo list app of each user
  db = app.database().ref('users/'+ app.auth().currentUser.email.split('@')[0]+'/todos');
  state = {
    todo: "",
    //instance state of the array of the list
    todos: []
  };

    componentWillMount() {
     // call the array of the list 
      this.db.on('value',(snapshot)=>{
        
        // if this list not exist
        (snapshot.val() === null) ? (
        console.log('TODOS TODOS: ', snapshot.val())

        ) :
       ( this.setState({
          todos: snapshot.val()
        }))
        console.log('TODOS TODOS: ', snapshot.val());
        
      })
      
    }
    //method to checkbox
    handleCheckbox = (index) => {
        const {todos} = this.state;
        todos[index].done = !todos[index].done;
       this.db.child(index).update({
         done: todos[index].done
       })
          
          this.setState({
            todos,
          });
     
    }

    handleChange = event => {
      this.setState({
        todo: event.currentTarget.value
      });
    };
    // save new homework
    handleSubmit = (event) => {
        const {todos} = this.state;
              app.database().ref('users/'+app.auth().currentUser.email.split('@')[0]).set({
                todos: [{
                  text: event.currentTarget.todo.value,
                  done:false,
                },
              ...todos],
              }).then((key) => {
                console.log('Que retorna el set: ',key.va);
                  
              }).catch((err) => {
                  console.error();
                  
              })
              ;
         
            this.setState({
              todo: '',
              todos: [
                {
                  text: event.currentTarget.todo.value,
                  done:false,
                },
                ...todos
              ]
            });     
            event.preventDefault();
         
         
          
          
       
    }
    handleRemove = (index) => {
        const {todos} = this.state;
        app.database().ref('users/'+ app.auth().currentUser.email.split('@')[0]).update({
          todos: [
            ...todos.slice(0,index),
            ...todos.slice(index+1),
          ],
        })

        
        this.setState({
          todo: '',
          todos: [
            ...todos.slice(0,index),
            ...todos.slice(index+1),
          ],
        });  
        
        
        
      }
      render(){
        const {todo, todos} = this.state;
        return(
          
          <div className="App">
          <div className="container-fluid">
          <div className="row">
          <header 
          style={{ margin: '20px 0 40px 0' }} 
          className="App-header col col-12">
       <h1 >React Todo App</h1>
     </header>
     <main className="col col-12">
 
   <form onSubmit= {this.handleSubmit} style={{ marginBottom: '20px' }}>
 
         <input 
         name = 'todo'
         value= {todo} 
         onChange= {this.handleChange}  
         className="form-control" 
         type="text" 
         placeholder="Enter todo here...[Press Enter]" autoComplete="off" />
       </form>
 
       <ul className="todos list-groups" style={{ padding: 0 }}>
         {(todos.length === 0)
           ? (<li style = {{color: 'black'}}  className="todo list-group-item">This New Todo</li>)
           : (todos.map((item, key) => (
        <li 
        checked={item.done} 
        key={`list-${key + 1}`}
                className="todo list-group-item">
               <input 
                onChange={() => this.handleCheckbox(key)}
                checked = {item.done}
                className="form-control col-1"
                type="checkbox" />
               <span style={{
                 top: 0, 
                 bottom: 0,
                 left: '3rem',
                 right: '5rem',
                 lineHeight: '62px', 
                 display: 'block', 
                 position: 'absolute',
                 color: 'black',
                 textDecoration: (item.done) ? 'line-through' : 'none',
               }}
               >
                 {item.text}
               </span>
               
               <button
                 onClick={() => {
                     this.handleRemove(key)
                 }}
                 type="button"
                 className="btn btn-sm btn-danger"
                 style={{
                   position: 'absolute',
                   top: 0,
                   bottom: 0,
                   right: '1.25rem',
                   margin: 'auto 0',
                   height: '25px',
                   paddingTop: 0,
                   paddingBottom: 0,
                 }}
               >
                 &times;
               </button>
                </li>
                  
              )))
            }
            
 <button  style={{marginTop:'10px'}} onClick={()=> app.auth().signOut()}>Sign Out</button>
       </ul>
     </main>
   </div>
   </div>
   </div>
         

        )
    }
}

const Home = () => {
    return (
       <Home1 />
    )
}

export default Home;