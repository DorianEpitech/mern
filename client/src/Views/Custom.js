import CustomBlog from '../Components/CustomBlog.js';
import User from '../Components/User';
import { useParams } from 'react-router-dom';
import ShowBill from '../Components/ShowBill.js';

export default function Custom() {

    const currentUser = User()
    const params = useParams();
    const billId = params.bill;

    if (!currentUser) {

        return
    }

  return (

    <div>
        { billId ? (
          <ShowBill id={billId} view='custom' />
        ) : (
          <CustomBlog user={currentUser.login} />
        )}
    </div>
  );
}

