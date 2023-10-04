import Loading from "./loader"


const TaskForm = (prop)=>{
    
    return(
        <form action="" ref={prop.passRef} onSubmit={prop.submit}>
            <p className="head">{prop.title}</p>
            <label htmlFor="title">Title</label>
            <input className="title" type="text" name="title" maxLength={40} placeholder="title" required />
            <label htmlFor="desc">description</label>
            <textarea className="desc" type="text" name="desc" maxLength={500} placeholder="max 500 characters" required />
            <div className="buttons">
            <div className="cancle" onClick={()=>prop.setPass(false)}>Cancle</div>
            <button type="submit" className="add">{prop.pass?<Loading/>:prop.edit}</button>
            </div>
        </form>
    )
}
export default TaskForm