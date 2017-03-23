import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import {cyan50} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import _ from 'lodash';

// const styles = {
//   container: {
//     // textAlign: 'center',
//     paddingTop: 100,
//     width: '60%',
//     margin: 'auto',
//   },
// };

const style = {
  raisedBtn: {
  	margin: 12
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 12
  },
  chip: {
    margin: 4,
  },
};


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: '',
      items: ['Chinese'],
      inputError: '',
      open: false,
      result: '',
    };
  }

  onInputChange(event, newValue) {
    this.setState({ restaurant: newValue }, () => {
      if(this.state.restaurant !== '') {
        this.setState({ inputError: ''});
      }
    });
  }

  addItem(event) {
    event.preventDefault();

    let {
      items,
      restaurant,
    } = this.state;

    if (restaurant === '') {
      this.setState({ inputError: 'This field cannot be empty' });
      return;
    }

    this.setState({
      items: items.concat(restaurant),
      restaurant: '',
      inputError: '',
    });
  }

  handleRequestDelete(index) {

    this.items = this.state.items;
    const itemToDelete = this.items.map((item, itemIndex) => itemIndex).indexOf(index);
    this.items.splice(itemToDelete, 1);
    this.setState({items: this.items});
  };

  handleOpen = () => {

    if (this.state.items.length === 0) {
      this.setState({
        inputError: 'Please enter a restaurant',
      });
      return;      
    }

    this.setState({
      open: true,
      result: 'Go to ' + _.sample(this.state.items),
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  renderChip(item, index) {
    return (
      <Chip
        key={index}
        onRequestDelete={() => this.handleRequestDelete(index)}
        style={style.chip}
        backgroundColor={cyan50}
      >
        {item}
      </Chip>
    );
  }

  render() {
    const dialogBtn = [
      <FlatButton
        label="Ok"
        onTouchTap={this.handleClose}
      />
    ];


    return (
      <MuiThemeProvider>
        <div className="container">
          <Card>
				    <CardTitle title="Lunch Picker" />
				    <CardText>
            <form onSubmit={this.addItem.bind(this)}>
							<TextField
                hintText="Enter a new restaurant"
                errorText={this.state.inputError}
                fullWidth={true}
                value={this.state.restaurant}
                onChange={this.onInputChange.bind(this)}
              />
            </form>
				    </CardText>
            <div style={style.wrapper}>
              {this.state.items.map(this.renderChip, this)}
            </div>
				    <CardActions>
					    <RaisedButton onTouchTap={this.addItem.bind(this)} label="Add" style={style.raisedBtn} />
					    <RaisedButton onTouchTap={this.handleOpen.bind(this)} label="Pick" primary={true} style={style.raisedBtn} />
              <Dialog
                title={this.state.result}
                modal={false}
                actions={dialogBtn}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
              </Dialog>
				    </CardActions>
				  </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;