const Notification = ({ message, status}) => {
    if (message === null) {
        return null
    }

    if (status === 'success') {
        return (
            <div className='message'>
                {message}
            </div>
        )
    } else {
        return (
            <div className='error'>
                {message}
            </div>
        )
    }
}

export default Notification