import React, {  Component }  from 'react';
import { Button } from 'reactstrap';


class CancelDeleteBtns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCancelConfirm: false

    }
  }

  setCancelConfirmToFalse = () =>{
  this.setState({ isCancelConfirm : false });
  }
  setCancelConfirmToTrue = () => {
    this.setState({ isCancelConfirm: true });
  }
  render() { 
    const userId = this.props.user._id;
    const deleteUser = this.props.deleteUser;
    const deleteBtn = <Button color='danger' onClick={this.setCancelConfirmToTrue} key={"del"}>del</Button>;
    const confirmBtn = <Button color='success' onClick={(e) => deleteUser(userId)} key={"Confirm"}>Confirm</Button>;
    const cancelBtn = <Button color='warning' onClick={this.setCancelConfirmToFalse} key={"Cancel"}>Cancel</Button>;

    const buttons = this.state.isCancelConfirm === true ? [confirmBtn, cancelBtn] : [deleteBtn];
    let style = this.state.isCancelConfirm === true ? { "position":  "absolute"} : null;

    return ( 
          <div style={style} className="btn-container">
            {buttons}
          </div>
     )
  }
}
 
export default CancelDeleteBtns;

