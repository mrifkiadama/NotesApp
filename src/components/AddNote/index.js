import React from 'react';
import Swal from 'sweetalert2';


class AddNote extends React.Component {

    constructor(props) {
        super(props);
        // inisialisasi state
        this.state = {
            title: '',
            body: '',
            characterTitleLimit: 50,
            characterBodyLimit: 1000,
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }


    onTitleChangeEventHandler(event) {
        if (this.state.characterTitleLimit - event.target.value.length >= 0) {
            this.setState(() => {
                return {
                    title: event.target.value,
                }
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Maximum Character !!!',
                html: 'Please input your title note before <b>' + this.state.characterTitleLimit + '</b> character',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    onBodyChangeEventHandler(event) {
        if (this.state.characterBodyLimit - event.target.value.length >= 0) {
            this.setState(() => {
                return {
                    body: event.target.value,
                }
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Maximum Character !!!',
                html: 'Please input your body note before <b>' + this.state.characterBodyLimit + '</b> character',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        if (this.state.title.trim().length !== 0 && this.state.body.trim().length !== 0) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully',
                text: 'Your Note has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            this.props.addNote(this.state);
            this.setState({ title: '' });
            this.setState({ body: '' });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Not any data',
                text: 'Your title or body is empty',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    render() {

        return (
            <div >
                <form className='note new' onSubmit={this.onSubmitEventHandler}>
                    <input
                        className='note-input'
                        type='text'
                        placeholder='Input Title...'
                        value={this.state.title}
                        onChange={this.onTitleChangeEventHandler}
                    />
                    <small style={{ margin: '0px 0px 15px 0px' }}>
                        {this.state.characterTitleLimit - this.state.title.length} Remaining
                    </small>

                    <textarea
                        rows='8'
                        cols='10'
                        placeholder='Type to text a note...'
                        value={this.state.body}
                        onChange={this.onBodyChangeEventHandler}
                    ></textarea>
                    <div className='note-footer'>
                        <small>
                            {this.state.characterBodyLimit - this.state.body.length} Remaining
                        </small>
                        <button className='save' type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};

export default AddNote;
