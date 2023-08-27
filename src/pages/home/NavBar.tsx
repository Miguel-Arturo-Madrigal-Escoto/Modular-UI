import { useEffect, useState, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onLogout } from '../../app/auth/thunks';
import { defaultImageProfile } from '../../components/common/constants';
import { Link, useLocation } from 'react-router-dom';

export const NavBar = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const dispatch = useAppDispatch();
    const { user_data } = useAppSelector(state => state.auth);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const onUserLogout = () => {
        dispatch(onLogout());
    }

    useEffect(() => {
        setIsProfileMenuOpen(false);
        setIsMenuOpen(false);

    }, [location.pathname]);

    return (
        <>
            <nav className="sticky top-0 z-50 flex-no-wrap  flex w-full items-center justify-between bg-gradient-to-r from-indigo-500 to-red-600 py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
                <div className="relative flex items-center">
                    <button
                        className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200"
                        type="button"
                        data-te-collapse-init
                        data-te-target="#navbarSupportedContent1"
                        aria-controls="navbarSupportedContent1"
                        aria-expanded={isMenuOpen ? 'true' : 'false'}
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                    >
                        <span className="[&>svg]:w-7">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                                <path
                                    fillRule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </button>

                    {isMenuOpen && (
                        <div className="absolute left-3 top-5 mt-2 w-25 bg-white shadow-lg" data-te-dropdown-menu-ref>
                            <button
                                className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-300"
                                onClick={toggleMenu}
                            >
                            </button>
                            <ul className="list-none p-2">
                            <li>
                                    <Link
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-left text-black-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-black-700 dark:hover:bg-neutral-100 focus:bg-indigo-100 focus:text-indigo-500"
                                        to="/for-you"
                                        data-te-dropdown-item-ref
                                    >
                                        Home
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-left text-black-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-black-700 dark:hover:bg-neutral-100 focus:bg-indigo-100 focus:text-indigo-500"
                                        to="/matches"
                                        data-te-dropdown-item-ref
                                    >
                                        Matches
                                    </Link>
                                </li> */}
                                <li>
                                    <Link
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-left text-black-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-black-700 dark:hover:bg-neutral-100 focus:bg-indigo-100 focus:text-indigo-500"
                                        to="/messages"
                                        data-te-dropdown-item-ref
                                    >
                                        Mensajes
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>


                <div className="flex items-center justify-center flex-grow px-3">
                    <a className="flex items-center justify-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" href="#">
                        <img
                            src="https://s3-alpha.figma.com/hub/file/1913095808/a7bdc469-cd70-4ea1-bb57-b59204ad8182-cover.png"
                            style={{ height: '30px' }}
                            alt="Jobbie Logo"
                            loading="lazy"
                        />
                    </a>
                </div>

                <div className="relative right-3 flex items-center">
                        <a
                            className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                            href="#"
                            onClick={toggleProfileMenu}
                            id="dropdownMenuButton2"
                            role="button"
                            data-te-dropdown-toggle-ref
                            aria-expanded={isProfileMenuOpen ? 'true' : 'false'}
                        >
                            <img
                                src={ 
                                    user_data?.user?.image || user_data?.company?.image || defaultImageProfile
                                }
                                className="rounded-full"
                                style={{ height: '25px', width: '25px' }}
                                alt=""
                                loading="lazy"
                            />
                        </a>
                        {isProfileMenuOpen && (
                            <div className="absolute right-0 top-5 mt-2 w-25 bg-white shadow-lg" data-te-dropdown-menu-ref>
                                <button
                                    className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-300"
                                    onClick={toggleProfileMenu}
                                >
                                </button>
                                <ul className="list-none p-2">
                                    <li>
                                        
                                        <Link
                                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-left text-black-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-black-700 dark:hover:bg-neutral-100 focus:bg-indigo-100 focus:text-indigo-500"
                                            to="/profile"
                                            data-te-dropdown-item-ref
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-left text-black-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-black-700 dark:hover:bg-neutral-100 focus:bg-indigo-100 focus:text-indigo-500"
                                            href="#"
                                            data-te-dropdown-item-ref
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <button
                                            className="block w-full bg-transparent px-4 py-2 text-sm font-normal text-left text-black-700 justify-start hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-black-700 dark:hover:bg-neutral-100 focus:bg-indigo-100 focus:text-indigo-500"
                                            data-te-dropdown-item-ref
                                            onClick={ onUserLogout }
                                        >
                                            Log out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
            </nav>
        </>
    )
}

export default NavBar;
