
const ErrorSuccessBox = ({ error, success }) => {

    return (

        
        ((error || success) && (
            <div
                className={`mb-5 rounded-lg px-4 py-3 text-sm wrap-break-word
            ${error
                        ? "bg-red-100 border dark:bg-red-700/50 border-red-200 dark:border-gray-400 text-red-600 dark:text-gray-100"
                        : "bg-green-100 border dark:bg-green-700/50 border-green-200 dark:border-gray-400 text-green-600 dark:text-gray-100"
                    }
          `}
            >
                {error || success}
            </div>
        ))
       

    );

};

export default ErrorSuccessBox;