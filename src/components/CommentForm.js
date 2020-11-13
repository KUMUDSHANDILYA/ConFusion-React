import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Label, Col, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {

            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    toggleModal() {

        this.setState({
            isModalOpen: !this.state.isModalOpen
        });

    }

    render(){

        return(

            <div className = "container">

                <div className = "row">
                    <div className = "col">

                        <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-pencil fa-lg"></span> Submit Comment
                        </Button>

                    </div>
                </div>


            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>

                <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                        <Row className="form-group">

                            <Label sm = {12}htmlFor = "rating">Rating</Label>
                            <Col>
                                <Control.select model = ".rating" name = "rating"
                                className="form-control">

                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Control.select>
                            </Col>

                        </Row>

                        <Row className = "form-group">
                            <Label sm = {12} htmlFor = "author">Name</Label>
                            <Col>
                                <Control.text model = ".author" id="author" name="author"
                                        placeholder="Name"
                                        className="form-control"
                                        validators = {{
                                               required, minLength: minLength(3), maxLength:  maxLength(15)
                                        }}/>
                                        <Errors
                                          className = "text-danger"
                                          model = ".author"
                                          show = "touched"
                                          messages = {{
                                            required: "Required",
                                            minLength: "minimum length must be greater than 2 characters",
                                            maxLength: "maximum length must be less than 15 characters"
                                          }}
                                          />
                            </Col>
                        </Row>


                         <Row className="form-group">
                                <Label sm = {12} htmlFor="message">Your Comment</Label>
                                <Col>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                    Submit Comment
                                    </Button>
                                </Col>
                            </Row>

                    </LocalForm>
                </ModalBody>

            </Modal>

            </div>


        );

    }
}

export default CommentForm;