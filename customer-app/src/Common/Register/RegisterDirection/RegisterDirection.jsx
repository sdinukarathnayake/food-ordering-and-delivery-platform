import { Link } from 'react-router-dom';
import './RegisterDirection.css';

import resturant from './resturant.jpg';
import customer from './customer.jpg';
import delivery from './delivery.jpeg';

function RegisterDirection() {

    return (
        <div className="register-direction-container">
            <div className='register-images-container'>
                <Link to='/ResturantRegistration'><img src={resturant} />
                    <span className='register-text'>Click here to register a resturant</span>
                </Link>

                <Link to='/DileveryPersonRegistration'><img src={delivery} />
                    <span className='register-text'>Click here to register as a delivery person</span>
                </Link>
            </div>
        </div>
    )

}

export default RegisterDirection;