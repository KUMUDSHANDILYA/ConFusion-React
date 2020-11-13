import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CommentForm from './CommentForm';
import {Loading} from './LoadingComponent';
import { baseURL} from '../shared/baseURL';

import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle , Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';






    function RenderDish({dish}) {

        return (
            <FadeTransform in transformProps = {{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>

                <Card>
                    <CardImg top src={baseURL + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>

             </FadeTransform>

            );

    }


    function RenderComments({comments, postComment, dishId}) {


                const comment = comments.map((comm) => {
                return (

                        <Fade in>
                        <li key = {comm.id}>
                        <p >{comm.comment}</p>
                        <p >--{comm.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</p>
                         </li>
                         </Fade>

                );
                }


                 )


        return (

            <div>

                <h4>Comments</h4>
                <div>
                <ul class="list-unstyled">
                <Stagger in>
                    {comment}
                </Stagger>
                </ul>
                    <CommentForm dishId = {dishId} postComment = {postComment}/>
                </div>

            </div>

        );
    }


    const DishDetail = (props) => {

        if(props.isLoading){
            return (
                <div className = "container">
                   <div className = "row">
                            <Loading />
                   </div>
                </div>
            );
        }

        else if(props.errmsg){
            return (
                <div className = "container">
                   <div className = "row">
                        <h4>prop.errmsg</h4>
                   </div>
                </div>
            );
        }

        else if(props.dish!=null)
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
                        <RenderComments comments = {props.comments}
                        postComment = {props.postComment}
                        dishId = {props.dish.id}/>

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