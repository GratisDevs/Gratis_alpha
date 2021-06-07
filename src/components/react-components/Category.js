import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';

class Category extends React.Component{
    render(){
        return(
            <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={this.props.selected.cricket} onChange={(ev)=>this.props.handleChange(ev)} name="Cricket" />}
        label="Cricket"
      />
      <FormControlLabel
        control={<Checkbox checked={this.props.selected.entertainment} onChange={(ev)=>this.props.handleChange(ev)} name="Entertainment" />}
        label="Entertainment"
      />
      <FormControlLabel
        control={<Checkbox checked={this.props.selected.fashion} onChange={(ev)=>this.props.handleChange(ev)} name="Fashion" />}
        label="Fashion"
      />
      <FormControlLabel
        control={<Checkbox checked={this.props.selected.technology} onChange={(ev)=>this.props.handleChange(ev)} name="Technology" />}
        label="Technology"
      />
      <FormControlLabel
        control={<Checkbox checked={this.props.selected.cuisine} onChange={(ev)=>this.props.handleChange(ev)} name="Cuisine" />}
        label="Cuisine"
      />
      </FormGroup>
        );
    }
}

const mapStateToProps=(state)=>({})

export default connect(mapStateToProps)(Category);