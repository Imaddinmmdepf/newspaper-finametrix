import React,{useEffect, useState} from 'react';
import { TextField, withStyles, Button } from '@material-ui/core';
import useForm from './useForm';
import {connect} from 'react-redux';
import * as actions from "../actions/postNew"
import ButterToast, {Cinnamon} from "butter-toast"
import {AssignmentTurnedIn} from "@material-ui/icons"


const styles = theme => ({
    root : {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    form : {
        display : 'flex',
        flexWrap : 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        width : '50%'
    }
}) 

const initialFieldValues = {
    title: '',
    description: '',
    author: '',
    contentType: '',
    createdAt: null,
    archivedAt: null
};

const  PostNewForm = ({classes, ...props}) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postNewList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = {...errors};
        temp.title = values.title? "": "this field is required. ";
        temp.description = values.description? "": "this field is required";
        temp.author = values.author? "": "this field is required";
        temp.contentType = values.contentType? "": "this field is required";
        setErrors({
            ...temp
        });
        return Object.values(temp).every(x => x == "")
    }
    let {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, props.setCurrentId); 

    const handleSubmit = e => {
        e.preventDefault()  
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Rost Box"
                content = "Submitted successfully"
                scheme = {Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn/>}

            />
            })
            resetForm()     
        }
        if(validate()){
            if(props.currentId == 0)
               props.createPostNew(values, onSuccess)
            else{
                props.updatePostNew(props.currentId, values, onSuccess)
            }

        } 

    };
    return ( 
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}>
            <TextField
                name="title" 
                variant="outlined"
                label="Title"
                fullWidth
                value = {values.title}
                onChange={handleInputChange}
                {...(errors.title && {error:true, helperText:errors.title})}
            />
            <TextField
                name="description"
                variant="outlined"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value = {values.description}
                onChange={handleInputChange}
                {...(errors.description && {error:true, helperText:errors.description})}

            />
            <TextField
                name="contentType"
                variant="outlined"
                label="Content"
                fullWidth
                multiline
                value = {values.contentType}
                onChange={handleInputChange}
                {...(errors.content && {error:true, helperText:errors.content})}

            />
            <TextField
                name="author"
                variant="outlined"
                label="Author"
                fullWidth                value = {values.author}
                onChange={handleInputChange}
                {...(errors.author && {error:true, helperText:errors.author})}

            />
            <Button 
                variant="contained" 
                color ="primary" 
                size="large" 
                type="submit"
                className={classes.postBtn}>
                Submit
            </Button>
        </form>
     );
}
const mapStateToProps = state => ({
    postNewList : state.postNew.list
})

const mapActionToProps = {
    createPostNew : actions.create,
    updatePostNew : actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostNewForm));