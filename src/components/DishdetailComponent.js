import React, { Component } from 'react';

import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props){
        super(props);
        this.state = {

        };

    }


    renderDish(dish) {

        return (

                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>

            );

    }


    renderComments(comments) {

        const comment = comments.map((comm) => {
            return (

                <ul class="list-unstyled">

                    <li class="">{comm.comment}</li>
                    <li class="">--{comm.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</li>

                </ul>

            );

        });

        return (

            <div>

                <h4>Comments</h4>
                <div>
                    {comment}
                </div>

            </div>

        );
    }


    render() {

        if(this.props.dish!=null)
        {

            return (

               <div class="container">


                 <div class = "row">

                    <div class="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>

                    <div class="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>

                </div>



               </div>

            );

        }
        else
        {

            return (
                <div></div>

            );
        }

    }

}

export default DishDetail;