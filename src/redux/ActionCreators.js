import * as ActionTypes from './ActionTypes';
import { baseURL }from '../shared/baseURL';

export const addComment = (dishId, rating , author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseURL + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};



export const fetchDishes =() => (dispatch) => {
    dispatch(dishesLoading(true));
            return fetch(baseURL + 'dishes')
            .then(response => {
                if(response.ok)
                {
                    return response;
                }
                else
                {
                    var error = new Error('Error ' + response.status + ": " +  response.statusText);
                    error.response = response;
                    throw error;
                }
            }, error => {
                var errmsg = new Error(error.message);
                throw errmsg;
            })
             .then(response => response.json())
             .then(dishes => dispatch(addDishes(dishes)))
             .catch(error => dispatch(dishesFailed(error.message)));

}

export const dishesLoading = () => {
    return (
        {
            type: ActionTypes.DISHES_LOADING
        }
    );
}

export const dishesFailed = (errmsg) => {
    return (
        {
            type: ActionTypes.DISHES_FAILED,
            payload: errmsg
        }
    );
}

export const addDishes = (dishes) => {
    return (
        {
            type: ActionTypes.ADD_DISHES,
            payload: dishes
        }
    );
}

export const fetchComments =() => (dispatch) => {

            return fetch(baseURL + 'comments')
                .then(response => {
                if(response.ok)
                {
                    return response;
                }
                else
                {
                    var error = new Error('Error' + response.status + response.statusText);
                    error.response = response;
                    throw error;
                }
            }, error => {
                var errmsg = new Error(error.message);
                throw errmsg;
            })

             .then(response => response.json())
             .then(comments => dispatch(addComments(comments)))
             .catch(error => dispatch(commentsFailed(error.message)));

}


export const commentsFailed = (errmsg) => {
    return (
        {
            type: ActionTypes.COMMENTS_FAILED,
            payload: errmsg
        }
    );
}

export const addComments = (comments) => {
    return (
        {
            type: ActionTypes.ADD_COMMENTS,
            payload: comments
        }
    );
}


export const fetchPromos =() => (dispatch) => {
    dispatch(promosLoading(true));
            return fetch(baseURL + 'promotions')
             .then(response => {
                if(response.ok)
                {
                    return response;
                }
                else
                {
                    var error = new Error('Error' + response.status + response.statusText);
                    error.response = response;
                    throw error;
                }
            }, error => {
                var errmsg = new Error(error.message);
                throw errmsg;
            })
             .then(response => response.json())
             .then(promos => dispatch(addPromos(promos)))
             .catch(error => dispatch(promosFailed(error.message)));

}

export const promosLoading = () => {
    return (
        {
            type: ActionTypes.PROMOS_LOADING
        }
    );
}

export const promosFailed = (errmsg) => {
    return (
        {
            type: ActionTypes.PROMOS_FAILED,
            payload: errmsg
        }
    );
}

export const addPromos = (promos) => {
    return (
        {
            type: ActionTypes.ADD_PROMOS,
            payload: promos
        }
    );
}

export const fetchLeaders =() => (dispatch) => {
    dispatch(leadersLoading(true));
            return fetch(baseURL + 'leaders')
            .then(response => {
                if(response.ok)
                {
                    return response;
                }
                else
                {
                    var error = new Error('Error ' + response.status + ": " +  response.statusText);
                    error.response = response;
                    throw error;
                }
            }, error => {
                var errmsg = new Error(error.message);
                throw errmsg;
            })
             .then(response => response.json())
             .then(leaders => dispatch(addLeaders(leaders)))
             .catch(error => dispatch(leadersFailed(error.message)));

}

export const leadersLoading = () => {
    return (
        {
            type: ActionTypes.LEADERS_LOADING
        }
    );
}

export const leadersFailed = (errmsg) => {
    return (
        {
            type: ActionTypes.LEADERS_FAILED,
            payload: errmsg
        }
    );
}

export const addLeaders = (leaders) => {
    return (
        {
            type: ActionTypes.ADD_LEADERS,
            payload: leaders
        }
    );
}



export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    };
    newFeedback.date = new Date().toISOString();

    return fetch(baseURL + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => alert("Thank you for your feedback\n" + JSON.stringify(response)))
    .catch(error =>  { console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};



