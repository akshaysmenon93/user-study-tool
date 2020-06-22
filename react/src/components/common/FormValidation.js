export function validateLogin ( values ) {
    let errors = {}
    if ( !values.email ) {
        errors.email = 'Email address is required'
    } else if ( !/\S+@\S+\.\S+/.test( values.email ) ) {
        errors.email = 'Email address is invalid'
    }
    if ( !values.password ) {
        errors.password = 'Password is required'
    }
    return errors
};

export function validateTaskForm ( values ) {
    let errors = {}

    var pattern = new RegExp( '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i' ) // fragment locator

    if ( !values.title ) {
        errors.title = 'Task title is required'
    }
    if ( !values.description ) {
        errors.description = 'Task description is required'
    }
    if ( !values.link ) {
        errors.link = 'Task link is required'
    } else if ( !pattern.test( values.link ) ) {
        errors.link = 'Please enter a valid link'
    }

    return errors
}

export function validateExperimentForm ( values ) {
    let errors = {}

    if ( !values.title ) {
        errors.title = 'Experiment title is required'
    }

    if ( !values.description ) {
        errors.description = 'Experiment description is required'
    }

    return errors
}

//add functions to validate other forms.