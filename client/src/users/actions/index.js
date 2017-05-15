import { push } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'


// Create
const fetchSignupSuccess = (user) => ({ type: 'ADD_USER', user })
const fetchSignupFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchSignup = (values) => {
  return (dispatch, getState) => {
    return fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    .then(res => {
      if (res.ok) {
        localStorage.setItem('token', res.headers.get('x-auth'))
        return res.json()
      }
      throw new Error('Network response was not ok.')
    })
    .then(json => {
      if (json.error) return Promise.reject(json.error)
      dispatch(fetchSigninSuccess(json))
      const path = getState().user.redirect || null
      if (path) return dispatch(push(path))
    })
    .catch(err => {
      dispatch(fetchSigninFailure(err))
      throw new SubmissionError({ ...err, _error: 'Signup failed!' })
    })
  }
}

export const redirectUser = (path) => {
  console.log(path)
  return {
    type: 'REDIRECT_USER',
    path
  }
}

const fetchSigninSuccess = (user) => ({ type: 'RECEIVE_USER', user })
const fetchSigninFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchSignin = (values) => {
  return (dispatch, getState) => {
    return fetch('/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.ok) {
          localStorage.setItem('token', res.headers.get('x-auth'))
          return res.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchSigninSuccess(json))
        const path = getState().user.redirect || null
        if (path) return dispatch(push(path))
      })
      .catch(err => {
        console.log('error', err)
        dispatch(fetchSigninFailure(err))
        throw new SubmissionError({ ...err, _error: 'Signin failed!' })
      })
  }
}



// Read
const fetchUserRequest = () => ({ type: 'REQUEST_USER' })
const fetchUserSuccess = (user) => ({ type: 'RECEIVE_USER', user })
const fetchUserFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchUser = (token) => {
  return (dispatch) => {
    dispatch(fetchUserRequest())
    return fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchUserSuccess(json))
      })
      .catch(err => {
        const token = localStorage.getItem('token')
        if (token) localStorage.removeItem('token')
        dispatch(fetchUserFailure(err))
      })
    }
}




// Delete
const fetchSignoutSuccess = () => ({ type: 'DELETE_USER' })
const fetchSignoutFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchSignout = () => {
  return (dispatch, getState) => {
    return fetch('/api/users/signout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('token')
          dispatch(fetchSignoutSuccess())
        }
        throw new Error('Network response was not ok.')
      })
      .catch(err => dispatch(fetchSignoutFailure(err)))
  }
}


const fetchDeleteSuccess = () => ({ type: 'DELETE_USER' })
const fetchDeleteFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchDelete = () => {
  return (dispatch, getState) => {
    return fetch('/api/users/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        localStorage.removeItem('token')
        dispatch(fetchDeleteSuccess())
      })
      .catch(err => dispatch(fetchDeleteFailure(err)))
  }
}






const fetchRecoverySuccess = (message) => ({ type: 'RECOVER_USER', message })
const fetchRecoveryFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchRecovery = ({ email }) => {
  return function(dispatch, getState) {
    return fetch('/api/users/recovery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchRecoverySuccess(json))
        //dispatch(signinUser())
        //localStorage.setItem('token', res.headers.get('x-auth'))
      })
      // .then(user => {
      //   if (user.error) {
      //     return dispatch(authError(user))
      //   }
      //   dispatch(signinUser(user))
      //
      //   browserHistory.push(nextPathname)
      // })


      //})
      .catch(err => {
        dispatch(fetchRecoveryFailure(err))
        throw new SubmissionError({ ...err, _error: 'Signin failed!' })
      })
  }
}


const fetchRecoveryTokenSuccess = (recovery) => ({ type: 'RESET_USER', recovery })
const fetchRecoveryTokenFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchRecoveryToken = (token) => {
  return (dispatch, getState) => {
    return fetch(`/api/users/reset/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchRecoveryTokenSuccess({ recovery: { token: 'valid' } }))
        //localStorage.setItem('token', res.headers.get('x-auth'))
      })

      .catch(err => {
        dispatch(fetchRecoveryTokenFailure({ error: 'invalid token' }))
        dispatch(push('/recovery'))
      })
  }
}






const fetchContactSuccess = (values) => ({ type: 'CONTACT_USER', values })
const fetchContactFailure = (error) => ({ type: 'ERROR_USER', error })
export const fetchContact = (values) => {
  return function(dispatch, getState) {
    return fetch('/api/users/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchContactSuccess(json))
      })
      .catch(err => dispatch(fetchContactFailure(err)))
  }
}