import React from 'react';
import Menu from './menuComponent';
import {Component} from 'react';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators';
import actions from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStateToProps = (state) => {
        return {
            dishes: state.dishes,
            comments: state.comments,
            promotions: state.promotions,
            leaders: state.leaders
        };
    }

const mapDispatchToProps = (dispatch) => ({

    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(
        firstname, lastname, telnum, email, agree, contactType, message
    ))

});


class Main extends Component {

    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    };





  render() {

        const HomePage = () => {

            return (

                <Home  dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                        dishesLoading={this.props.dishes.isLoading}
                        dishesErrmsg = {this.props.dishes.errmsg}
                         promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                      promosLoading={this.props.promotions.isLoading}
                        promosErrmsg = {this.props.promotions.errmsg}
                      leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                      leadersLoading={this.props.leaders.isLoading}
                       leadersErrmsg = {this.props.leaders.errmsg}
                 />

            );

        }

   const DishWithId = ({match}) => {

        return (

            <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId, 10))[0]}
                isLoading={this.props.dishes.isLoading}
                errmsg = {this.props.dishes.errmsg}
                comments = {this.props.comments.comments.filter((comments)=> comments.dishId=== parseInt(match.params.dishId, 10))}
                errmsg = {this.props.comments.errmsg}
                postComment = {this.props.postComment}
            />

        );

   }

    const AboutPage = () =>{

        return (

            <About leaders={this.props.leaders.leaders}
                isLoading={this.props.leaders.isLoading}
                errmsg = {this.props.leaders.errmsg}
            />

        );

    }




        return (
        <div>
            <Header />
            <TransitionGroup>
                <CSSTransition key = {this.props.location.key} classNames = "page" timeout = {309}>
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}/>
                            <Route path="/menu/:dishId" component={DishWithId}/>
                            <Route exact path='/contactus' component={() => <Contact
                                postFeedback = {this.props.postFeedback}
                            />} />
                            <Route path="/aboutus" component={AboutPage}/>
                            <Redirect to="/home"/>
                        </Switch>
                 </CSSTransition>
            </TransitionGroup>
            <Footer/>
        </div>
      );

  }
}

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Main)));
