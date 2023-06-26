function Button({ children, type, version='primary', isDisabled }) {

    return (
        <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>{ children }</button>
    )

}

export default Button