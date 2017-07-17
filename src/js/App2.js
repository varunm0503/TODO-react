import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			data : "Default Data",
			a: "a",
			b: "b",
			c: "c"
		}
	}

	update(e){
		this.setState({a:this.refs.a.value,
						b:this.refs.b.value,
						c:this.c.refs.input.value});
		this.setState({});
	}

	render(){
		let txt = this.props.txt;
		let cat = this.props.cat;
		return (
			<div>

				<input ref = "a" onChange = {this.update.bind(this)} placeholder={this.state.data}/>
				<input ref = "b" onChange = {this.update.bind(this)} placeholder={this.state.data}/>
				<Input ref = { component=> this.c = component} update = {this.update.bind(this)} />
				<h3> {this.state.a} </h3>
				<h3> {this.state.b} </h3>
				<h3> {this.state.c} </h3>
				<h1> {this.state.data} </h1>
				<h1>hello World </h1>
				<h2> {txt} {cat}</h2>
				<Button data="12"> I <Heart /> React </Button>
			</div> 
		);
		//use className attribute instead of class as class is reserved
		//can only return one element
		//props are propagatedfrom the main js file
		//state can be changed by react component
	}
}

class Input extends React.Component{
	render(){
		return <div><input ref = "input" type="text" onChange = {this.props.update}/></div>
	}
}
		//props.children nesting

const Button = (props) => <button data={props.data}> {props.children} </button>

Button.propTypes = {
	data(props,propName, component){
		if(!(propName in props)){
			throw new Error(`Missing ${propName}`);
		}
	}
}

class Heart extends React.Component{
	render(){
		return <span> &hearts; </span>
	}
}

//const statelessApp = () => <h1>Stateless </h1>

App.propTypes = {
	txt: React.PropTypes.string,
	cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
	cat: 1
}


export default App