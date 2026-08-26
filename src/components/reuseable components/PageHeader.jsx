import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({
    title,
    subtitle,
    showBackButton,
    children
}) => {

    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-between mb-8 mt-4 mx-2'>

            {/* Left Side */}
            <div className='flex items-start gap-4'>

                {showBackButton && (
                    <button
                        onClick={() => navigate(-1)}
                        className='text-black dark:text-white p-2 rounded-lg border border-gray-600 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-900 transition'
                    >
                        <ArrowLeft size={20}/>
                    </button>
                )}

                <div>

                    <h1 className="text-xl sm:text-4xl font-bold text-black dark:text-white">

                        {title}

                    </h1>
                    {subtitle && (
                        <p className="text-gray-800 dark:text-gray-300 text-sm sm:text-xl mt-2 sm:mt-4">

                            {subtitle}

                        </p>
                    )}

                </div>

            </div>

            {/* Right Side */}

            {children && (
                <div>
                    {children}
                </div>
            )}

        </div>
    )
}

export default PageHeader;