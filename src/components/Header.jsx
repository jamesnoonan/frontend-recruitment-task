import logo from '../assets/logo.png';
import search from '../assets/icons/search.svg';
import heart from '../assets/icons/heart.svg';
import compare from '../assets/icons/compare.svg';

function Header(props) {
    return (
        <div className="flex flex-col w-full">
            <nav className="w-full h-28 px-20 bg-blue-600">
                <div className="h-full flex justify-between">
                    <ul className="h-full w-3/4 flex justify-around items-center  text-white text-sm">
                        <li><img src={logo} alt="Reality Properties Logo"/></li>
                        <li>Homepage</li>
                        <li>About Us</li>
                        <li>For Rent</li>
                        <li>For Sale</li>
                        <li>Our Agents</li>
                        <li>Contact Us</li>
                    </ul>
                    <ul className="flex items-center">
                        <li><img className="p-3" src={compare} alt="Compare"/></li>
                        <li><img className="p-3" src={heart} alt="Loved"/></li>
                    </ul>
                </div>
            </nav>
            <div id="header-main" className="pt-32 pb-16 flex-grow flex flex-col justify-center shadow-inner bg-blue-600">
                <h1 className="font-medium text-5xl text-white">Let us Guide You Home</h1>
                <p className="font-light text-xl pt-3 text-white">Find the house of your dreams.</p>
                <div className="flex w-2/4 pt-10">
                    <select name="search-type" className="text-gray-700 p-4 rounded-tl-xl rounded-bl-xl">
                        <option value="all">All</option>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                        <option value="reserved">Reserved</option>
                    </select>
                    <div className="flex items-center justify-center pl-11 bg-white">
                        <img src={search} alt="Search Icon"/>
                    </div>
                    <input type="text" placeholder="Search for properties or keywords..." className="flex-grow p-4 rounded-tr-xl rounded-br-xl placeholder-gray-600" />
                </div>
            </div>
        </div>
    );
}

export default Header;