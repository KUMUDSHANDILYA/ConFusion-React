import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle , Breadcrumb, BreadcrumbItem} from 'reactstrap';






    function RenderDish({dish}) {

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


    function RenderComments({comments}) {

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


    const DishDetail = (props) => {

        if(props.dish!=null)
        {

            return (

               <div class="container">


                 <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div class="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>







                 <div class = "row">

                    <div class="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish}/>
                    </div>

                    <div class="col-12 col-md-5 m-1">
                        <RenderComments comments = {props.comments}/>
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



export default DishDetail;