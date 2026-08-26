
const ConfirmModal = ({
    isOpen,
    title = "Confirm Delete",
    message = "Are you sure you want to delete this item?",
    onConfirm,
    onCancel,
    loading = false,
    buttonText = "delete",
    onLoadingButtonText = "deleting"
}) => {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Background overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-black border border-gray-400 dark:border-gray-500 rounded-xl shadow-xl w-full max-w-md mx-4 p-6">

                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h2>

                <p className="text-gray-700 dark:text-gray-300 mt-3">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="px-5 py-2 border font-semibold border-gray-400 dark:text-white dark:border-gray-500 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 disabled:opacity-50"
                    >
                        {loading ? onLoadingButtonText : buttonText}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ConfirmModal;