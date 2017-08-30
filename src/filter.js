import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';

// Note: this is the entry point for the entire application

// step 1: you will need to load the pizza data. it is available at /pizza.json. what-wg fetch is pre-installed.
// remember that fetch uses promises.

// step 2: implement the view and required behaviors
 var url = "/pizza.json";
var PizzaList = React.createClass({
      render: function(){
       return(<ul className="list-group">
        {
          this.props.values.map(function(item) {
            return <li className="list-group-item" data-category={item} key={item}>{item}</li>
          })
         }
        </ul>)
      }
      });
      var Pizzas = React.createClass({
       
      getInitialState: function(){
          fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
        }).then(function(response) {

          return response
        })
      },
        componentWillMount: function(){
          this.setState({pizzas: this.state.pizzas})
        },
      textInputChange: function(event){
          var updatedList = this.state.pizzas;
          if(event.target.value){
            updatedList = updatedList.filter(function(item){
              return item.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
            });
            this.setState({pizzas: updatedList});
          }
          else{
            this.setState({pizzas: this.getInitialState().pizzas});
          }
      },
      sortFilteredList: function(){
          this.setState({pizzas: this.state.pizzas.sort().reverse()})
      },
      render: function(){
        return <div><form>
        <fieldset className="form-group">
        <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.textInputChange}/>
        <input type="button" value="sort pizzas" onClick={this.sortFilteredList} />
        </fieldset>
        </form><PizzaList values={this.state.pizzas} /></div>
      }
      });
      ReactDOM.render(<Pizzas/>, document.getElementById('root'));
