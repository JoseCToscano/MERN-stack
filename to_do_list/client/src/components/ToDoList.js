import React, { Component, Fragment } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  NavItem
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItemsById, deleteItem, getItems } from "../actions/itemActions";
import PropTypes from "prop-types";

class ToDoList extends Component {
  static propTypes = {
    getItemsById: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ task_id, name }) => (
              <CSSTransition key={task_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="small"
                      onClick={this.onDeleteClick.bind(this, name)}
                    >
                      &times;
                    </Button>
                  ) : null}

                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ToDoList);
