import React from "react"
import ReactDOM from "react-dom";
//import App from "./App3";

class TodoInput extends React.Component {

	update(e){
		var key = e.which || e.keyCode;
		//handle empty string
		if(key === 13) {
			this.props.add(e.target.value);
		}
	}

	render (){
		return (
				<div>
					<input class="form-control" type = "text" placeholder = {this.props.placeholder} onKeyUp={this.update.bind(this)} />
				</div>
		);
	}
}

class TabButton extends React.Component{
	changeType(){
		const newType = this.props.value;
		this.props.changeCurrentType(newType);
	}
	render(){
		return (
			<span class={this.props.cn} onClick = {this.changeType.bind(this)} > {this.props.value}</span>
		);
	}
}

//change to stateless if required
class Tab extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			types : {
				ALL: 'All',
				//ARCHIVE: 'Archive',
				PENDING: 'Pending',
				DONE: 'Done'
			}
		}
	}

	render(){
		const buttons = Object.values(this.state.types).map((type) => {
			return (< TabButton
		key = {type}
		value = {type}
		changeCurrentType = {this.props.changeType}
		cn = {this.props.currentType === type ? "btn btn-primary active" : "btn btn-primary"}
	/>);
	}
		);
		return (
			<div class="btn-group btn-group-justified" >
				{buttons}
			</div>
		);
	}
}

class Option extends React.Component{

	getType(){
		//console.log(this.props.opt);
		this.props.changeNoteType(this.props.opt);
	}
	render(){
		return (
			<span class={this.props.cn} onClick = {this.getType.bind(this)}>{this.props.opt}</span>
		);
	}
}

class Options extends React.Component{
	constructor(props){
		super(props);
		this.state={disabledType:this.props.type};
	}

	changeDisabledType(type){
		this.setState({disabledType:type})
	}

	changeNType(newType){
		//console.log(newType);
		this.changeDisabledType(newType);
		this.props.changeNoteType(newType);
	}
	render(){
		//console.log(this.props);
		const options = (this.props.opts).map((option) =>{
			if(option === this.state.disabledType)
		{
			return ( <
				Option changeNoteType = {this.changeNType.bind(this)} cn = "option_small btn btn-primary disabled col-xs-6"
			key = {option} opt={option}/>
		)
		} else {
			return (<
				Option changeNoteType = {this.changeNType.bind(this)} cn = "option_small btn btn-primary col-xs-6"
			key = {option} opt={option}/>)
		}
		}
		);
		return (
			<span> {options} </span>
		);
	}
}

class Note extends React.Component{
	changeNotType(newType){
		//console.log(newType);
		//console.log(this.props.id);
		this.props.changeNoteType(newType,this.props.id,this);
	}
	render(){
		//const op = ["Pending","Done","Archive"];
		const op = ["Pending","Done"];
		return (
			<li class="note">
				<span class={(this.props.type === "Done" && this.props.curType === "All") ? "col-xs-8 note_done" : "col-xs-8"}>{this.props.text}</span>
				<Options class="options col-xs-4 btn-group"
					opts={op} type={this.props.type} changeNoteType = {this.changeNotType.bind(this)}/>
			</li>
		);

}
}

class Notes extends React.Component{
	constructor(props){
		super(props);
		const cType = this.props.currentType;
	}
	changeNoteType(nType,id,child){
		//console.log(nType);
		//console.log(id);
		this.props.changeNoteType(nType,id);
		if(this.props.currentType !== "All"){
			console.log(document.getElementsByClassName("note"));
			//key se node nikaalna hai

			console.log(child);
			console.log("remove this child");
		}
	}
	render(){
		const cType = this.props.currentType;
		const allNotes = this.props.notes;
		const filteredNotes = cType === 'All' ? allNotes : allNotes.filter((n)=> n.status === cType);

		//Shift to props ^
		const notes = (filteredNotes).map((note) =>
					<Note key={note.id} curType={cType} type={note.status} text={note.text} id={note.id} changeNoteType={this.changeNoteType.bind(this)}/>
		);

		return (
			<ul> {notes} </ul>
		);
	}

}

class Todo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			notes : [],
			count : 0,
			currentType : "All"
		}
		this.addNote = this.addNote.bind(this);
		this.changeType = this.changeType.bind(this);
	}

	addNote(txt){
		let a = this.state.notes.slice();
		let c = this.state.count;
		a.push({id:c+1,text:txt,status:"Pending"});
		this.setState({notes: a, count : c+1});
	}

	changeType(newType){
		this.setState({
			currentType : newType
		});
	}

	changeNoteType(newType,id){

		const noteToChange = this.state.notes.find((note)=> note.id===id);
		noteToChange.status = newType;
		this.setState({notes:this.state.notes});
		//multiple set state commands?
	}

	render(){
			return(
				<div id = "todo" class="todo container-fluid">
					<div class="todo__header"> todos </div>
					<TodoInput placeholder = "Enter note" notes={this.state.notes} add = {this.addNote} count = {this.state.count}/>
					<Notes notes={this.state.notes} currentType = {this.state.currentType} changeNoteType={this.changeNoteType.bind(this)}/>
					<Tab changeType = {this.changeType} currentType = {this.state.currentType}/>
				</div>
			);
	}
}

const todo = <Todo />
const app = document.getElementById('app');

ReactDOM.render(todo,app);

