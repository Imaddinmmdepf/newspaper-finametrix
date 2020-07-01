import api from './api'


export const ACTION_TYPES ={
    CREATE : 'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL',
    ARCHIVE: 'ARCHIVE',
    FETCH_ARCHIVE: 'FETCH_ARCHIVE'
}

export const fetchAll = () => dispatch => {
    api.postNew().fetchAll()
    .then(res => {

        dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: res.data
        })
    })
    .catch(err => console.log(err))

}

export const fetchArchiveNew = () => dispatch => {
    api.postNew().fetchArchiveNew()
    .then(res => {
        dispatch({
            type: ACTION_TYPES.FETCH_ARCHIVE,
            payload: res.data
        })
    })
    .catch(err => console.log(err))

}

export const create = (data, onSuccess) => dispatch => {
    api.postNew().create(data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

export const update = (id ,data, onSuccess) => dispatch => {
    api.postNew().update(id,data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: res.data
        })
        onSuccess();
    }).catch(err => console.log(err))

}   
export const deleteNew = (id, onSuccess) => dispatch => {
    console.log("deleteee ----------" + id)
    api.postNew().delete(id)
    .then(res => {
        console.log(res);
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess();
    }).catch(err => console.log(err))
}

    export const archiveNew = (id, onSuccess) => dispatch => {
        api.postNew().archiveNew(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.ARCHIVE,
                payload: id
            })
            console.log(res.data)
            onSuccess();
        })
        .catch(err => console.log(err))
    }
