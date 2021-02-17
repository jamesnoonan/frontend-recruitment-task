// The footer section of the website which displays the company logo

import logo from '../assets/logo-blue.png';

function Footer(props) {
  return (
    <div className="w-full py-16 bg-white flex justify-center items-center">
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default Footer;
