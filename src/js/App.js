import React from "react";

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			data : "Default Data"
		}
	}

	update(e){
		this.setState({data:e.target.value})
	}

	render(){
		let txt = this.props.txt;
		let cat = this.props.cat;
		return (
			<div>

				<Widget update = {this.update.bind(this)} placeholder={this.state.data}/>
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

		//props.children nesting

const Button = (props) => <button data={props.data}> {props.children} </button>

Button.propTypes = {
	data(props,propName, component){
		if(!(propName in props)){
			throw new Error(`Missing ${propName}`);
		}
	}
}

const Widget = (props) => <input type="text" onChange={props.update} placeholder={props.placeholder}/>

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