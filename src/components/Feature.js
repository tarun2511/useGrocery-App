import BoltIcon from '@mui/icons-material/Bolt';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Feature (){
    return(<>
    <div className='feature-container'>
    <div className="feature-box">
        <BoltIcon />
        <DeliveryDiningIcon />
        <p>30mins doorstep delivery</p>
    </div>
    <div className="feature-box">
        <SupportAgentIcon />
        <p>24*7 customer support</p>
    </div>
    <div className="feature-box">
        <CurrencyExchangeIcon />
        <p>Quick refund</p>
    </div>
    <div className="feature-box">
        <FavoriteBorderIcon />
        <p>Home made products available</p>
    </div>
    </div>
    </>)
}